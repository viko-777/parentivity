'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateActivities } from '../utils/openai/chat'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike } from 'lucide-react'
import { useEffect } from 'react'
import { createClient } from '../utils/supabase/client'
import { useRouter } from 'next/navigation'

interface KidsProfile {
  id: string;
  name: string;
  ageGroup: string;
}

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

export default function ActivityCreationPage() {
  const [activityRequest, setActivityRequest] = useState('')
  const [kidsProfile, setKidsProfile] = useState('')
  const [generatedActivity, setGeneratedActivity] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [kidsProfiles, setKidsProfiles] = useState<KidsProfile[]>([])
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const [activityTitle, setActivityTitle] = useState('')
  const [activityContent, setActivityContent] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/')
      } else {
        setUser(user)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchKidsProfiles = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('KidsProfiles')
          .select('*')
          .eq('user_id', user.id)
        if (!error && data) {
          setKidsProfiles(data as any)
        }
      }
    }
    fetchKidsProfiles()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const activity = await generateActivities(kidsProfile, activityRequest) || ''
    const lines = activity.split('\n')
    const title = lines[0] || 'Untitled Activity'
    const content = lines.slice(1).join('\n').trim()
    const image = '/generated-activity-image.jpg'

    if (activity == null) {
      console.error('Error creating activity:')
    } else {
      console.log('Activity created successfully:')
      // Store the generated activity data in localStorage
      localStorage.setItem('generatedActivity', JSON.stringify({ title, content, image }))
      const ageGroup = kidsProfiles.find(profile => profile.id === kidsProfile)?.ageGroup
      localStorage.setItem('ageGroup', JSON.stringify({ ageGroup }))
      // Redirect to the generated story page
      router.push('/activity')
    }
  }

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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Create an Activity</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="request" className="block text-orange-700 mb-2">Activity Request</label>
            <textarea
              id="request"
              value={activityRequest}
              onChange={(e) => setActivityRequest(e.target.value)}
              className="w-full bg-white text-orange-500 px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
              required
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="ageGroup" className="block text-orange-700 mb-2">Age Group</label>
            <select
              id="ageGroup"
              value={kidsProfile}
              onChange={(e) => setKidsProfile(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Age Group</option>
              <option value="3-4">3-4 years</option>
              <option value="5-6">5-6 years</option>
              <option value="7-8">7-8 years</option>
            </select>
          </div> */}
          <div className="mb-4">
            <label htmlFor="kidsProfile" className="block text-orange-700 mb-2">Kid's Profile</label>
            <select
              id="kidsProfile"
              value={kidsProfile}
              onChange={(e) => setKidsProfile(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
              required
            >
              <option value="">Select Kid's Profile</option>
              {kidsProfiles.map((profile: any) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-300"
            type="submit"
          >
            Generate Activities
          </motion.button>
        </form>
        
        {/* {generatedActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Generated Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="bg-orange-200 p-4 rounded-lg shadow"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-bold mb-2">{activity}</h3>
                  <p>Description of the activity goes here...</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </motion.div>
    </div>
    <Footer />
  </>
  )
}