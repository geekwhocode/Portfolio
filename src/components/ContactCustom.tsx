"use client";
import React from "react";
import Image from "next/image";

export default function ContactCustom() {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector("button");
    if (!btn) return;
    const originalText = btn.innerText;

    btn.innerText = "Sending...";
    btn.style.opacity = "0.8";

    setTimeout(() => {
      btn.innerText = "Message Sent!";
      btn.style.backgroundColor = "#10b981";
      (e.target as HTMLFormElement).reset();

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.opacity = "1";
      }, 3000);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-12 items-center reveal">
      
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2">
        <form className="w-full bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 shadow-xl backdrop-blur-md" onSubmit={handleContactSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input type="text" id="name" placeholder="John Doe" required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="How can I help you?"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary submit-btn w-full text-center justify-center">
            Send Message
          </button>
        </form>
      </div>

      {/* Right Column: Illustration & Info */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full"></div>

        {/* Generative AI Brain Image */}
        <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 hover:scale-[1.02] transition-transform duration-500 mb-10 z-10">
          <Image 
            src="/contact-illustration.jpg" 
            alt="AI Concept Illustration" 
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        {/* Contact Info Pills */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px] z-10">
          <a href="mailto:thegeekwhocode@gmail.com" className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center space-x-3 hover:bg-slate-700 transition-colors group shadow-lg">
            <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="overflow-hidden">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Email</p>
              <h4 className="text-white font-medium text-sm truncate">Click to mail</h4>
            </div>
          </a>

          <a href="tel:+917880000778" className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center space-x-3 hover:bg-slate-700 transition-colors group shadow-lg">
            <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="overflow-hidden">
              <p className="text-slate-400 text-xs uppercase tracking-wider">Call</p>
              <h4 className="text-white font-medium text-sm truncate">+91-7880000778</h4>
            </div>
          </a>
        </div>
      </div>

    </div>
  );
}
