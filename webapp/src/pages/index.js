import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/navbar'
import Loginpage from '@/components/loginpage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar />
    </main>
  )
}
