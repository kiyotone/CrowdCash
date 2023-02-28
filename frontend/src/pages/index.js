import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './auth/Login'
import Topbar from '@/components/Topbar'
import withAuth from '@/components/stuff/withAuth' // Higher order component to protect routes

const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <>
    <Topbar />
    {/* <Login />   */}
    </>
  )
}

export default withAuth(Home);
