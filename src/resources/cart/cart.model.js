import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
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
    },

)

export const Cart = mongoose.model("cart" , CartSchema)