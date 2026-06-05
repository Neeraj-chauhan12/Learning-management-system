const Razorpay = require("razorpay");
const crypto = require("crypto");
const Course = require("../models/CourseModel")
const User = require("../models/UserModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { courseId } = req.body;

  try{
     const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  const order = await razorpay.orders.create({
    amount: course.coursePrice * 100,
    currency: "INR",
    receipt: courseId,
  });
  res.status(200).json({ success: true, order });

  }
  catch(error){
    console.error("Error creating order:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
 
  
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
  } = req.body;
  
  const userId = req.user.id;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

    console.log("user id from token", userId);
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.enrollCourse.push(courseId);
  await user.save();

  await Course.findByIdAndUpdate(courseId, {
    $addToSet: { enrolledStudents: user._id },
  });

  if (generatedSignature === razorpay_signature) {
    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully",user });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid payment signature" });
  }
};
