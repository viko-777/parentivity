'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: "What is the 'Parentivity' app all about?",
    answer: "This app is designed to spark your child's imagination through personalized stories, coloring activities, and fun ideas that you, the parent, can easily set up. It's all about creating engaging, screen free experiences for your little one!"
  },
  {
    question: "How do I create a story for my child?",
    answer: "Simply ask your child who they'd like to see in a story—whether it's a favorite pet, cousin, or even their beloved toy. Enter the names in the provided box, hit 'Generate Story,' and let the adventure begin! Each story comes with a fun moral and an engaging picture at the end."
  },
  {
    question: "Can I customize coloring activities for my child?",
    answer: "Absolutely! Just ask your child what they want to color, enter it into the magic box, and the app will generate an outline of it. Print it out, and your little artist can start creating their masterpiece right away."
  },
  {
    question: "Is this app safe for my child to use?",
    answer: "This app is designed to be used by parents to generate content, kids enjoy the stories and activities offscreen, making it a safe and screen free experience."
  },
  {
    question: "Can I use the app for multiple children?",
    answer: "Definitely! You can create multiple profiles tailored to each child's age and interests, ensuring that every story and activity is perfectly suited to their unique personality."
  },
  {
    question: "How does the app help reduce screen time?",
    answer: "The app is designed for parents to generate activities and stories that are enjoyed offscreen. It's all about creating hands-on, interactive experiences that keep your child entertained and learning without relying on a screen."
  },
  {
    question: "Do I need an internet connection to use the app?",
    answer: "You'll need an internet connection to generate new stories and activities, but once they're created, you can enjoy them offline at your convenience."
  },
  {
    question: "How do I share my child's stories with family and friends?",
    answer: "Sharing is easy! After generating a story, you can share it directly to your social media platforms, letting family and friends join in the fun and celebrate your child's creativity."
  },
  {
    question: "Can the app help my child learn while having fun?",
    answer: "Yes! Each story subtly includes educational elements or moral lessons, turning playtime into a learning opportunity without your child even realizing it!"
  },
  {
    question: "What age groups is this app suitable for?",
    answer: "The app is designed for children aged 3 to 8, with personalized content for each age group (3-4, 5-6, 7-8), ensuring the activities and stories are age appropriate and engaging for every stage of development."
  }
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-orange-100 p-8"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-orange-200 pb-4"
              initial={false}
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-semibold text-orange-700">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-orange-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}