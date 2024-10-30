import mongoose from "mongoose"

const mongoDb = mongoose.connect(`${process.env.DATA_BASE_ONLINE}`)
                    .then(() => console.log('Connected to DB !!!'))
                    .catch((err) => console.log(`Error: ${err}`))

export default mongoDb
