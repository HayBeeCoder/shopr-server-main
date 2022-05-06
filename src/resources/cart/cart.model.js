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
                     required: true,
                     min: [1, 'Quantity can not be less then 1.'],     
                     default: 1 
                 },
                 price: Number
             }
         ], 
         bill: {
            type: Number,
            required: true,
            default: 0
        }   
    },

)

export const Cart = mongoose.model("cart" , CartSchema)