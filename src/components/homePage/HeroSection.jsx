import React from 'react'
import { TypeAnimation } from "react-type-animation"
import SearchSection from './SearchSection'


const HeroSection = () => {
  return (
    // <div className='container'>
        <div className="hero">
            <div className="heading">
                <p>ALL THE FUN STARTS HERE</p>
                <h1>Discover    

                    <TypeAnimation  sequence={[
                        "Concerts",
                        1000,
                        "Sport Events",
                        1000,
                        "Conferences",
                        1000,
                        "Courses",
                        1000,
                        "Workshops",
                        1000,
                    ]}
                    speed={50}
                    repeat={Infinity}
                    style={{  color: '#d9072a' }}
                    />
                    </h1>
                    <h1>around you.</h1>
            </div>
        {/* </div> */}
        <div className="search-section">

        </div>
      <SearchSection />
    </div>
    
  )
}

export default HeroSection
