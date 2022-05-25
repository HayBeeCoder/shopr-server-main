import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
    {
            title: {
                type: String,
                required: true,
                // unique: true,
                trim: true
            },
            // subtitle: {
            //     type: String,
            //     required: true
            // },
            description: {
                type: String,
                required: true,
                trim: true
            },
            images: [ [{
                    type: String,
                    required: true
                }]
            ],
            size: [{size: String,quantity: Number}],
            categories: Array,
            color: [ {type: String} ],
            price: {
                type: Number,
                required: true
            },
            // createdBy: {
            //     ref: "user",
            //     required: true,
            //     type: mongoose.Types.ObjectId
            // },
            
    },

)



export const Product = mongoose.model("product" , ProductSchema)