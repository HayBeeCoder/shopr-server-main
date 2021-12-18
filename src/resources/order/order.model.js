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
                    default: 1 
                }
            }
        ],    
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object, 
            required: true
        },
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