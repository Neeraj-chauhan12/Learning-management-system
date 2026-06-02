import React from 'react'
import { useNavigate } from 'react-router-dom'

const PurchaseButton = ({ courseId, courseTitle, coursePrice }) => {
  const navigate = useNavigate()

  const handlePurchase = () => {
    navigate(`/payment/${courseId}`, {
      state: {
        title: courseTitle,
        price: coursePrice,
      },
    })
  }

  return (
   <button
     type="button"
     className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
     onClick={handlePurchase}
   >
     Purchase Now
   </button>
  )
}

export default PurchaseButton
