import {trim0x} from '../utils'
import {ethers} from 'ethers'
import assert from 'assert'
import {isHexBytes} from '../validations'
import {AuctionPoint} from './types'
import {BytesIter} from '../utils/bytes/bytes-iter'
import {UINT_24_MAX, UINT_32_MAX} from '../constants'

export class AuctionDetails {
    public readonly auctionStartTime: bigint

    public readonly duration: bigint

    public readonly initialRateBump: bigint

    public readonly points: AuctionPoint[]

    public readonly gasCost: {
        /**
         * Rate bump to cover gas price. 10_000_000 means 100%
         */
        gasBumpEstimate: bigint
        /**
         * Gas price at estimation time. 1000 means 1 Gwei
         */
        gasPriceEstimate: bigint
    }

    constructor(auction: {
        auctionStartTime: bigint
        initialRateBump: number
        duration: number
        points: AuctionPoint[]
        /**
         * Allows to scale estimate gas costs to actual gas costs
         */
        gasCost?: {
            /**
             * Rate bump to cover gas price. 10_000_000 means 100%
             */
            gasBumpEstimate: bigint

            /**
             * Gas price at estimation time. 1000 means 1 Gwei
             */
            gasPriceEstimate: bigint
        }
    }) {
        this.auctionStartTime = BigInt(auction.auctionStartTime)
        this.initialRateBump = BigInt(auction.initialRateBump)
        this.duration = BigInt(auction.duration)
        this.points = auction.points
        this.gasCost = auction.gasCost || {
            gasBumpEstimate: 0n,
            gasPriceEstimate: 0n
        }

        assert(this.gasCost.gasBumpEstimate <= UINT_24_MAX)
        assert(this.gasCost.gasPriceEstimate <= UINT_32_MAX)
        assert(this.auctionStartTime <= UINT_32_MAX)
        assert(this.duration <= UINT_24_MAX)
        assert(this.initialRateBump <= UINT_24_MAX)
    }

    /**
     * Construct `AuctionDetails` from bytes
     *
     * @param data bytes with 0x prefix in next format:
     * - uint24 gasBumpEstimate
     * - uint32 gasPriceEstimate
     * - uint32 auctionStartTime
     * - uint24 duration
     * - uint24 initialRateBump
     * - [uint24 rate, uint16 delay] * N points
     *
     * All data is tight packed
     *
     * @see AuctionDetails.encode
     */
    static decode(data: string): AuctionDetails {
        assert(isHexBytes(data), 'Invalid auction details data')
        const iter = new BytesIter(data)

        const gasBumpEstimate = iter.nextUint24()
        const gasPriceEstimate = iter.nextUint32()
        const start = iter.nextUint32()
        const duration = Number(iter.nextUint24())
        const rateBump = Number(iter.nextUint24())
        const points = [] as AuctionPoint[]

        while (!iter.isEmpty()) {
            points.push({
                coefficient: Number(iter.nextUint24()),
                delay: Number(iter.nextUint16())
            })
        }

        return new AuctionDetails({
            auctionStartTime: start,
            duration: duration,
            initialRateBump: rateBump,
            points,
            gasCost: {
                gasBumpEstimate,
                gasPriceEstimate
            }
        })
    }

    /**
     * Serialize auction data to bytes
     */
    public encode(): string {
        let details = ethers.solidityPacked(
            ['uint24', 'uint32', 'uint32', 'uint24', 'uint24'],
            [
                this.gasCost.gasBumpEstimate,
                this.gasCost.gasPriceEstimate,
                this.auctionStartTime,
                this.duration,
                this.initialRateBump
            ]
        )

        for (let i = 0; i < this.points.length; i++) {
            details += trim0x(
                ethers.solidityPacked(
                    ['uint24', 'uint16'],
                    [this.points[i].coefficient, this.points[i].delay]
                )
            )
        }

        return details
    }
}
