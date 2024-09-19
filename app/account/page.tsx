'use client'
import { useState, useEffect } from 'react' 
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike, Languages, User, MapPin, Globe, Lock, CreditCard, ArrowUpCircle, Plus, Calendar, Book, Activity, Eye, Trash2, Edit } from 'lucide-react'
import { createClient } from '../utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { editProfile, createKidProfile, updateKidProfile } from './action'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams } from 'next/navigation'
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Select from 'react-select';


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

type LanguageOption = { value: string; label: string };

const languageOptions: LanguageOption[] = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Tamil', label: 'Tamil' },
];

export default function UserAccountPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [editingKid, setEditingKid] = useState<any>(null)
  const [kidsProfiles, setKidsProfiles] = useState<any[]>([])
  const [stories, setStories] = useState<any[]>([])
  const [isCreatingNewKid, setIsCreatingNewKid] = useState(false)
  const [activities, setActivities] = useState<any[]>([])
  const [storyToDelete, setStoryToDelete] = useState<any>(null)
  const [activityToDelete, setActivityToDelete] = useState<any>(null)
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('parent')
  const [kidToDelete, setKidToDelete] = useState<any>(null)
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['parent', 'kids', 'stories', 'activities'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

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


  useEffect(() => {
    const fetchStories = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('Stories')
          .select('*')
          .eq('user_id', user.id)
        if (!error && data) {
          setStories(data)
        }
      }
    }
    fetchStories()
  }, [user])

  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('Activities')
          .select('*')
          .eq('user_id', user.id)
        if (!error && data) {
          setActivities(data)
        }
      }
    }
    fetchActivities()
  }, [user])

  useEffect(() => {
    if (userProfile) {
      setSelectedCountry({ name: userProfile.country });
      setSelectedState({ name: userProfile.state });
      setSelectedCity({ name: userProfile.city });
    }
  }, [userProfile]);

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const result = await editProfile(userProfile, user.id)
      if (result.success) {
        toast.success('Profile updated successfully!');
        // Update the local state with the new data
        if (result.data && result.data.length > 0) {
          setUserProfile(result.data[0]);
        }
      } else {
        toast.error(result.error || 'An error occurred while updating the profile.');
      }
    }
  }

  const handleCreateKidProfile = async (newKidData: any) => {
    if (user) {
      const result = await createKidProfile(newKidData, user.id)
      if (result.success) {
        setKidsProfiles([...kidsProfiles, result.data])
        setIsCreatingNewKid(false)
        setEditingKid(null)
        toast.success('Kid profile created successfully!');
      } else {
        toast.error(result.error || 'An error occurred while creating the kid profile.');
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
      setIsCreatingNewKid(false)
      toast.success('Kid profile updated successfully!');
    } else {
      toast.error(result.error || 'An error occurred while updating the kid profile.');
    }
  }

  const handleDeleteStory = async (storyId: string) => {
    const { error } = await supabase
      .from('Stories')
      .delete()
      .eq('id', storyId)

    if (error) {
      toast.error('Failed to delete the story. Please try again.')
    } else {
      setStories(stories.filter(story => story.id !== storyId))
      toast.success('Story deleted successfully!')
    }
    setStoryToDelete(null)
  }

  const handleDeleteActivity = async (activityId: string) => {
    const { error } = await supabase
      .from('Activities')
      .delete()
      .eq('id', activityId)

    if (error) {
      toast.error('Failed to delete the activity. Please try again.')
    } else {
      setActivities(activities.filter(activity => activity.id !== activityId))
      toast.success('Activity deleted successfully!')
    }
    setActivityToDelete(null)
  }

  const handleDeleteKidProfile = async (kidId: string) => {
    const { error } = await supabase
      .from('KidsProfiles')
      .delete()
      .eq('id', kidId)

    if (error) {
      toast.error('Failed to delete the kid profile. Please try again.')
    } else {
      setKidsProfiles(kidsProfiles.filter(kid => kid.id !== kidId))
      toast.success('Kid profile deleted successfully!')
    }
    setKidToDelete(null)
  }

  const handleLanguageChange = (selectedOptions: readonly LanguageOption[]) => {
    const selectedLanguages = selectedOptions.map(option => option.value);
    setUserProfile({ ...userProfile, language: selectedLanguages.join(', ') });
  };

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
              <label className='text-orange-500 flex items-center'><Globe className="mr-2 text-orange-500" size={18} /> Country: </label>
              <CountrySelect
                onChange={(e: any) => {
                  setCountryId(e.id);
                  setSelectedCountry(e);
                  setUserProfile({ ...userProfile, country: e.name });
                }}
                placeHolder="Select Country"
                containerClassName="w-full bg-orange-100 text-orange-500"
                inputClassName="w-full text-orange-500 bg-orange-100 rounded-md p-2"
                selectedValue={selectedCountry}
              />
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><MapPin className="mr-2" size={18} /> State: </label>
              <StateSelect
                countryid={countryId}
                onChange={(e: any) => {
                  setStateId(e.id);
                  setSelectedState(e);
                  setUserProfile({ ...userProfile, state: e.name });
                }}
                placeHolder="Select State"
                containerClassName="w-full bg-orange-100 text-orange-500"
                inputClassName="w-full text-orange-500 bg-orange-100 rounded-md p-2"
                selectedValue={selectedState}
              />
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'><MapPin className="mr-2" size={18} /> City: </label>
              <CitySelect
                countryid={countryId}
                stateid={stateId}
                onChange={(e: any) => {
                  setSelectedCity(e);
                  setUserProfile({ ...userProfile, city: e.name });
                }}
                placeHolder="Select City"
                containerClassName="w-full bg-orange-100 text-orange-500"
                inputClassName="w-full text-orange-500 bg-orange-100 rounded-md p-2"
                selectedValue={selectedCity}
              />
            </div>
            <div className="space-y-2">
              <label className='text-orange-500 flex items-center'>
                <Languages className="mr-2" size={18} /> Language:
              </label>
              <Select
                isMulti
                options={languageOptions}
                value={userProfile?.language ? userProfile.language.split(', ').map((lang: string) => ({ value: lang, label: lang })) : []}
                onChange={handleLanguageChange}
                className="text-orange-500"
                classNamePrefix="select"
                placeholder="Select languages"
              />
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300" type="submit">Save Changes</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <button className="bg-orange-100 text-orange-500 px-4 py-3 rounded-md hover:bg-orange-200 transition duration-300 flex items-center justify-center" disabled>
            <Lock className="mr-2" size={18} /> Change Password
          </button>
          <button className="bg-orange-100 text-orange-500 px-4 py-3 rounded-md hover:bg-orange-200 transition duration-300 flex items-center justify-center" disabled>
            <CreditCard className="mr-2" size={18} /> View Current Plan
          </button>
          <button className="bg-orange-100 text-orange-500 px-4 py-3 rounded-md hover:bg-orange-200 transition duration-300 flex items-center justify-center" disabled>
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
              <div className="flex space-x-2">
                <button 
                  onClick={() => setEditingKid(kid)}
                  className="bg-orange-100 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-200 transition duration-300 flex items-center"
                >
                  <Edit className="mr-2" size={18} /> Edit
                </button>
                <button 
                  onClick={() => setKidToDelete(kid)}
                  className="bg-red-100 text-red-500 px-4 py-2 rounded-md hover:bg-red-200 transition duration-300 flex items-center"
                >
                  <Trash2 className="mr-2" size={18} /> Delete
                </button>
              </div>
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
                        className={`w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white ${editingKid?.name ? 'text-orange-500' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-orange-500 mb-1">Age Group</label>
                      <select
                        value={editingKid?.ageGroup ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, ageGroup: e.target.value})}
                        className={`w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white ${editingKid?.ageGroup ? 'text-orange-500' : 'text-orange-500'}`}
                      >
                        <option value="select">Select age group</option>
                        <option value="0-2">0-2 years</option>
                        <option value="2-4">2-4 years</option>
                        <option value="4-6">4-6 years</option>
                        <option value="6-8">6-8 years</option>
                        <option value="8-10">8-10 years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-orange-500 mb-1">Likes</label>
                      <input
                        type="text"
                        value={editingKid?.likes ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, likes: e.target.value})}
                        className={`w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white ${editingKid?.likes ? 'text-orange-500' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-orange-500 mb-1">Dislikes</label>
                      <input
                        type="text"
                        value={editingKid?.dislikes ?? ''}
                        onChange={(e) => setEditingKid({...editingKid, dislikes: e.target.value})}
                        className={`w-full p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white ${editingKid?.dislikes ? 'text-orange-500' : ''}`}
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

        <AnimatePresence>
          {kidToDelete && (
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
                <h3 className="text-2xl font-bold text-orange-500 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete the profile for "{kidToDelete.name}"? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setKidToDelete(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteKidProfile(kidToDelete.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500">Story Library</h2>
          <button
            onClick={() => router.push('/create-story')}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center"
          >
            <Plus className="mr-2" size={18} /> Create Story
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-3 text-left text-orange-500">Sr. No.</th>
                <th className="p-3 text-left text-orange-500">Title of Story</th>
                <th className="p-3 text-left text-orange-500">Created Date</th>
                <th className="p-3 text-left text-orange-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story, index) => (
                <tr key={story.id} className="border-b border-orange-100">
                  <td className="p-3 text-gray-600">{index + 1}</td>
                  <td className="p-3">
                  <Link href={`/story/${story.id}`}>
                    <div className="flex items-center text-gray-600 cursor-pointer hover:text-orange-500">
                      <Book className="mr-2" size={18} /> {story.title}
                    </div>
                  </Link>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="mr-2" size={18} /> {new Date(story.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center text-gray-600">
                      <Link href={`/story/${story.id}`}>
                        <Eye className="mr-2 cursor-pointer hover:text-orange-500" size={24} />
                      </Link>
                      <Trash2
                        className="cursor-pointer hover:text-red-500"
                        size={24}
                        onClick={() => setStoryToDelete(story)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {storyToDelete && (
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
                <h3 className="text-2xl font-bold text-orange-500 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete the story "{storyToDelete.title}"? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setStoryToDelete(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteStory(storyToDelete.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ),
    activities: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">Activity History</h2>
          <button
            onClick={() => router.push('/create-activity')}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center"
          >
            <Plus className="mr-2" size={18} /> Create Activity
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-3 text-left text-orange-500">Sr. No.</th>
                <th className="p-3 text-left text-orange-500">Activity Name</th>
                <th className="p-3 text-left text-orange-500">Created Date</th>
                <th className="p-3 text-left text-orange-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id} className="border-b border-orange-100">
                  <td className="p-3 text-gray-600">{index + 1}</td>
                  <td className="p-3">
                  <Link href={`/activity/${activity.id}`}>
                    <div className="flex items-center text-gray-600 cursor-pointer hover:text-orange-500">
                      <Book className="mr-2" size={18} /> {activity.title}
                    </div>
                  </Link>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="mr-2" size={18} /> {new Date(activity.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center text-gray-600">
                      <Link href={`/activity/${activity.id}`}>
                        <Eye className="mr-2 cursor-pointer hover:text-orange-500" size={24} />
                      </Link>
                      <Trash2
                        className="cursor-pointer hover:text-red-500"
                        size={24}
                        onClick={() => setActivityToDelete(activity)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {activityToDelete && (
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
                <h3 className="text-2xl font-bold text-orange-500 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete the activity "{activityToDelete.title}"? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setActivityToDelete(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activityToDelete.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ),
  }

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-white to-orange-100 overflow-hidden relative">
        {/* ... background elements ... */}
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