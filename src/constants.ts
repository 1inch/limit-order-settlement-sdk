import {Address} from './address'

export const ZX = '0x'

export enum NetworkEnum {
    ETHEREUM = 1,
    POLYGON = 137,
    BINANCE = 56,
    ARBITRUM = 42161,
    AVALANCHE = 43114,
    OPTIMISM = 10,
    FANTOM = 250,
    GNOSIS = 100,
    COINBASE = 8453
}

export const WRAPPER_ADDRESS_MAP: Record<NetworkEnum, Address> = {
    [NetworkEnum.ETHEREUM]: new Address(
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    ),
    [NetworkEnum.BINANCE]: new Address(
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
    ),
    [NetworkEnum.POLYGON]: new Address(
        '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
    ),
    [NetworkEnum.ARBITRUM]: new Address(
        '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'
    ),
    [NetworkEnum.AVALANCHE]: new Address(
        '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
    ),
    [NetworkEnum.OPTIMISM]: new Address(
        '0x4200000000000000000000000000000000000006'
    ),
    [NetworkEnum.FANTOM]: new Address(
        '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
    ),
    [NetworkEnum.GNOSIS]: new Address(
        '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'
    ),
    [NetworkEnum.COINBASE]: new Address(
        '0x4200000000000000000000000000000000000006'
    )
}

export const UNWRAPPER_CONTRACT_ADDRESS_MAP: Record<NetworkEnum, Address> = {
    [NetworkEnum.ETHEREUM]: new Address(
        '0x08b067ad41e45babe5bbb52fc2fe7f692f628b06'
    ),
    [NetworkEnum.BINANCE]: new Address(
        '0x0eee00137d807a461702e9e0640c599de663e7e4'
    ),
    [NetworkEnum.POLYGON]: new Address(
        '0x18d410f651289bb978fc32f90d2d7e608f4f4560'
    ),
    [NetworkEnum.ARBITRUM]: new Address(
        '0x3e57c682c72f3bd255ebf439b74c784bc82029ee'
    ),
    [NetworkEnum.AVALANCHE]: new Address(
        '0x5d0ec1f843c1233d304b96dbde0cab9ec04d71ef'
    ),
    [NetworkEnum.OPTIMISM]: new Address(
        '0xb33839e05ce9fc53236ae325324a27612f4d110d'
    ),
    [NetworkEnum.FANTOM]: new Address(
        '0x94bc2a1c732bcad7343b25af48385fe76e08734f'
    ),
    [NetworkEnum.GNOSIS]: new Address(
        '0xd41b24bba51fac0e4827b6f94c0d6ddeb183cd64'
    ),
    [NetworkEnum.COINBASE]: new Address(
        '0xb33839e05ce9fc53236ae325324a27612f4d110d'
    )
}

// todo: change addresses
export const SETTLEMENT_EXTENSION_ADDRESS_MAP: Record<NetworkEnum, Address> = {
    [NetworkEnum.ETHEREUM]: new Address(
        '0x8273f37417da37c4a6c3995e82cf442f87a25d9c'
    ),
    [NetworkEnum.BINANCE]: new Address(
        '0x1d0ae300eec4093cee4367c00b228d10a5c7ac63'
    ),
    [NetworkEnum.POLYGON]: new Address(
        '0x1e8ae092651e7b14e4d0f93611267c5be19b8b9f'
    ),
    [NetworkEnum.ARBITRUM]: new Address(
        '0x4bc3e539aaa5b18a82f6cd88dc9ab0e113c63377'
    ),
    [NetworkEnum.AVALANCHE]: new Address(
        '0x7731f8df999a9441ae10519617c24568dc82f697'
    ),
    [NetworkEnum.OPTIMISM]: new Address(
        '0xd89adc20c400b6c45086a7f6ab2dca19745b89c2'
    ),
    [NetworkEnum.FANTOM]: new Address(
        '0xa218543cc21ee9388fa1e509f950fd127ca82155'
    ),
    [NetworkEnum.GNOSIS]: new Address(
        '0xcbdb7490968d4dbf183c60fc899c2e9fbd445308'
    ),
    [NetworkEnum.COINBASE]: new Address(
        '0x7f069df72b7a39bce9806e3afaf579e54d8cf2b9'
    )
}

export const ONE_INCH_LIMIT_ORDER_V4 =
    '0x111111125421ca6dc452d289314280a0f8842a65'

export const UINT_160_MAX = (1n << 160n) - 1n
export const UINT_80_MAX = (1n << 80n) - 1n
export const UINT_40_MAX = (1n << 40n) - 1n
export const UINT_32_MAX = (1n << 32n) - 1n
export const UINT_24_MAX = (1n << 24n) - 1n
export const UINT_256_MAX = (1n << 256n) - 1n
