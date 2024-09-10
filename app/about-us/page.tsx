'use client'

import { motion } from 'framer-motion'
import React from 'react';

export default function AboutUs() {
  return (
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
          <p className="mb-4">
            Welcome to Parentivity, where imagination meets technology! We believe in the power of stories to inspire, educate, and entertain. Our app is designed for creative parents and kids, offering a simple way to bring your story ideas to life with the help of AI.
          </p>
          <p className="mb-4">
            Whether you're crafting bedtime tales or engaging narratives, Parentivity makes it effortless. We understand the challenges parents face in keeping their children engaged and entertained while limiting screen time. That's why we've created a platform that encourages creativity, learning, and quality time together.
          </p>
          <p className="mb-4">
            Our team is composed of passionate educators, storytellers, and technologists who are dedicated to creating meaningful experiences for families. We continuously work on improving our AI algorithms to generate more personalized and captivating stories and activities tailored to your child's interests and developmental stage.
          </p>
          <p>
            Join us today and spark creativity in every story you tell! Let Parentivity be your partner in nurturing your child's imagination and fostering a love for storytelling and learning.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}