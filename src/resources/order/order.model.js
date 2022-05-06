import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                productId: String,
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity can not be less then 1.'],     
                    default: 1 
                }
            }
        ],    
        bill: {
            type: Number,
            required: true
        },
        // address: {
        //     type: Object, 
        //     required: true
        // },
        status: {
            type: String,
            default: "pending"
        },
        createdBy: {
            ref: "user",
            required: true,
            type: mongoose.Types.ObjectId
        },

   },

)

export const Order = mongoose.model("order" , OrderSchema)