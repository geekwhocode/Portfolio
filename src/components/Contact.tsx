import React, { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = new URLSearchParams();
    
    // Convert FormData to URLSearchParams
    formData.forEach((value, key) => {
      data.append(key, value.toString());
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section flex flex-col items-center">
      <div className="section-header reveal">
        <h2 className="section-title">
          Let's Build Something <span className="gradient-text">Great</span>{" "}
          Together.
        </h2>
      </div>

      <div className="w-full max-w-5xl reveal mt-12 mb-20">
        <div className="bg-[#111827] border border-slate-800 rounded-xl shadow-2xl flex flex-col">
          
          {/* macOS Header Bar */}
          <div className="bg-[#1F2937] rounded-t-xl px-5 py-3 flex items-center border-b border-slate-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Column: Form */}
            <div className="w-full md:w-3/5" style={{ padding: '2.5rem 3rem' }}>
              <h3 className="text-3xl font-bold text-white" style={{ marginBottom: '1rem' }}>Let's Connect Over Coffee</h3>
              <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed" style={{ marginBottom: '2rem' }}>
                Got a question or need some help? Drop me a message, and I'll get back to you within 2 hours. I'm here to ensure you get the support you need!
              </p>

              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden" style={{ display: 'none' }}>
                  <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                </p>
                
                {/* Row 1: Name */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="First Name" 
                      required
                      className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                      style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Last Name" 
                      required
                      className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                      style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                {/* Row 2: Contact */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email Address" 
                      required
                      className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                      style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Phone Number" 
                      required
                      className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                      style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="relative">
                  <input 
                    type="text" 
                    name="message"
                    placeholder="Share Your Thoughts" 
                    required
                    className="w-full bg-transparent border-b border-[#444] outline-none text-white focus:border-blue-400 transition-colors placeholder-[#666]"
                    style={{ paddingBottom: '0.5rem', fontSize: '1rem' }}
                  />
                </div>

                <div style={{ paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Sending..." : "Get in touch"}
                  </button>
                  {submitStatus === "success" && <span className="text-green-400 text-sm font-medium">Message sent successfully!</span>}
                  {submitStatus === "error" && <span className="text-red-400 text-sm font-medium">Oops, something went wrong.</span>}
                </div>
              </form>
            </div>

            {/* Right Column: Contact Info */}
            <div className="w-full md:w-2/5 bg-[#0a0f1c] border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-center rounded-b-xl md:rounded-b-none md:rounded-br-xl" style={{ padding: '2.5rem 3rem' }}>
              <h3 className="text-2xl font-bold text-white text-center" style={{ marginBottom: '3.5rem' }}>Contact Details</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <a href="mailto:thegeekwhocode@gmail.com" className="flex items-center group" style={{ gap: '1.25rem' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                    <i className="fas fa-envelope text-lg text-blue-400 group-hover:text-white transition-colors" style={{ display: 'block' }}></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white font-medium text-sm">thegeekwhocode@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+917880000778" className="flex items-center group" style={{ gap: '1.25rem' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                    <i className="fas fa-phone-alt text-lg text-blue-400 group-hover:text-white transition-colors" style={{ display: 'block' }}></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-white font-medium text-sm">+91-7880000778</p>
                  </div>
                </a>
                
                <div className="flex items-center group cursor-default" style={{ gap: '1.25rem' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                    <i className="fas fa-map-marker-alt text-lg text-blue-400 group-hover:text-white transition-colors" style={{ display: 'block' }}></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white font-medium text-sm">Jalandhar, Punjab</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
