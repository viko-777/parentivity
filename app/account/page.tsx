'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike, Languages, User, MapPin, Globe, Lock, CreditCard, ArrowUpCircle } from 'lucide-react'
import { createClient } from '../utils/supabase/client'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'

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

type TabContent = {
  [key: string]: JSX.Element;
};

export default function UserAccountPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/')
      } else {
        setUser(user)
        const { data, error } = await supabase.from('UserProfile').select('*').eq('user_id', user.id)
        if (error) {
          router.push('/')
        } else {
          setUserProfile(data[0])
        }
      }
    }
    fetchUser()
  }, [])


  const editProfile = async () => {
    const { error } = await supabase.from('UserProfile').update({
      name: userProfile.name,
      city: userProfile.city,
      country: userProfile.country,
      language: userProfile.language,
    }).eq('user_id', user.id)
    if (error) {
      console.error(error)
    }
  }

  const [activeTab, setActiveTab] = useState('parent')

  const tabContent: TabContent = {
    parent: (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={editProfile}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Parent Account</h2>
        {user && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><User className="mr-2" size={18} /> Email: </label>
              <input className='w-full text-orange-500 bg-orange-100 rounded-md p-2' type="email" value={user.email} disabled/>
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><User className="mr-2" size={18} /> Name: </label>
              <input className='w-full text-orange-500 bg-orange-100 rounded-md p-2' type="text" value={userProfile?.name ?? ''} onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><MapPin className="mr-2" size={18} /> City: </label>
              <input className='w-full text-orange-500 bg-orange-100 rounded-md p-2' type="text" value={userProfile?.city ?? ''} onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><Globe className="mr-2" size={18} /> Country: </label>
              <input className='w-full text-orange-500 bg-orange-100 rounded-md p-2' type="text" value={userProfile?.country ?? ''} onChange={(e) => setUserProfile({ ...userProfile, country: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><Languages className="mr-2" size={18} /> Language: </label>
              <input className='w-full text-orange-500 bg-orange-100 rounded-md p-2' type="text" value={userProfile?.language ?? ''} onChange={(e) => setUserProfile({ ...userProfile, language: e.target.value })} />
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300" type="submit">Save Changes</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <button className="bg-orange-100 text-orange-500 px-4 py-3 rounded-md hover:bg-orange-200 transition duration-300 flex items-center justify-center">
            <Lock className="mr-2" size={18} /> Change Password
          </button>
          <button className="bg-orange-100 text-orange-500 px-4 py-3 rounded-md hover:bg-orange-200 transition duration-300 flex items-center justify-center">
            <CreditCard className="mr-2" size={18} /> View Current Plan
          </button>
          <button className="bg-orange-100 text-orange-500 px-4 py-3 rounded-md hover:bg-orange-200 transition duration-300 flex items-center justify-center">
            <ArrowUpCircle className="mr-2" size={18} /> Upgrade Plan
          </button>
        </div>
      </motion.form>
    ),
    kids: (
      <div>
        <h2 className="text-3xl font-bold text-orange-500 mb-4">Kids Account</h2>
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
        <h2 className="text-3xl font-bold text-orange-500 mb-4">Story Library</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-400">
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
        <h2 className="text-3xl font-bold text-orange-500 mb-4">Activity History</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-400">
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-orange-100 p-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">My Account</h1>
        <div className="flex mb-8 overflow-x-auto">
          {['parent', 'kids', 'stories', 'activities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 ${
                activeTab === tab ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
              } rounded-md mr-2 transition duration-300 hover:bg-orange-400 hover:text-white`}
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
          {tabContent[activeTab as keyof TabContent]}
        </motion.div>
      </div>
    </motion.div>
    </div>
    <Footer />
    </>
  )
}