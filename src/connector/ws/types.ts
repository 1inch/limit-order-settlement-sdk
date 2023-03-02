import {NetworkEnum} from '../../constants'
import {WebSocket} from 'ws'

export type AnyFunction = (...args: any[]) => any

export type AnyFunctionWithThis = (this: WebSocket, ...args: any[]) => void

export type WsApiConfig = {
    network: NetworkEnum
    url: string
    lazyInit?: boolean
}

export type OnMessageCb = (data: any) => void
