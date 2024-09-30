import Image from 'next/image'
import { Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike } from 'lucide-react'

export default function Footer() {

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
  
    const allEmojis = [
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
      { emoji: "🎉" },
      { emoji: "🧘‍♀️" },
      { emoji: "👶" },
      { emoji: "🎓" },
      { emoji: "❤️" },
    ]
    
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
            {allEmojis[Math.floor(Math.random() * allEmojis.length)].emoji}
          </div>
        ))}
      </>
    )
  
    return (
    <footer className="bg-gradient-to-r from-yellow-300 to-orange-500 text-white py-8">
      <BackgroundEmojis count={30} />
      <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-24 h-24 relative mb-4 md:mb-0">
              <Image 
                src="/parentivityclearlogo.png"
                alt="Parentivity Logo" 
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-300">Terms of Service</a>
              <a href="#" className="hover:text-yellow-300">Contact Us</a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Parentivity. All rights reserved.</p>
          </div>
        </div>
      </footer>
        )
}