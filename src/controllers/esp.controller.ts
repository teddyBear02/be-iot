import { Request, Response } from 'express'
import { Esp } from '../schemas'

export const getDataFromEsp32 = async (req: Request, res: Response) =>{
    const data = req.body
    console.log(data)
    res.status(200).json(
        {
            data : data
        }
    )
    return
}

