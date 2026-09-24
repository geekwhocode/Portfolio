"use client";
import React, { useState } from "react";

export default function ContactTerminal() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto my-12 font-mono">
      <h3 className="text-2xl font-bold text-center mb-8 text-white font-sans">
        Option 3: <span className="text-green-400">Developer Terminal</span>
      </h3>
      
      <div className="bg-[#0D1117] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-[#161B22] px-4 py-3 flex items-center border-b border-slate-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-slate-400 text-sm font-sans">aman@ubuntu:~</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 text-sm md:text-base text-green-400 space-y-4">
          <p><span className="text-blue-400">aman@ubuntu:~$</span> ./initiate_contact.sh</p>
          <p className="text-slate-300">Initializing secure connection to Aman Virk...</p>
          <p className="text-slate-300">Connection established.</p>
          
          <div className="mt-4">
            <span className="text-blue-400">?</span> <span className="text-white font-bold">enter_name:</span> 
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-none outline-none text-green-400 ml-2 w-1/2 focus:ring-0"
              placeholder="_"
              autoFocus
            />
          </div>

          <div className={`transition-opacity duration-500 ${name.length > 2 ? 'opacity-100' : 'opacity-30'}`}>
            <span className="text-blue-400">?</span> <span className="text-white font-bold">enter_email:</span> 
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none outline-none text-green-400 ml-2 w-1/2 focus:ring-0"
              placeholder={name.length > 2 ? "_" : ""}
              disabled={name.length <= 2}
            />
          </div>

          <div className={`transition-opacity duration-500 ${email.includes('@') ? 'opacity-100' : 'opacity-30'}`}>
            <span className="text-blue-400">?</span> <span className="text-white font-bold">enter_message:</span> 
            <textarea 
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent border-none outline-none text-green-400 ml-2 w-3/4 align-top resize-none focus:ring-0"
              placeholder={email.includes('@') ? "_" : ""}
              disabled={!email.includes('@')}
            />
          </div>

          {message.length > 5 && (
            <div className="pt-4">
              <button className="text-black bg-green-400 px-4 py-1 hover:bg-green-300 transition-colors font-bold">
                EXECUTE ./send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
