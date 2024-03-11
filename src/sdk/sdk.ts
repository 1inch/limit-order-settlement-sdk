import {FusionApi, Quote, QuoterRequest, RelayerRequest} from '../api'
import {
    FusionSDKConfigParams,
    OrderInfo,
    OrderParams,
    PreparedOrder,
    QuoteParams,
    QuoteCustomPresetParams
} from './types'
import {
    ActiveOrdersRequest,
    ActiveOrdersRequestParams,
    ActiveOrdersResponse,
    OrdersByMakerParams,
    OrdersByMakerRequest,
    OrdersByMakerResponse,
    OrderStatusRequest,
    OrderStatusResponse
} from '../api/orders'
import {FusionOrder} from '../fusion-order'
import {encodeCancelOrder} from './encoders'
import {QuoterCustomPresetRequest} from '../api'
import {
    Address,
    getLimitOrderV4Domain,
    MakerTraits
} from '@1inch/limit-order-sdk'

export class FusionSDK {
    public readonly api: FusionApi

    constructor(private readonly config: FusionSDKConfigParams) {
        this.api = FusionApi.new({
            url: config.url,
            network: config.network,
            httpProvider: config.httpProvider,
            authKey: config.authKey
        })
    }

    async getActiveOrders({
        page,
        limit
    }: ActiveOrdersRequestParams = {}): Promise<ActiveOrdersResponse> {
        const request = ActiveOrdersRequest.new({page, limit})

        return this.api.getActiveOrders(request)
    }

    async getOrderStatus(orderHash: string): Promise<OrderStatusResponse> {
        const request = OrderStatusRequest.new({orderHash})

        return this.api.getOrderStatus(request)
    }

    async getOrdersByMaker({
        limit,
        page,
        address
    }: OrdersByMakerParams): Promise<OrdersByMakerResponse> {
        const request = OrdersByMakerRequest.new({limit, page, address})

        return this.api.getOrdersByMaker(request)
    }

    async getQuote(params: QuoteParams): Promise<Quote> {
        const request = QuoterRequest.new({
            fromTokenAddress: params.fromTokenAddress,
            toTokenAddress: params.toTokenAddress,
            amount: params.amount,
            walletAddress: Address.ZERO_ADDRESS.toString(),
            permit: params.permit,
            enableEstimate: false,
            fee: params?.takingFeeBps,
            source: params.source
        })

        return this.api.getQuote(request)
    }

    async getQuoteWithCustomPreset(
        params: QuoteParams,
        body: QuoteCustomPresetParams
    ): Promise<Quote> {
        const paramsRequest = QuoterRequest.new({
            fromTokenAddress: params.fromTokenAddress,
            toTokenAddress: params.toTokenAddress,
            amount: params.amount,
            walletAddress: Address.ZERO_ADDRESS.toString(),
            permit: params.permit,
            enableEstimate: false,
            fee: params?.takingFeeBps,
            source: params.source
        })

        const bodyRequest = QuoterCustomPresetRequest.new({
            customPreset: body.customPreset
        })

        return this.api.getQuoteWithCustomPreset(paramsRequest, bodyRequest)
    }

    async createOrder(params: OrderParams): Promise<PreparedOrder> {
        const quote = await this.getQuoteResult(params)

        if (!quote.quoteId) {
            throw new Error('quoter has not returned quoteId')
        }

        const order = quote.createFusionOrder({
            receiver: params.receiver
                ? new Address(params.receiver)
                : undefined,
            preset: params.preset,
            nonce: params.nonce,
            permit: params.permit,
            takingFeeReceiver: params.fee?.takingFeeReceiver,
            allowPartialFills: params.allowPartialFills
        })

        const domain = getLimitOrderV4Domain(this.config.network)
        const hash = order.getOrderHash(domain)

        return {order, hash, quoteId: quote.quoteId}
    }

    public async submitOrder(
        order: FusionOrder,
        quoteId: string
    ): Promise<OrderInfo> {
        if (!this.config.blockchainProvider) {
            throw new Error('blockchainProvider has not set to config')
        }

        const orderStruct = order.build()
        const domain = getLimitOrderV4Domain(this.config.network)

        const signature = await this.config.blockchainProvider.signTypedData(
            orderStruct.maker,
            order.getTypedData(domain)
        )

        const relayerRequest = RelayerRequest.new({
            order: orderStruct,
            signature,
            quoteId
        })

        await this.api.submitOrder(relayerRequest)

        return {
            order: orderStruct,
            signature,
            quoteId,
            orderHash: order.getOrderHash(domain)
        }
    }

    async placeOrder(params: OrderParams): Promise<OrderInfo> {
        const {order, quoteId} = await this.createOrder(params)

        return this.submitOrder(order, quoteId)
    }

    async buildCancelOrderCallData(orderHash: string): Promise<string> {
        const getOrderRequest = OrderStatusRequest.new({orderHash})
        const orderData = await this.api.getOrderStatus(getOrderRequest)

        if (!orderData) {
            throw new Error(
                `Can not get order with the specified orderHash ${orderHash}`
            )
        }

        const {order} = orderData

        return encodeCancelOrder(
            orderHash,
            new MakerTraits(BigInt(order.makerTraits))
        )
    }

    private async getQuoteResult(params: OrderParams): Promise<Quote> {
        const quoterRequest = QuoterRequest.new({
            fromTokenAddress: params.fromTokenAddress,
            toTokenAddress: params.toTokenAddress,
            amount: params.amount,
            walletAddress: params.walletAddress,
            permit: params.permit,
            enableEstimate: true,
            fee: params.fee?.takingFeeBps,
            source: params.source
        })

        if (!params.customPreset) {
            return this.api.getQuote(quoterRequest)
        }

        const quoterWithCustomPresetBodyRequest = QuoterCustomPresetRequest.new(
            {
                customPreset: params.customPreset
            }
        )

        return this.api.getQuoteWithCustomPreset(
            quoterRequest,
            quoterWithCustomPresetBodyRequest
        )
    }
}
