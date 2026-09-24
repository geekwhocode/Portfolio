"use client";
import React from "react";

export default function ContactBento() {
  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      <h3 className="text-2xl font-bold text-center mb-8 text-white">
        Option 2: <span className="text-blue-400">Bento Box Grid</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Availability Tile */}
        <div className="col-span-1 bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 flex flex-col justify-center items-center text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          <div className="relative flex h-5 w-5 mb-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">Available for Work</h4>
          <p className="text-slate-400 text-sm">Actively seeking full-time roles and freelance opportunities.</p>
        </div>

        {/* Form Tile (Takes up 2 columns) */}
        <div className="col-span-1 md:col-span-2 row-span-2 bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          <h4 className="text-2xl font-semibold text-white mb-6">Send a Message</h4>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 pl-2">Your Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 pl-2">Your Email</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 pl-2">Your Message</label>
              <textarea rows={4} placeholder="How can I help you?" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-xl py-3 mt-2 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] transition-all">
              Launch Message
            </button>
          </form>
        </div>

        {/* Direct Email Tile */}
        <div className="col-span-1 bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-md rounded-3xl p-8 border border-blue-500/30 flex flex-col justify-center items-center text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]">
          <i className="fas fa-envelope text-4xl text-blue-400 mb-4"></i>
          <h4 className="text-lg font-semibold text-white">Direct Email</h4>
          <a href="mailto:thegeekwhocode@gmail.com" className="text-blue-300 hover:text-white transition-colors mt-2 text-sm break-all">
            thegeekwhocode@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}
