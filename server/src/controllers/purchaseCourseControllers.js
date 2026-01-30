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

        const session=await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:course.courseTitle,
                            images:[course.courseThumbnail],
                        },
                        unit_amount: course.coursePrice*100,
                    },
                    quantity:1,
                }
            ],

            mode:"payment",
            success_url:`${process.env.FRONTEND_URL}/course-progress/${courseId}`,
            cancel_url:`${process.env.FRONTEND_URL}/course-details/${courseId}`,
            metadata:{
                courseId:courseId,
                userId:userId,
            },

            shipping_address_collection:{
                allowed_countries:["IN"],
            },
        })

        if(!session.url){
            return res.status(500).json({
                success:false,
                message:"Unable to create checkout session"
            })
        }

        newPurchaseCourse.paymentId=session.id;//newPurchaseCourse.paymentIntentId
        await newPurchaseCourse.save();


        return res.status(200).json({
            success: true,
            message: "Checkout session created successfully",
            url:session.url,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unable to create checkout session";
        })

    }
}


