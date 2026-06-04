const Razorpay = require("razorpay");
const crypto = require("crypto");
const Course = require("../models/CourseModel")
const User = require("../models/UserModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("Razorpay instance created:", razorpay);

exports.createOrder = async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  const order = await razorpay.orders.create({
    amount: course.price * 100,
    currency: "INR",
    receipt: courseId,
  });
  res.status(200).json({ success: true, order });
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
  } = req.body;
  
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const user = await User.findById(req.user._id);
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
      .json({ success: true, message: "Payment verified successfully" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid payment signature" });
  }
};
