import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const logout = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }, [router]);

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

  const additionalEmojis = [
    { emoji: "🚀" },
    { emoji: "🌈" },
    { emoji: "🎨" },
    { emoji: "🎭" },
    { emoji: "🧩" },
    { emoji: "🏆" },
    { emoji: "🎸" },
    { emoji: "🧸" },
    { emoji: "🌺" },
    { emoji: "🦄" },
  ]

  const featureEmojis = ["🎉", "🧘‍♀️", "👶", "🎓", "❤️"]
  const allEmojis = [...additionalEmojis.map(e => e.emoji), ...featureEmojis]

  const BackgroundEmojis = ({ count = 20 }) => (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={`bg-emoji-${i}`}
          className="absolute text-4xl opacity-10 animate-float pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        >
          {allEmojis[Math.floor(Math.random() * allEmojis.length)]}
        </div>
      ))}
    </>
  )

  return (
    <header className="bg-white shadow-md top-0 left-0 right-0 z-50 relative overflow-hidden">
      <BackgroundEmojis count={30} />
      <nav className="container mx-auto px-6 py-3 relative z-10">
        <div className="flex justify-between items-center">
          <div className="w-24 h-24 relative">
            <Link href="/">
              <Image 
                src="/parentivityclearlogo.png" 
                alt="Parentivity Logo" 
                layout="fill"
                className="w-24 h-24"
              />
            </Link>
          </div>
          <form>
            <div className="hidden md:flex items-center space-x-4">
              {!isLoading && !isLoggedIn && (
                <>
                  <a href="about-us" className="text-orange-600 hover:text-violet-700 font-bold">About Us</a>
                  <a href="faq" className="text-orange-600 hover:text-violet-700 font-bold">FAQ</a>
                  <a href="pricing" className="text-orange-600 hover:text-violet-700 font-bold">Pricing</a>
                </>
              )}
              {!isLoading && isLoggedIn && (
                  <>
                    <Link href="/account">
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105">
                        My Account
                      </button>
                    </Link>
                    <Link href="/">
                      <button 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105" 
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </Link>
                  </>
                )}

            </div>
          </form>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <form>
          <div className="md:hidden bg-white px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {!isLoading && !isLoggedIn && (
              <>
                <a href="about-us" className="text-orange-600 hover:text-violet-700 font-bold">About Us</a>
                <a href="faq" className="text-orange-600 hover:text-violet-700 font-bold">FAQ</a>
                <a href="pricing" className="text-orange-600 hover:text-violet-700 font-bold">Pricing</a>
              </>
            )}
            {!isLoading && isLoggedIn && (
                <>
                  <a href="account" className="text-orange-600 hover:text-violet-700 font-bold">My Account</a>
                  <a href="logout" className="text-orange-600 hover:text-violet-700 font-bold">Logout</a>
                </>
              )}
              {!isLoading && isLoggedIn && (
                  <>
                    <Link href="/account">
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105">
                        My Account
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105" formAction={logout}>
                        Logout
                      </button>
                    </Link>
                  </>
                )}
          </div>
        </form>
      )}
    </header>
  )
}
