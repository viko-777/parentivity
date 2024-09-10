'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function UserAccountPage() {
  const [activeTab, setActiveTab] = useState('parent')

  const tabContent = {
    parent: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Parent Account</h2>
        <div className="space-y-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Edit Profile</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Change Password</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">View Current Plan</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Upgrade Plan</button>
        </div>
      </div>
    ),
    kids: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Kids Account</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mb-4">Create New Kid Profile</button>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">Kid's Nickname</h3>
            <p>Age Group: 5-6</p>
            <p>Interests: Drawing, Dinosaurs</p>
            <p>Dislikes: Loud noises</p>
            <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Edit Profile</button>
          </div>
        </div>
      </div>
    ),
    stories: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Story Library</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-200">
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Title of Story</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1</td>
              <td className="p-2">The Magic Rainbow</td>
              <td className="p-2">5 stars</td>
              <td className="p-2">2023-05-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    activities: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Activity History</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-200">
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Activity Name</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1</td>
              <td className="p-2">Treasure Hunt</td>
              <td className="p-2">4 stars</td>
              <td className="p-2">2023-05-20</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-orange-100 p-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">My Account</h1>
        <div className="flex mb-6">
          {['parent', 'kids', 'stories', 'activities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab ? 'bg-orange-500 text-white' : 'bg-orange-200 text-orange-800'
              } rounded-t-lg mr-2`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </motion.div>
  )
}