'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
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

export default function AboutUs() {
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
      <div className="max-w-3xl mx-auto bg-orange-100 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">About Us</h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-orange-600">
            Welcome to Parentivity, where imagination meets technology! We believe in the power of stories to inspire, educate, and entertain. Our app is designed for creative parents and kids, offering a simple way to bring your story ideas to life with the help of AI.
          </p>
          <p className="text-orange-600">
            Whether you're crafting bedtime tales or engaging narratives, Parentivity makes it effortless. We understand the challenges parents face in keeping their children engaged and entertained while limiting screen time. That's why we've created a platform that encourages creativity, learning, and quality time together.
          </p>
          <p className="text-orange-600">
            Our team is composed of passionate educators, storytellers, and technologists who are dedicated to creating meaningful experiences for families. We continuously work on improving our AI algorithms to generate more personalized and captivating stories and activities tailored to your child's interests and developmental stage.
          </p>
          <p className="text-orange-600">
            Join us today and spark creativity in every story you tell! Let Parentivity be your partner in nurturing your child's imagination and fostering a love for storytelling and learning.
          </p>
        </motion.div>
      </div>
    </motion.div>
  </div>
    </>
  )
}