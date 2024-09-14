'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike } from 'lucide-react'

  const backgroundIcons = [
    { Icon: Star, className: "text-yellow-400" },
    { Icon: Moon, className: "text-blue-300" },
    { Icon: Cloud, className: "text-gray-300" },
    { Icon: Smile, className: "text-yellow-500" },
    { Icon: Footprints, className: "text-pink-300" },
    { Icon: Hand, className: "text-orange-300" },
    { Icon: Users, className: "text-purple-400" },
    { Icon: Flower, className: "text-pink-400" },
    { Icon: Sun, className: "text-yellow-500" },
    { Icon: Bike, className: "text-green-400" },
  ]

const plans = [
  {
    name: 'Free Plan',
    price: '$0/month',
    features: [
      'Access to basic story templates',
      'Up to 5 AI-generated stories per month',
      'Up to 5 AI-generated kids activities per month',
      'Community support'
    ]
  },
  {
    name: 'Pro Plan',
    price: '$9.99/month',
    features: [
      'Everything in Free, plus:',
      '20 AI-generated stories',
      '20 AI-generated activities',
      'Custom story templates',
      'Priority support'
    ]
  },
  {
    name: 'Family Plan',
    price: '$19.99/month',
    features: [
      'Everything in Pro, plus:',
      'Multi-user access (up to 4 accounts)',
      'Personalized story recommendations',
      'Family-friendly content curation'
    ]
  }
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-white to-orange-100 overflow-hidden relative">
      {/* Background blobs and icons */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      {[...Array(40)].map((_, i) => {
        const IconComponent = backgroundIcons[i % backgroundIcons.length].Icon
        const iconClass = backgroundIcons[i % backgroundIcons.length].className
        return (
          <IconComponent
            key={i}
            className={`absolute ${iconClass} animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        )
      })}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-orange-100 p-8"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Pricing Plans</h1>
        <p className="text-center mb-8 text-orange-700">
          At Parentivity, we offer flexible pricing plans to suit your needs. Whether you're just getting started or need unlimited access, we've got you covered!
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <h2 className="text-2xl font-bold text-orange-500 mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-orange-500 mb-4">Annual Subscription</h3>
          <p className="text-orange-700">Get 2 months free with an annual subscription!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
          >
            Get Annual Plan
          </motion.button>
        </div>
        <div className="mt-12 text-center text-orange-700">
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <p>Simply choose a plan that fits your needs.</p>
          <p>Sign up with your account and start creating stories right away.</p>
          <p>You can upgrade, downgrade, or cancel at any time from your account settings.</p>
        </div>
      </div>
    </motion.div>
    </div>
    <Footer />
    </>
  )
}