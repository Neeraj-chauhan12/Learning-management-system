import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PurchaseButton = ({ courseId }) => {
  const navigate = useNavigate();

  const buyCourse = async () => {
    console.log("Buying course with ID:", courseId);
    console.log("rozarpay", window.Razorpay);

    const res = await axios.post(
      "http://localhost:3000/api/payment/create-order",
      { courseId },
      { withCredentials: true },
    );

    const order = res.data.order;
    console.log("response from server", res.data);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      handler: async (response) => {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/payment/verify",
            {
              ...response,
              courseId,
            },
            { withCredentials: true },
          );

          toast.success(res.data.message || "Payment verified successfully");
          navigate("/my-learning");
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      type="button"
      className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
      onClick={buyCourse}
    >
      Purchase Now
    </button>
  );
};

export default PurchaseButton;
