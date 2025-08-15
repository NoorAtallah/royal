import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/hero/hero';
import MissionStats from '../../components/mission/mission';
import OurIndustry from '../../components/ourIndustry/ourIndustry';
import TestimonialsSection from '../../components/impact/impact';
import WhyChooseSection from '../../components/whyUs/whyUs';
const Home = () => {
    return (
        <>
        <Hero />
        <MissionStats />
        <OurIndustry />
        <WhyChooseSection />
        <TestimonialsSection />
      </>
    );
};

export default Home;