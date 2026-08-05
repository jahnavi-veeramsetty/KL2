import logo from '../../assets/wlogohorizontal.webp'

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1121] border-t border-white/5 overflow-hidden pb-6 pt-12">
      {/* Giant faint background text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12vw] font-bold text-white/[0.03] tracking-tighter leading-none whitespace-nowrap">
          KNOWVATION
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-8">

          {/* Left section */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Knowvation Learnings Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-lg text-subtle max-w-md mb-2">
              Redefining learning for the global citizen.
            </p>
            <p className="text-lg text-subtle max-w-md mb-12">
              Knowledge is the ultimate asset.
            </p>

            <div className="w-full max-w-sm">
              <label className="block text-xs font-bold tracking-widest text-accent mb-4 uppercase">
                Join our inner circle
              </label>
              <div className="flex items-center border-b border-white/20 pb-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent border-none outline-none w-full text-strong placeholder:text-white/30 italic text-lg focus:ring-0 px-0"
                />
                <button className="flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0B1121] transition-colors ml-4">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </button>
              </div>
              
              <div className="flex items-center gap-3 mt-8">
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-4 lg:gap-8">
            {/* Company */}
            <div>
              <h3 className="text-xs font-bold tracking-widest text-accent mb-6 uppercase">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Our Vision</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">For Businesses</a></li>
              </ul>
            </div>

            {/* Locations / Subjects */}
            <div>
              <h3 className="text-xs font-bold tracking-widest text-accent mb-6 uppercase">Subjects</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Engineering</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">AI & ML</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Cloud</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Cybersecurity</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Design</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold tracking-widest text-accent mb-6 uppercase">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-subtle hover:text-white transition-colors">Imprint</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="sm:col-span-2">
              <h3 className="text-xs font-bold tracking-widest text-accent mb-6 uppercase">Reach Us</h3>
              <ul className="space-y-5 text-xs lg:text-[13px] text-subtle">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-0.5 text-accent flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </span>
                  <span>Surya Towers, 2nd floor, Kalasiguda, Secunderabad, Telangana 500003</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </span>
                  <a href="mailto:info@knowvationlearnings.in" className="hover:text-white transition-colors">
                    info@knowvationlearnings.in
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-accent flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <a href="tel:+918143217711" className="hover:text-white transition-colors whitespace-nowrap">
                      +91 8143217711
                    </a>
                    <a href="tel:+917995661959" className="hover:text-white transition-colors whitespace-nowrap">
                      +91 7995661959
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs font-medium text-white/50 tracking-wider">
            <span>© 2026 KNOWVATION LEARNINGS</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              HEADQUARTERS: Hyderabad, INDIA
            </span>
          </div>


        </div>
      </div>
    </footer>
  )
}
