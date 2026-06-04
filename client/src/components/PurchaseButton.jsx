import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PurchaseButton = ({ courseId, courseTitle, coursePrice }) => {
  const navigate = useNavigate()

  // const handlePurchase = () => {
  //   navigate(`/payment/${courseId}`, {
  //     state: {
  //       title: courseTitle,
  //       price: coursePrice,
  //     },
  //   })
  // }

  const buyCourse = async()=>{
    
   const res = await axios.post(
      "http://localhost:3000/api/payment/create-order",
      {courseId}
   );

   const order = res.data.order;

   const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      handler: async(response)=>{

         await axios.post(
           "http://localhost:3000/api/payment/verify",
           {
             ...response,
             courseId
           }
         );

         toast.success("Course Purchased");
      }
   }

   const razorpay = new window.Razorpay(options);
   razorpay.open();
}

  return (
   <button
     type="button"
     className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
     onClick={buyCourse}
   >
     Purchase Now
   </button>
  )
}

export default PurchaseButton

