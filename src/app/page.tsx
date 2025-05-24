"use client";

import { motion } from "framer-motion";
import HeaderBar from "@/components/HeaderBar";
import { PopularRecipes } from "@/components/Landing/PopularRecipes";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import Testimonials from "@/components/Landing/Testimonials";
import IngredientSpotlight from "@/components/Landing/IngredientSpotlight";

export default function Home() {


  return (
    <div className="min-h-screen text-[color:var(--color-foreground)] font-sans ">

      <div className="bg-orange-400 px-12 py-6">

        {/* Header */}
        <HeaderBar />


        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-16 mb-3">
          <Hero />
        </section>
      </div>

      {/* Wave Divider */}
      <div className="relative w-full text-[#5a1f24]">
        <div className="max-w-8xl mx-auto">
          <svg
            className="absolute -bottom-1 w-full h-15"
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M0,20C60,20,60,10,120,10C180,10,180,20,240,20C300,20,300,10,360,10C420,10,420,20,480,20C540,20,540,10,600,10C660,10,660,20,720,20C780,20,780,10,840,10C900,10,900,20,960,20C1020,20,1020,10,1080,10C1140,10,1140,20,1200,20L1200,30L0,30Z"
            />
          </svg>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 text-center px-6 bg-[#5a1f24]">
        <HowItWorks />
      </section>


      {/* Testimonials */}
      <section className="bg-[#5a1f24] py-32 px-6 text-center relative overflow-hidden">
        <Testimonials />
      </section>


      {/* Wave Divider - 2 */}
      <div className="relative w-full text-[#5a1f24] z-20">
        <div className="max-w-8xl mx-auto">
          <svg
            className="absolute -top-1 w-full h-15"
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M0,10C60,10,60,20,120,20C180,20,180,10,240,10C300,10,300,20,360,20C420,20,420,10,480,10C540,10,540,20,600,20C660,20,660,10,720,10C780,10,780,20,840,20C900,20,900,10,960,10C1020,10,1020,20,1080,20C1140,20,1140,10,1200,10L1200,0L0,0Z"
            />
          </svg>
        </div>
      </div>

      {/* Ingredient Spotlight*/}
      <section className="bg-orange-400 py-32 px-4 relative text-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="text-center w-full">
            <IngredientSpotlight />
          </div>
        </motion.div>

      </section >

      {/* Popular Recipes */}
      <section className="bg-orange-400 py-32 px-4 relative text-center">
        {/* Popular Recipes - top left */}
        <motion.div
          className="md:col-span-7 z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <PopularRecipes />
        </motion.div>
      </section >



      {/* Footer */}
      < footer className="bg-[#97866A] text-white text-end px-4 py-6" >
        <p>&copy; {new Date().getFullYear()} PantryChef. All rights reserved.</p>
      </ footer >


    </div >

  );
}
