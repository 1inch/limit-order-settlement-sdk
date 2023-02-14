import {BlockchainProviderConnector, HttpProviderConnector} from '../connector'
import {NetworkEnum} from '../constants'
import {LimitOrderV3Struct} from '../limit-order'
import {PresetEnum} from '../api'
import {OrderNonce} from '../nonce-manager/types'

export type FusionSDKConfigParams = {
    url: string
    network: NetworkEnum
    blockchainProvider?: BlockchainProviderConnector
    httpProvider?: HttpProviderConnector
}

export type QuoteParams = {
    fromTokenAddress: string
    toTokenAddress: string
    amount: string
    permit?: string
}

export type OrderParams = {
    fromTokenAddress: string
    toTokenAddress: string
    amount: string
    walletAddress: string
    permit?: string
    receiver?: string
    preset?: PresetEnum
    nonce?: OrderNonce | string | number
}

export type OrderInfo = {
    order: LimitOrderV3Struct
    signature: string
    quoteId: string
    orderHash: string
}
