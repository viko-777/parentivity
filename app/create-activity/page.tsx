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
import Link from 'next/link'

interface KidsProfile {
  id: string;
  name: string;
  ageGroup: string;
  likes: string;
  dislikes: string;
}
interface Language {
  name: string;
  code: string;
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
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    const fetchLanguages = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('UserProfile')
          .select('language')
          .eq('user_id', user.id)
          .single()
        if (!error && data && data.language) {
          const languageList = data.language.split(',').map((lang: string) => ({
            name: lang.trim(),
            code: lang.trim().toLowerCase()
          }));
          setLanguages(languageList);
        }
      }
    }
    fetchLanguages()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const selectedProfile = kidsProfiles.find(profile => profile.id === kidsProfile)
    const { name, ageGroup, likes, dislikes } = selectedProfile || {}
    console.log('kids name:', selectedProfile?.name)
    console.log('kids ageGroup:', selectedProfile?.ageGroup)
    console.log('kids likes:', selectedProfile?.likes)
    console.log('kids dislikes:', selectedProfile?.dislikes)
    console.log('selectedLanguage:', selectedLanguage)
    try {
    const activity = await generateActivities(
      name ?? '',
      ageGroup ?? '',
      likes ?? '',
      dislikes ?? '',
      activityRequest,
      selectedLanguage
    ) || ''
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
  }catch (error) {
    console.error('Error creating activity:', error)
    // Handle error (e.g., show error message to user)
  }finally {
    setIsLoading(false)
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
      <Link href="/account?tab=activities" className="inline-block mb-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full transition duration-300 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600">
              ← Back to Activities
            </button>
      </Link>
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
          <div className="mb-4">
            <label htmlFor="language" className="block text-orange-700 mb-2">Story Language</label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
              required
            >
              <option value="">Select Language</option>
              {languages.map((language, index) => (
                <option key={index} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Activity'}
            </motion.button>
          </div>
          {isLoading && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              <p className="mt-2 text-orange-500">Behold you will soon be able to engage your kid in a fun activity... Just give us a moment...</p>
            </div>
          )}
        </form>
      </div>
    </motion.div>
    </div>
    <Footer />
  </>
  )
}