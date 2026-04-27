import React from 'react';
import assets from '../assets/assets';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{  y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
            className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 mt-16 min-h-screen flex flex-col items-center bg-[url('/src/assets/about-bg.png')] bg-cover bg-center bg-no-repeat">
            <div className="flex justify-center  hover:scale-105 transition-transform duration-300 ease-in-out">
                <motion.img
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1 }}
                src={assets.homeLogo} alt="" className="w-100 h-100 rounded-2xl" />
            </div>
            <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1 }}
            className="flex  flex-col mt-8 w-[80%]">
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold  mt-6 mb-4 text-amber-800">About Us</h1>
                <p className="text-lg sm:text-2xl text-amber-700  mb-6">
                  Welcome to RuchiKoot – a place where flavors come together!
                </p>
                <p className="text-lg sm:text-2xl text-amber-700  mb-6">
                    RuchiKoot is your go-to destination for discovering delicious recipes from everyday meals to special dishes. Our mission is to make cooking simple, enjoyable, and accessible for everyone, whether you are a beginner or an experienced home chef.
                </p>
                <p className="text-lg sm:text-2xl text-amber-700  mb-6">
                    We bring together a variety of recipes inspired by traditional tastes and modern creativity. Each recipe is carefully crafted with clear ingredients, step-by-step instructions, and helpful tips to make your cooking experience smooth and satisfying.
                </p>
                <p className="text-lg sm:text-2xl text-amber-700  mb-6">
                    At RuchiKoot, we believe that food is more than just nourishment – it’s an experience, a memory, and a way to connect with people. That’s why we aim to build a community where food lovers can explore, share, and enjoy recipes from different cultures and styles.
                </p>
                <p className="text-lg sm:text-2xl text-amber-700  mb-6">
                    Whether you’re looking for quick meals, healthy options, or festive dishes, RuchiKoot has something for everyone.
                </p>
                <p className="text-lg sm:text-2xl font-bold text-amber-700  mb-6">
                    Cook. Share. Enjoy.
                </p>
            </motion.div>
        </motion.div>
    );
}

export default AboutPage;
