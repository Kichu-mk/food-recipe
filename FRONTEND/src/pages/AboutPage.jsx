import React from 'react';
import assets from '../assets/assets';
import { motion } from 'framer-motion';
 
const fadeUp = (delay = 0) => ({
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: 'spring', stiffness: 100, damping: 20, delay },
});
 
const stats = [
  { value: '500+', label: 'Recipes' },
  { value: '20+', label: 'Cuisines' },
  { value: '50K+', label: 'Food Lovers' },
  { value: '100%', label: 'Made with Love' },
];
 
const values = [
  {
    icon: '🍳',
    title: 'Simple & Accessible',
    desc: 'Every recipe is crafted with clear steps and beginner-friendly guidance, so anyone can cook with confidence.',
  },
  {
    icon: '🌍',
    title: 'Culturally Rich',
    desc: 'From traditional home recipes to bold global inspirations — we celebrate the full spectrum of flavour.',
  },
  {
    icon: '❤️',
    title: 'Community First',
    desc: "RuchiKoot is more than recipes. It's a space for food lovers to share, explore, and connect.",
  },
  {
    icon: '✨',
    title: 'Crafted with Care',
    desc: 'Each dish is tested, refined, and presented with the attention it deserves — no shortcuts.',
  },
];
 
const AboutPage = () => {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* Warm overlay for readability without hiding bg */}
      <div className="min-h-screen bg-amber-50/60 backdrop-blur-[1px]">
 
        {/* ── HERO SECTION ── */}
        <section className="relative pt-28 pb-16 px-4 flex flex-col items-center text-center overflow-hidden">
          {/* Decorative arch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-b-full bg-amber-800/10 blur-2xl pointer-events-none" />
 
          <motion.div {...fadeUp(0.3)} className="relative z-10">
            <span
              className="inline-block text-xs font-semibold tracking-[0.35em] uppercase text-amber-600 mb-4 px-4 py-1.5 rounded-full border border-amber-300 bg-amber-100/70"
              style={{ fontFamily: 'sans-serif' }}
            >
              Our Story
            </span>
          </motion.div>
 
          <motion.h1
            {...fadeUp(0.45)}
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-bold text-amber-900 leading-tight max-w-3xl"
          >
            Where Every Dish
            <br />
            <span className="italic text-amber-600">Tells a Story</span>
          </motion.h1>
 
          <motion.p
            {...fadeUp(0.6)}
            className="relative z-10 mt-6 text-lg sm:text-xl text-amber-800/80 max-w-xl leading-relaxed"
            style={{ fontFamily: 'sans-serif' }}
          >
            RuchiKoot was born from a simple belief — that great food should be within everyone's reach, from first-time cooks to seasoned home chefs.
          </motion.p>
 
          {/* Logo card */}
          <motion.div
            {...fadeUp(0.75)}
            className="relative z-10 mt-10 group"
          >
            <div className="absolute inset-0 rounded-3xl bg-amber-400/20 blur-xl scale-95 group-hover:scale-100 transition-transform duration-500" />
            <img
              src={assets.homeLogo}
              alt="RuchiKoot"
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover shadow-2xl border-4 border-amber-200 group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </section>
 
        {/* ── STATS STRIP ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="px-4 py-6"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white/60 backdrop-blur-sm border border-amber-200 rounded-2xl py-5 px-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl font-bold text-amber-800">{s.value}</span>
                <span
                  className="text-xs text-amber-600 mt-1 tracking-wide uppercase"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
 
        {/* ── MISSION SECTION ── */}
        <section className="px-4 py-14">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Pull quote */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, type: 'spring', stiffness: 80 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-4 text-[120px] leading-none text-amber-300/60 select-none pointer-events-none font-serif">
                "
              </div>
              <blockquote className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-semibold text-amber-900 leading-snug pl-6">
                Food is more than nourishment — it's a memory, an experience, and a way to connect.
              </blockquote>
              <div className="mt-6 pl-6 flex items-center gap-3">
                <div className="w-10 h-0.5 bg-amber-400" />
                <span className="text-amber-600 text-sm italic" style={{ fontFamily: 'sans-serif' }}>
                  The RuchiKoot Philosophy
                </span>
              </div>
            </motion.div>
 
            {/* Text paragraphs */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 80 }}
              className="space-y-5"
              style={{ fontFamily: 'sans-serif' }}
            >
              <p className="text-amber-800 text-base sm:text-lg leading-relaxed">
                RuchiKoot is your go-to destination for discovering delicious recipes — from everyday meals to special festive dishes. Our mission is to make cooking simple, enjoyable, and accessible for everyone.
              </p>
              <p className="text-amber-800 text-base sm:text-lg leading-relaxed">
                We bring together a variety of recipes inspired by traditional tastes and modern creativity. Each one is crafted with clear ingredients, step-by-step instructions, and helpful tips.
              </p>
              <p className="text-amber-800 text-base sm:text-lg leading-relaxed">
                Whether you're looking for quick weeknight meals, healthy options, or show-stopping festive dishes — RuchiKoot has something for everyone.
              </p>
            </motion.div>
          </div>
        </section>
 
        {/* ── VALUES GRID ── */}
        <section className="px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-900">What We Stand For</h2>
              <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-amber-400" />
            </motion.div>
 
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.12, type: 'spring', stiffness: 90 }}
                  className="group flex gap-5 bg-white/55 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner group-hover:bg-amber-200 transition-colors duration-300">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-1">{v.title}</h3>
                    <p className="text-amber-700 text-sm leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── CLOSING BANNER ── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="px-4 pb-20"
        >
          <div className="max-w-3xl mx-auto text-center bg-amber-800/90 backdrop-blur-sm rounded-3xl py-12 px-8 shadow-2xl">
            <p className="text-amber-200 text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'sans-serif' }}>
              Our Invitation to You
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Cook. Share. Enjoy.
            </h2>
            <p className="text-amber-200 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
              Join a growing community of food lovers who believe the best meals are the ones made with intention — and shared with joy.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/recipes"
                className="inline-block px-7 py-3 rounded-full bg-amber-400 text-amber-900 font-semibold text-sm hover:bg-amber-300 transition-colors duration-200 shadow"
                style={{ fontFamily: 'sans-serif' }}
              >
                Explore Recipes →
              </a>
              <a
                href="/contact"
                className="inline-block px-7 py-3 rounded-full border border-amber-300 text-amber-100 font-semibold text-sm hover:bg-amber-700 transition-colors duration-200"
                style={{ fontFamily: 'sans-serif' }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.section>
 
      </div>
    </div>
  );
};
 
export default AboutPage;