import type { Request, Response } from "express"
import Wallet from "../models/Wallet"
import type { CustomerRequest } from "../type/Request"
import WalletTransaction from "../models/WalletTransaction"
import { topupSchema } from "../utils/zodSchema"

export const getBalance = async (req: CustomerRequest, res: Response) => {
    try {
        const wallet = await Wallet.findOne({
            user: req.user?.id
        })

        return res.json({
            status: true,
            message: 'Succes get data',
            data: {
                balance: wallet?.balance ?? 0
            },
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data',
            data: null,
            status: 'Failed'
        })
    }
}

export const getTopUpHistory = async (req: CustomerRequest, res: Response) => {
    try {
        const wallet = await Wallet.findOne({
            user: req.user?.id
        })

        const data = await WalletTransaction.find({
            wallet: wallet?._id
        }).select('wallet price createdAt status')

        return res.json({
            status: true,
            message: 'Success ge data',
            data: data
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to get data',
            data: null,
            status: 'Failed'
        })
    }
}

export const topupBalance = async (req: CustomerRequest, res: Response) => {
    try {
        const parse = topupSchema.parse(req.body)

        const midtransUrl = process.env.MIDTRANS_TRANSACTION_URL ?? ''
        const midtransAuth = process.env.MIDTRANS_AUTH_STRING ?? ''

        const wallet = await Wallet.findOne({
            user: req?.user?.id
        })

        const topup = new WalletTransaction({
            wallet: wallet?.id,
            price: parse.balance,
            status: 'pending'
        })

        const midtransRequest = new Request(midtransUrl, {
            method: 'POST',
            body: JSON.stringify({
                "transaction_details": {
                    "order_id": topup.id,
                    "gross_amount": parse.balance
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": req.user?.email,
                },
                callbacks: {
                    finish: process.env.SUCCESS_PAYMENT_REDIRECT
                }
            }),
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `BASIC ${midtransAuth}`
            }
        });

        const midtransResponse = await fetch(midtransRequest)
        const midtransJson = await midtransResponse.json()

        await topup.save()

        return res.json({
            status: true,
            message: 'Top up success',
            data: midtransJson,
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Failed to topup balance',
            data: null,
            status: 'Failed'
        })
    }
}