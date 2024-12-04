import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId:{
            type: ObjectId,
            required: true,
        },
        products:[
            {
                productId:{
                    type:ObjectId,
                    required: true,
                },
                quantity:{
                    type: Number,
                    required: true,
                }
            }
        ],
        totalPrice:{
            type: number,
            required: true,
        },
        status:{
            type: String,
            required: true,
        },
        orderDate:{
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;