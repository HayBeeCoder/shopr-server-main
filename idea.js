import { Mongoose } from "mongoose"

const product = {
    name: "Tiro tracks",
    desc: "lorem ipsum idit icit aklfjsdfasdafda",
    colors: [
        {
            color: String,
            images: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ],
    category: [String],
    sold: {
        default: 0,
        type: Number,
    },
    quantity: Number,
    discount_in_percent: Number,


    // reviews: [
    //     {
    //         rating: 
    //     }
    // ]


}

const Cart = {
    prouctId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}