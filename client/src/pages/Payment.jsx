import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Payment = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const location = useLocation()
  const { title, price } = location.state || {}

  const courseTitle = title || 'Premium Course'
  const coursePrice = price ?? '999'

  const handlePayNow = () => {
    navigate('/my-learning')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/5">
          <div className="bg-slate-950 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold">Secure Payment</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Finish your purchase for <span className="font-semibold text-white">{courseTitle}</span>.
            </p>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-950">Order Summary</h2>
              <div className="mt-6 space-y-4 text-slate-700">
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200">
                  <span className="font-medium text-slate-800">Course</span>
                  <span>{courseTitle}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200">
                  <span className="font-medium text-slate-800">Course ID</span>
                  <span>{courseId || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200">
                  <span className="font-medium text-slate-800">Total</span>
                  <span className="text-lg font-bold">₹{coursePrice}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-950">Payment Details</h2>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Cardholder Name</label>
                  <input type="text" placeholder="John Doe" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">CVV</label>
                    <input type="password" placeholder="123" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500" />
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2">
              <button
                type="button"
                onClick={handlePayNow}
                className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
              >
                Pay ₹{coursePrice} Now
              </button>
              <p className="mt-4 text-center text-sm text-slate-500">
                After payment, you will get immediate access to the course.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment

