import mongoose from "mongoose"

const Schema = mongoose.Schema

const EspSchema = new Schema(
    {
        status: { 
            type: Schema.Types.String,
        },

        weather: { 
            type: Schema.Types.String,
        },

        humidity: {
            type: Schema.Types.String,
        }, 

        temperature: {
            type: Schema.Types.String,
        },

        createdAt: {
            type: Schema.Types.Date, 
            default: Date.now
        },
    }
)

const Esp = mongoose.model('Esp', EspSchema)

export default Esp
