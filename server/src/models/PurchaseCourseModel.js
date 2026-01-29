const mongoose = require('mongoose')


const purchaseCourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        require: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    amount: {
        type: Number,
        require: true
    },

    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending"
    },

    paymentId: {
        type: String,
        require: true
    }

}, { tumestamps: true })

module.exports = mongoose.model("PurchaseCourse", purchaseCourseSchema)