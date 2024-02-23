import React, { useEffect, useState } from 'react'
import HeroSection from '../components/homePage/HeroSection'
import "../stylePages/homePage/App.css"
import DemoCarousel from '../components/homePage/DemoCarousel'
import Clients from '../components/homePage/Clients'
import ScrollButton from '../components/ScrollButton'
import Features from '../components/Features'
import FAQ from '../components/FAQ'
// import Blog from '../components/homePage/blog/Blog'

const Home = () => {

  const [token, setToken] = useState();

  useEffect(() => {

    const storedToken  = localStorage.getItem("userstokentoken");
setToken(storedToken );
  },[])

  return (
    <div className='container home-section'>
      <HeroSection />
      <DemoCarousel />
      <Clients />
      <Features />
      <FAQ />
      <ScrollButton />
      {/* <Blog /> */}
    </div>
  )
}

export default Home
