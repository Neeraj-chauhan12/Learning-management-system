const Stripe = require('stripe')
const Course = require('../models/CourseModel');
const PurchaseCourse = require('../models/PurchaseCourseModel');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


exports.CreateCheckOutSession = async (req, res) => {
    try {

        const userId = req.user.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }


        const newPurchaseCourse = new PurchaseCourse({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending",
            // paymentId:"PAYMENT12345" // This should be replaced with actual payment gateway payment id
        });

        await newPurchaseCourse.save();


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unable to create checkout session"
        })

    }
}