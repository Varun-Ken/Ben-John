import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    reviewMsg : String,
    reviewValue : Number
},{
    timestamps : true
})

const Review = mongoose.model("Review",reviewSchema)

export default Review