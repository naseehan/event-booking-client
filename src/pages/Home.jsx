import React from 'react'
import HeroSection from '../components/homePage/HeroSection'
import "../stylePages/homePage/App.css"
import DemoCarousel from '../components/homePage/DemoCarousel'

const Home = () => {
  return (
    <div className='container home-section'>
      <HeroSection />
      <DemoCarousel />
    </div>
  )
}

export default Home
