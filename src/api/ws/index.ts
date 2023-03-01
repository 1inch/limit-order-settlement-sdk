import WebSocket from 'ws'
import {
    AnyFunction,
    AnyFunctionWithThis,
    OnGetAllowedMethodsCb,
    OnMessageCb,
    OnOrderCb,
    OnOrderCreatedCb,
    OnOrderFilledCb,
    OnOrderFilledPartiallyCb,
    OnOrderInvalidCb,
    OnOrderNotEnoughBalanceOrAllowanceCb,
    OnPongCb,
    OrderEventType,
    RpcEventType,
    WsApiConfig
} from './types'

export const orderEvents: OrderEventType['event'][] = [
    'order_created',
    'order_invalid',
    'order_balance_or_allowance_change',
    'order_filled',
    'order_filled_partially'
]

function castUrl(url: string): string {
    if (url.startsWith('http')) {
        return url.replace('http', 'ws')
    }

    return url
}

export class WebSocketApi {
    public ws: WebSocket

    constructor(config: WsApiConfig) {
        const castedUrl = castUrl(config.url)
        const url = `${castedUrl}/v1.0/${config.network}`

        this.ws = new WebSocket(url)
    }

    on(event: string, cb: AnyFunctionWithThis): void {
        this.ws.on(event, cb)
    }

    onOpen(cb: AnyFunctionWithThis): void {
        this.on('open', cb)
    }

    off(event: string, cb: AnyFunctionWithThis): void {
        this.ws.off(event, cb)
    }

    onPong(cb: OnPongCb): void {
        this.onMessage((data: RpcEventType) => {
            if (data.method === 'ping') {
                cb(data.result)
            }
        })
    }

    send<T>(message: T): void {
        const serialized = JSON.stringify(message)
        this.ws.send(serialized)
    }

    onMessage(cb: OnMessageCb): void {
        this.on('message', (data: any) => {
            const parsedData = JSON.parse(data)

            cb(parsedData)
        })
    }

    onClose(cb: AnyFunction): void {
        this.ws.on('close', cb)
    }

    onError(cb: AnyFunction): void {
        this.on('error', cb)
    }

    ping(): void {
        this.send({method: 'ping'})
    }

    close(): void {
        this.ws.close()
    }

    getAllowedMethods(): void {
        this.send({method: 'getAllowedMethods'})
    }

    onGetAllowedMethods(cb: OnGetAllowedMethodsCb): void {
        this.onMessage((data: RpcEventType) => {
            if (data.method === 'getAllowedMethods') {
                cb(data.result)
            }
        })
    }

    onOrder(cb: OnOrderCb): void {
        this.onMessage((data: OrderEventType) => {
            if (orderEvents.includes(data.event)) {
                cb(data)
            }
        })
    }

    onOrderCreated(cb: OnOrderCreatedCb): void {
        this.onMessage((data: OrderEventType) => {
            if (data.event === 'order_created') {
                cb(data)
            }
        })
    }

    onOrderInvalid(cb: OnOrderInvalidCb): void {
        this.onMessage((data: OrderEventType) => {
            if (data.event === 'order_invalid') {
                cb(data)
            }
        })
    }

    onOrderBalanceOrAllowanceChange(
        cb: OnOrderNotEnoughBalanceOrAllowanceCb
    ): void {
        this.onMessage((data: OrderEventType) => {
            if (data.event === 'order_balance_or_allowance_change') {
                cb(data)
            }
        })
    }

    onOrderFilled(cb: OnOrderFilledCb): void {
        this.onMessage((data: OrderEventType) => {
            if (data.event === 'order_filled') {
                cb(data)
            }
        })
    }

    onOrderFilledPartially(cb: OnOrderFilledPartiallyCb): void {
        this.onMessage((data: OrderEventType) => {
            if (data.event === 'order_filled_partially') {
                cb(data)
            }
        })
    }
}
