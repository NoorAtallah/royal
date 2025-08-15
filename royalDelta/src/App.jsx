import { useState } from 'react'
import Navbar from './components/layouts/navbar'
import Hero from './components/hero/hero'
import MissionStats from './components/mission/mission'
import OurIndustry from './components/ourIndustry/ourIndustry'
import WhyChooseSection from './components/whyUs/whyUs'
import TestimonialsSection from './components/impact/impact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactFooterSection from './components/layouts/footer'
import AboutUs from './pages/aboutUs/aboutUs'
import Home from './pages/home/home'
import TechnologySolutions from './pages/tech/tech'
import TravelTourism from './pages/travel/travel'
import FoodServices from './pages/food/food'
import RealEstate from './pages/realEstate/realEstate'
import Retail from './pages/retail/retail'
import LogisticsServices from './pages/logistic/logistic'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/technology-solutions" element={<TechnologySolutions />} />
        <Route path="/services/travel" element={<TravelTourism />} />
        <Route path="/services/food" element={<FoodServices />} />
        <Route path="/services/real-estate" element={<RealEstate />} />
        <Route path="/services/retail" element={<Retail />} />
        <Route path="/services/logistics" element={<LogisticsServices />} />
    
      </Routes>
      <ContactFooterSection />
    </Router>
  )
}

export default App
