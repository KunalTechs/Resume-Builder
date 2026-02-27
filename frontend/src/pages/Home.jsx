import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Feature from '../components/home/Feature'
import Testimonial from '../components/home/Testimonial'
import CalltoAction from '../components/home/CalltoAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero/>
      <Feature/>
      <Testimonial/>
      <CalltoAction/>
      <Footer/>
    </div>
  )
}

export default Home
