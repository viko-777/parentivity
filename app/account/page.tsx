'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike, Languages, User, MapPin, Globe, Lock, CreditCard, ArrowUpCircle, Plus, Calendar, Book, Activity, Eye } from 'lucide-react'
import { createClient } from '../utils/supabase/client'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { editProfile, createKidProfile, updateKidProfile } from './action'
import toast, { Toaster } from 'react-hot-toast';

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
  const [editingKid, setEditingKid] = useState<any>(null)
  const [kidsProfiles, setKidsProfiles] = useState<any[]>([])
  const [isCreatingNewKid, setIsCreatingNewKid] = useState(false)

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

  useEffect(() => {
    const fetchKidsProfiles = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('KidsProfiles')
          .select('*')
          .eq('user_id', user.id)
        if (!error && data) {
          setKidsProfiles(data)
        }
      }
    }
    fetchKidsProfiles()
  }, [user])

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const result = await editProfile(userProfile, user.id)
      if (result.success) {
        toast.success('Profile updated successfully!', {
          style: {
            background: '#10B981',
            color: '#FFFFFF',
          },
        });
      } else {
        toast.error(result.error || 'An error occurred while updating the profile.', {
          style: {
            background: '#EF4444',
            color: '#FFFFFF',
          },
        });
      }
    }
  }

  const handleCreateKidProfile = async (newKidData: any) => {
    if (user) {
      const result = await createKidProfile(newKidData, user.id)
      if (result.success) {
        setKidsProfiles([...kidsProfiles, result.data])
        setIsCreatingNewKid(false)
        toast.success('Kid profile created successfully!', {
          style: {
            background: '#10B981',
            color: '#FFFFFF',
          },
        });
      } else {
        toast.error(result.error || 'An error occurred while creating the kid profile.', {
          style: {
            background: '#EF4444',
            color: '#FFFFFF',
          },
        });
      }
    }
  }

  const handleUpdateKidProfile = async (updatedKidData: any) => {
    const result = await updateKidProfile(updatedKidData)
    if (result.success) {
      setKidsProfiles(kidsProfiles.map(kid => 
        kid.id === updatedKidData.id ? result.data : kid
      ))
      setEditingKid(null)
      toast.success('Kid profile updated successfully!', {
        style: {
          background: '#10B981',
          color: '#FFFFFF',
        },
      });
    } else {
      toast.error(result.error || 'An error occurred while updating the kid profile.', {
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
        },
      });
    }
  }

  const [activeTab, setActiveTab] = useState('parent')

  const tabContent: TabContent = {
    parent: (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleEditProfile}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Kids Profiles</h2>
        <button 
          onClick={() => setIsCreatingNewKid(true)}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center"
        >
          <Plus className="mr-2" size={18} /> Create New Kid Profile
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {kidsProfiles.map((kid) => (
            <div key={kid.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-orange-500 mb-4">{kid.name}</h3>
              <p className="flex items-center text-gray-600 mb-2"><User className="mr-2" size={18} /> Age Group: {kid.ageGroup}</p>
              <p className="flex items-center text-gray-600 mb-2"><Star className="mr-2" size={18} /> Likes: {kid.likes}</p>
              <p className="flex items-center text-gray-600 mb-4"><X className="mr-2" size={18} /> Dislikes: {kid.dislikes}</p>
              <button 
                onClick={() => setEditingKid(kid)}
                className="bg-orange-100 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-200 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {(editingKid || isCreatingNewKid) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 w-full max-w-md"
              >
                <h3 className="text-2xl font-bold text-orange-500 mb-4">
                  {isCreatingNewKid ? 'Create New Kid Profile' : 'Edit Kid\'s Profile'}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (isCreatingNewKid) {
                    handleCreateKidProfile(editingKid)
                  } else {
                    handleUpdateKidProfile(editingKid)
                  }
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-orange-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={editingKid?.name ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, name: e.target.value})}
                        className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div>
                      <label className="block text-orange-500 mb-1">Age Group</label>
                      <input
                        type="text"
                        name="age_group"
                        value={editingKid?.ageGroup ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, ageGroup: e.target.value})}
                        className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div>
                      <label className="block text-orange-500 mb-1">Likes</label>
                      <input
                        type="text"
                        value={editingKid?.likes ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, likes: e.target.value})}
                        className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div>
                      <label className="block text-orange-500 mb-1">Dislikes</label>
                      <input
                        type="text"
                        value={editingKid?.dislikes ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, dislikes: e.target.value})}
                        className="w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingKid(null)
                        setIsCreatingNewKid(false)
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
                    >
                      {isCreatingNewKid ? 'Create Profile' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ),
    stories: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Story Library</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-3 text-left text-orange-500">Sr. No.</th>
                <th className="p-3 text-left text-orange-500">Title of Story</th>
                <th className="p-3 text-left text-orange-500">Rating</th>
                <th className="p-3 text-left text-orange-500">Created Date</th>
                <th className="p-3 text-left text-orange-500">View Story</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-orange-100">
                <td className="p-3 text-gray-600">1</td>
                <td className="p-3">
                  <div className="flex items-center text-gray-600"><Book className="mr-2" size={18} /> The Magic Rainbow</div></td>
                <td className="p-3">
                  <div className="flex items-center text-gray-600"><Star className="mr-2 text-yellow-400" size={18} /> 5 stars</div></td>
                <td className="p-3">
                  <div className="flex items-center text-gray-600"><Calendar className="mr-2" size={18} /> 2023-05-15</div></td>
                <td className="p-3">
                  <div className="flex items-center text-gray-600"><Eye className="mr-2" size={18} /> View</div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </motion.div>
    ),
    activities: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Activity History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-3 text-left text-orange-500">Sr. No.</th>
                <th className="p-3 text-left text-orange-500">Activity Name</th>
                <th className="p-3 text-left text-orange-500">Rating</th>
                <th className="p-3 text-left text-orange-500">Created Date</th>
                <th className="p-3 text-left text-orange-500">View Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-orange-100">
                <td className="p-3 text-gray-600">1</td>
                <td className="p-3 "><div className="flex items-center text-gray-600"><Activity className="mr-2" size={18} /> Treasure Hunt</div></td>
                <td className="p-3 "><div className="flex items-center text-gray-600"><Star className="mr-2 text-yellow-400" size={18} /> 4 stars</div></td>
                <td className="p-3 "><div className="flex items-center text-gray-600"><Calendar className="mr-2" size={18} /> 2023-05-20</div></td>
                <td className="p-3">
                  <div className="flex items-center text-gray-600"><Eye className="mr-2" size={18} /> View</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    ),
  }

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-white to-orange-100 overflow-hidden relative">
      {/* Background blobs and icons */}
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