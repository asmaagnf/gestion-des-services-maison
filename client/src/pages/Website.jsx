import React from 'react'
import Categories from "../components/Categories/Categories";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Value from "../components/Value/Value";
const Website = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
  
      <Hero />
    </div>
    <Services/>
    <Value/>
    <Categories />
    <Contact/>
    <GetStarted/>
  
  </div>
)}

export default Website
