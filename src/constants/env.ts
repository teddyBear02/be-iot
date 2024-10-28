import dotenv from 'dotenv'
dotenv.config()

export const SECRET_KEY : string | any = process.env.TOKEN_SECRET_KEY
export const PORT : string | any = process.env.PORT_SERVER || process.env.SUB_PORT_SERVER
