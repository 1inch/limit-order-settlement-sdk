import {Settlement} from './settlement'
import {LimitOrderV4Struct} from '../limit-order'

describe('Settlement', () => {
    const resolverContract = '0x84d99aa569d93a9ca187d83734c8c4a519c4e9b1'
    const settlementContract = '0xa88800cd213da5ae406ce248380802bd53b47647'

    it('should encode settlement', () => {
        const settlement = Settlement.new({
            resolverContract,
            settlementExtension: settlementContract
        })

        const limitOrder0: LimitOrderV4Struct = {
            salt: '618054093254',
            makerAsset: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            takerAsset: '0x111111111117dc0aa78b770fa6a738034120c302',
            maker: '0xfb3c7eb936cAA12B5A884d612393969A557d4307',
            receiver: '0x0000000000000000000000000000000000000000',
            makingAmount: '1000000000000000000',
            takingAmount: '1000000000000000000',
            makerTraits: '0'
        }

        const limitOrder1: LimitOrderV4Struct = {
            salt: '618054093254',
            makerAsset: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            takerAsset: '0x111111111117dc0aa78b770fa6a738034120c302',
            maker: '0xfb3c7eb936cAA12B5A884d612393969A557d4307',
            receiver: '0x0000000000000000000000000000000000000000',
            makingAmount: '1000000000000000000',
            takingAmount: '1000000000000000000',
            makerTraits: '0'
        }

        const orders = [
            {
                order: limitOrder0,
                makingAmount: '12345',
                takingAmount: '0',
                thresholdAmount: '12342343242342342342424324234242',
                signature:
                    '0xaefe4201b2a66009b0f2976a638f54d6f6a63b0fdcfdc289523c7ea6220c7ab13d1af9de1b85701cfff745b96742e9e4c3b29057adcac8f3b62de7b1a4eb110d1b',
                target: resolverContract
            },
            {
                order: limitOrder1,
                makingAmount: '678910',
                takingAmount: '0',
                thresholdAmount: '12342343242342342342424324234242',
                signature:
                    '0x123e4201b2a66009b0f2976a638f54d6f6a63b0fdcfdc289523c7ea6220c7ab13d1af9de1b85701cfff745b96742e9e4c3b29057adcac8f3b62de7b1a4eb110d1b',
                target: resolverContract
            }
        ]

        const resolverExecutionBytes = '0x123456'

        const calldata = settlement.encodeSettleOrders(
            orders,
            resolverExecutionBytes
        )

        const param = settlement.encodeSettleOrdersParam(
            orders,
            resolverExecutionBytes
        )

        expect(calldata).toBe(
            // eslint-disable-next-line max-len
            '0x0965d04b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000008e000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000030390000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009bc8430b2577b5a268bb3c5c0200000000000000000000000084d99aa569d93a9ca187d83734c8c4a519c4e9b10000000000000000000000000000000000000000000000000000008fe6e509c6000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56000000000000000000000000111111111117dc0aa78b770fa6a738034120c302000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400000000016c0000016c0000016c0000016c000000880000004400000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000016c20b83f2d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400007e2d21830000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a7640000bfa7514300000000000000000000000000000000000000000000000000000068000000240000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006863592c2b0000000000000000000000000000000000000000000000000000000063593ad9cf6fc6e3000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040aefe4201b2a66009b0f2976a638f54d6f6a63b0fdcfdc289523c7ea6220c7ab13d1af9de1b85701cfff745b96742e9e4c3b29057adcac8f3b62de7b1a4eb110d0000000000000000000000000000000000000000000000000000000000000495a88800cd213da5ae406ce248380802bd53b476470000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000a5bfe0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009bc8430b2577b5a268bb3c5c0200000000000000000000000084d99aa569d93a9ca187d83734c8c4a519c4e9b10000000000000000000000000000000000000000000000000000008fe6e509c6000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56000000000000000000000000111111111117dc0aa78b770fa6a738034120c302000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400000000016c0000016c0000016c0000016c000000880000004400000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000016c20b83f2d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400007e2d21830000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a7640000bfa7514300000000000000000000000000000000000000000000000000000068000000240000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006863592c2b0000000000000000000000000000000000000000000000000000000063593ad9cf6fc6e3000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040123e4201b2a66009b0f2976a638f54d6f6a63b0fdcfdc289523c7ea6220c7ab13d1af9de1b85701cfff745b96742e9e4c3b29057adcac8f3b62de7b1a4eb110d000000000000000000000000000000000000000000000000000000000000002ca88800cd213da5ae406ce248380802bd53b476470184d99aa569d93a9ca187d83734c8c4a519c4e9b112345600000000000000000000000000000000000000000000000000000000000000'
        )

        expect(param).toBe(
            // eslint-disable-next-line max-len
            '0x00000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000030390000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009bc8430b2577b5a268bb3c5c0200000000000000000000000084d99aa569d93a9ca187d83734c8c4a519c4e9b10000000000000000000000000000000000000000000000000000008fe6e509c6000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56000000000000000000000000111111111117dc0aa78b770fa6a738034120c302000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400000000016c0000016c0000016c0000016c000000880000004400000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000016c20b83f2d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400007e2d21830000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a7640000bfa7514300000000000000000000000000000000000000000000000000000068000000240000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006863592c2b0000000000000000000000000000000000000000000000000000000063593ad9cf6fc6e3000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040aefe4201b2a66009b0f2976a638f54d6f6a63b0fdcfdc289523c7ea6220c7ab13d1af9de1b85701cfff745b96742e9e4c3b29057adcac8f3b62de7b1a4eb110d0000000000000000000000000000000000000000000000000000000000000495a88800cd213da5ae406ce248380802bd53b476470000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000a5bfe0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009bc8430b2577b5a268bb3c5c0200000000000000000000000084d99aa569d93a9ca187d83734c8c4a519c4e9b10000000000000000000000000000000000000000000000000000008fe6e509c6000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56000000000000000000000000111111111117dc0aa78b770fa6a738034120c302000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400000000016c0000016c0000016c0000016c000000880000004400000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000016c20b83f2d0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a76400007e2d21830000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a7640000bfa7514300000000000000000000000000000000000000000000000000000068000000240000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006863592c2b0000000000000000000000000000000000000000000000000000000063593ad9cf6fc6e3000000000000000000000000fb3c7eb936caa12b5a884d612393969a557d4307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040123e4201b2a66009b0f2976a638f54d6f6a63b0fdcfdc289523c7ea6220c7ab13d1af9de1b85701cfff745b96742e9e4c3b29057adcac8f3b62de7b1a4eb110d000000000000000000000000000000000000000000000000000000000000002ca88800cd213da5ae406ce248380802bd53b476470184d99aa569d93a9ca187d83734c8c4a519c4e9b112345600000000000000000000000000000000000000000000000000000000000000'
        )
    })
})
