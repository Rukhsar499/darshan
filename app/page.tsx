'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, ArrowRight, CheckCircle2, Menu, X } from 'lucide-react';
import Image from "next/image";
import { motion } from "framer-motion";


interface FormData {
  full_name: string;
  contact_no: string;
  email_id: string;
  city: string;
  age: string;
  profession: string;
  dietPreference: string;
}

export default function MusicalWorkshopLanding() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    contact_no: '',
    email_id: '',
    city: '',
    age: '',
    profession: '',
    dietPreference: '',
  });

  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {

      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log(result);

      if (result.status === true) {

        setIsSubmitted(true);

      } else {

        alert("Submission failed");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (
    <div className="min-h-screen bg-[url('/images/bg.jpeg')] bg-cover bg-center bg-no-repeat text-slate-100 font-sans selection:bg-[#dfb76c] selection:text-black antialiased">

      {/* Dynamic Global Header */}
      <nav className="fixed top-0 inset-x-0 bg-[#060b18]/90 backdrop-blur-md z-50 border-b border-[#dfb76c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Side: Brand Logo Slot */}
            <div className="flex-shrink-0 flex items-center gap-2 bg-[white]">
              <span className=" font-serif text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f3dca3] via-[#dfb76c] to-[#a17a32]">
                <Image
                  src="/images/psm.webp"
                  alt="PSM Logo"
                  width={130}
                  height={26}
                  className="object-contain"
                />
              </span>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-slate-300 hover:text-[#dfb76c] transition-colors">About</a>
              <a href="#curriculum" className="text-sm font-medium text-slate-300 hover:text-[#dfb76c] transition-colors">Curriculum</a>
              <a href="#register" className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3dca3] via-[#dfb76c] to-[#c59b4e] hover:brightness-110 shadow-md transition-all">
                Book Slot
              </a>
            </div>

            {/* Mobile menu trigger button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-[#dfb76c] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1128] border-b border-[#dfb76c]/10 px-4 pt-2 pb-6 space-y-3">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 rounded-lg">About</a>
            <a href="#curriculum" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 rounded-lg">Curriculum</a>
            <a href="#register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3dca3] via-[#dfb76c] to-[#c59b4e]">
              Book Slot
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="about" className="relative overflow-hidden min-h-screen pt-24 pb-12 flex items-center justify-center border-b border-[#dfb76c]/10">

        {/* Poster Fluid Royal Blue and Gold Metallic Background Texture Match */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f1d43] via-[#060b18] to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-5 pointer-events-none" />

        {/* Subtle glowing gold ambiance matching top-left corner elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#dfb76c]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#dfb76c]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Event Context Details */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#dfb76c] font-semibold">
                A Musical Workshop
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#f3dca3] via-[#dfb76c] to-[#a17a32] drop-shadow-md">
                SOOR O DARSHAN
              </h1>
              <p className="text-sm text-white">
                Soor Darshan – A Musical Workshop is a unique two-day immersive music learning experience led by Padma Bhushan Pandit Ajoy Chakrabarty, one of India’s most celebrated classical vocalists. Presented by PSM Management Services Pvt Ltd and Education Partner Narayana Group of Schools, West Bengal, the workshop is designed for aspiring singers, music learners, students, teachers, and music enthusiasts of all levels.
              </p>
              <p className="text-sm text-white">
                Participants will gain hands-on exposure to the fundamentals of Indian classical music, including sur, taal, riyaz, voice culture, breathing techniques, raaga expression, improvisation, and performance skills. The workshop will also feature interactive sessions, live practical learning, expert guidance, and valuable feedback from Panditji himself.
              </p>

              {/* Partners Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center">
                <span className="px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="text-sm text-slate-400">Education Partner</span>
                  <Image
                    src="/images/narayana.webp"
                    alt="Narayana Logo"
                    width={200}
                    height={26}
                    className="object-contain"
                  />
                </span>
              </div>

              {/* Mentor Card Layout */}
              <div className="rounded-2xl p-5 bg-[#0a1128]/50 border border-[#dfb76c]/10 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5 max-w-2xl mx-auto lg:mx-0">
                <div className="w-48 h-48 md:w-36 md:h-36 rounded-full flex items-center justify-center overflow-hidden border-2 border-[#dfb76c]/30 shadow-xl shadow-black/40 shrink-0">
                  <Image
                    src="/images/panditji.webp"
                    alt="Pandit Ji"
                    width={250}
                    height={250}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <span className="inline-block text-[10px] tracking-widest font-bold bg-gradient-to-r from-[#dfb76c] to-[#a17a32] text-slate-950 px-2.5 py-0.5 rounded-md mb-1">
                    WORKSHOP CONDUCTED BY
                  </span>
                  <h2 className="text-lg md:text-xl text-slate-200 font-medium">Padma Bhushan</h2>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#dfb76c]">
                    Pandit Ajoy Chakrabarty
                  </h3>
                </div>
              </div>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0 pt-2">
                <div className="p-4 rounded-xl bg-[#0a1128]/40 backdrop-blur border-l-2 border-[#dfb76c] flex gap-4 items-center text-left">
                  <Calendar className="w-5 h-5 text-[#dfb76c] shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#dfb76c]/80 tracking-wider uppercase">Date</p>
                    <p className="text-white font-bold text-sm md:text-base">22nd & 23rd June 2026</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0a1128]/40 backdrop-blur border-l-2 border-[#dfb76c] flex gap-4 items-center text-left">
                  <Clock className="w-5 h-5 text-[#dfb76c] shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#dfb76c]/80 tracking-wider uppercase">Timing</p>
                    <p className="text-white font-bold text-sm md:text-base">11:00 AM to 4:00 PM</p>
                  </div>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-[#0a1128]/40 backdrop-blur border-l-2 border-[#dfb76c] flex gap-4 items-center text-left">
                  <MapPin className="w-5 h-5 text-[#dfb76c] shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#dfb76c]/80 tracking-wider uppercase">Venue</p>
                    <p className="text-white font-bold text-sm md:text-base">Biswa Bangla Convention Centre</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Secure Registration Form Container */}
            <div id="register" className="lg:col-span-5 w-full max-w-md mx-auto pt-4 lg:pt-0">
              <div className="p-6 md:p-8 rounded-2xl bg-[#0a1128]/70 backdrop-blur-xl border border-slate-800 shadow-2xl relative">

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white tracking-wide">Secure Your Seat</h3>
                  <div className="inline-block px-5 py-2 rounded-full bg-[#060b18]/80 border border-[#dfb76c]/10 mt-3 text-center">
                    <span className="text-slate-500 line-through text-sm mr-2.5">₹3,000</span>
                    <span className="text-[#dfb76c] font-bold text-xl">₹2,500/-</span>
                    <span className="block text-[11px] text-[#dfb76c]/70 mt-0.5">*As Early Bird</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#dfb76c]/10 text-[#dfb76c] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#dfb76c]/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Registration Processed</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Thank you for submitting your info! We will reach out over phone/email to finalize verification metrics.
                    </p>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className={`space-y-4 ${validated ? 'was-validated' : ''}`}>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input type="text" name="full_name" onChange={handleInputChange} placeholder="John Doe" className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-[#dfb76c] transition-colors" required />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input type="email" name="email_id" onChange={handleInputChange} placeholder="john@example.com" className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-[#dfb76c] transition-colors" required />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Contact Number</label>
                      <input type="tel" name="contact_no" onChange={handleInputChange} placeholder="98362 XXXXX" className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-[#dfb76c] transition-colors" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">City</label>
                        <input type="text" name="city" onChange={handleInputChange} placeholder="Kolkata" className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-[#dfb76c] transition-colors" required />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Age</label>
                        <input type="text" name="age" onChange={handleInputChange} placeholder="24" className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-[#dfb76c] transition-colors" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Profession</label>
                      <input type="text" name="profession" onChange={handleInputChange} placeholder="Music Instructor" className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-[#dfb76c] transition-colors" required />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">You are a...</label>
                      <select name="dietPreference" onChange={handleInputChange} className="w-full bg-[#060b18] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-[#dfb76c] transition-colors" required>
                        <option value="" disabled>Select your meal option</option>
                        <option value="Veg">Veg</option>
                        <option value="Non Veg">Non Veg</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button type="submit" className="w-full bg-gradient-to-r from-[#f3dca3] via-[#dfb76c] to-[#c59b4e] text-slate-950 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-lg shadow-[#dfb76c]/10 hover:brightness-110">
                        Register & Pay Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                      *Accommodation required: If yes, then &ldquo;Additional Rs 1500 is required&rdquo;
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      <section className="py-10 w-full items-center justify-center">
        <div className="container mx-auto max-w-5xl">

          <iframe
            src="https://www.youtube.com/embed/4FvDqeKn_WU?si=6w7CnerNEf6rCyJ_"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-[600px] rounded-2xl"
          ></iframe>

        </div>
      </section>

      {/* Curriculum Highlights Section */}
      <section id="curriculum" className="py-10 px-4 md:px-6 relativ">
        <div className="container mx-auto max-w-5xl px-4">

          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#dfb76c] font-bold">Curriculum Breakdown</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">Highlights of the Workshop</h2>
            <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Day 1 Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#0a1128] to-[#060b18] border border-slate-800/80 hover:border-[#dfb76c]/20 transition-all duration-350 shadow-xl group">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-4 mb-6">
                <h3 className="text-xl font-bold text-[#dfb76c]">Day 1</h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#dfb76c]/10 text-[#dfb76c] border border-[#dfb76c]/20">
                  Foundation & Excellence
                </span>
              </div>
              <ul className="space-y-4 text-slate-300 text-sm md:text-base">
                {[
                  "Master Soor, Taal & Riyaz",
                  "Learn voice culture & breathing techniques",
                  "Understand raaga expression",
                  "Develop vocal performance skills",
                  "An engaging interactive Q & A session"
                ].map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#dfb76c] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day 2 Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#0a1128] to-[#060b18] border border-slate-800/80 hover:border-[#dfb76c]/20 transition-all duration-350 shadow-xl group">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-4 mb-6">
                <h3 className="text-xl font-bold text-[#dfb76c]">Day 2</h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#dfb76c]/10 text-[#dfb76c] border border-[#dfb76c]/20">
                  Practical & Expression
                </span>
              </div>
              <ul className="space-y-4 text-slate-300 text-sm md:text-base">
                {[
                  "Enhance improvisation & voice techniques",
                  "Explore semi-classical styles",
                  "Participate in live performances",
                  "Receive expert feedback from Panditji",
                  "Experience interactive learning sessions"
                ].map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#dfb76c] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Contact Bar */}
      <footer className="bg-black/40 border-t border-slate-900/60 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            This workshop is open to school & college students, vocal learners, teachers, and all music enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-xs text-slate-400">For Queries, Contact:</span>
            <a href="tel:9836224116" className="flex items-center gap-2 text-[#dfb76c] font-bold hover:text-[#f3dca3] transition-colors text-lg tracking-wide group">
              <Phone className="w-4 h-4 text-[#dfb76c]" />
              98362 24116
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}