import type { Hackathon } from '../types'

const inDays = (d: number) => new Date(Date.now() + d * 86400 * 1000).toISOString().split('T')[0]
const daysAgo = (d: number) => new Date(Date.now() - d * 86400 * 1000).toISOString().split('T')[0]

const realHackathons: Hackathon[] = [
  {
    id: 'buildwave-2025',
    slug: 'buildwave-2025',
    title: 'BuildWave 2025',
    tagline: 'Build the Future, One Wave at a Time',
    theme: ['AI/ML', 'Web3', 'HealthTech', 'Climate'],
    banner: '/event_webinar.webp',
    prizePool: '₹10,00,000',
    prizes: [
      { place: '1st Place', amount: '₹5,00,000', perks: ['AWS credits', 'Mentorship from VCs', 'Incubation opportunity'] },
      { place: '2nd Place', amount: '₹2,50,000', perks: ['Google Cloud credits', 'Swag kit'] },
      { place: '3rd Place', amount: '₹1,00,000', perks: ['Subscription bundles', 'Swag kit'] },
      { place: 'Best AI Project', amount: '₹50,000', perks: ['NVIDIA GPU access for 3 months'] },
      { place: 'Best First-Time Team', amount: '₹25,000', perks: ['Mentorship sessions'] }
    ],
    mode: 'hybrid',
    startDate: inDays(15),
    endDate: inDays(17),
    registrationDeadline: inDays(10),
    teamSize: { min: 2, max: 4 },
    participantsCount: 2840,
    status: 'upcoming',
    about: 'BuildWave is India\'s premier student hackathon, bringing together 2000+ developers, designers, and innovators for 48 hours of intense building. Backed by top VCs and tech giants, this is where startups are born.',
    requirements: [
      'Team of 2-4 members',
      'At least one developer per team',
      'Project must be built during the hackathon (no pre-built products)',
      'Open source preferred but not required',
      'Submitted via GitHub with a working demo'
    ],
    sponsors: [
      { name: 'Google', logo: '/react_course.webp', tier: 'platinum' },
      { name: 'Microsoft', logo: '/react_course.webp', tier: 'platinum' },
      { name: 'AWS', logo: '/react_course.webp', tier: 'gold' },
      { name: 'Razorpay', logo: '/react_course.webp', tier: 'gold' },
      { name: 'Postman', logo: '/react_course.webp', tier: 'silver' }
    ],
    tracks: [
      { title: 'AI for Good', description: 'Use AI/ML to solve real-world social problems.', icon: 'Bot' },
      { title: 'Web3 & DeFi', description: 'Build decentralized applications on blockchain.', icon: 'Link2' },
      { title: 'HealthTech', description: 'Improve healthcare access and patient outcomes.', icon: 'HeartPulse' },
      { title: 'Climate Tech', description: 'Technology solutions for climate change.', icon: 'Globe' },
      { title: 'Open Innovation', description: 'Build anything amazing — no theme constraint.', icon: 'Lightbulb' }
    ],
    judges: [
      { name: 'Ananya Krishnan', title: 'CTO', company: 'Razorpay', avatar: '/react_course.webp' },
      { name: 'Raj Sharma', title: 'Director of Engineering', company: 'Google India', avatar: '/react_course.webp' },
      { name: 'Dr. Priya Iyer', title: 'AI Research Lead', company: 'Microsoft', avatar: '/react_course.webp' },
      { name: 'Vikram Chandra', title: 'Partner', company: 'Sequoia Capital', avatar: '/react_course.webp' }
    ],
    timeline: [
      { phase: 'Registrations Open', date: daysAgo(30), description: 'Team registration begins.' },
      { phase: 'Registration Deadline', date: inDays(10), description: 'Last day to register your team.' },
      { phase: 'Opening Ceremony', date: inDays(15), description: 'Kick-off event with speakers and problem statements.' },
      { phase: 'Hacking Begins', date: inDays(15), description: '48 hours of building starts.' },
      { phase: 'Submissions Due', date: inDays(17), description: 'All projects must be submitted.' },
      { phase: 'Judging', date: inDays(17), description: 'Expert panel evaluates submissions.' },
      { phase: 'Winners Announced', date: inDays(18), description: 'Prize ceremony and closing.' }
    ],
    faq: [
      { question: 'Can I participate solo?', answer: 'No, teams must have 2-4 members.' },
      { question: 'Is there a participation fee?', answer: 'No, BuildWave is completely free to participate in.' },
      { question: 'Can we use AI tools like ChatGPT?', answer: 'Yes, AI tools are permitted as long as the core logic is your own work.' },
      { question: 'What tech stack is allowed?', answer: 'Any tech stack! Use whatever you\'re comfortable with.' },
      { question: 'Is accommodation provided?', answer: 'For in-person participants at the Bangalore venue, accommodation is provided for the hackathon duration.' }
    ]
  },
  {
    id: 'hackgenx-3',
    slug: 'hackgenx-3',
    title: 'HackGenX 3.0',
    tagline: 'Next-Gen Solutions for Real-World Chaos',
    theme: ['EdTech', 'FinTech', 'SaaS', 'Developer Tools'],
    banner: '/event_workshop.webp',
    prizePool: '₹5,00,000',
    prizes: [
      { place: '1st Place', amount: '₹2,00,000', perks: ['YC application support', 'AWS credits'] },
      { place: '2nd Place', amount: '₹1,00,000', perks: ['Azure credits'] },
      { place: '3rd Place', amount: '₹50,000', perks: ['Swag kit'] }
    ],
    mode: 'online',
    startDate: inDays(30),
    endDate: inDays(32),
    registrationDeadline: inDays(25),
    teamSize: { min: 1, max: 3 },
    participantsCount: 1240,
    status: 'upcoming',
    about: 'HackGenX is an online-only hackathon designed for builders who want to create the next generation of developer tools and SaaS products.',
    requirements: [
      'Solo or team of up to 3',
      'Project must be live and demo-able',
      'Open source preferred'
    ],
    sponsors: [
      { name: 'Vercel', logo: '/react_course.webp', tier: 'gold' },
      { name: 'PlanetScale', logo: '/react_course.webp', tier: 'silver' }
    ],
    tracks: [
      { title: 'EdTech', description: 'Tools and platforms that improve learning outcomes.', icon: 'BookOpen' },
      { title: 'Developer Tools', description: 'Build tools that make devs more productive.', icon: 'Wrench' },
      { title: 'FinTech', description: 'Modernize financial products and services.', icon: 'IndianRupee' }
    ],
    judges: [
      { name: 'Sneha Patil', title: 'Founder', company: 'Teachmint', avatar: '/ui_ux_course.webp' },
      { name: 'Akash Shah', title: 'VP Engineering', company: 'CRED', avatar: '/ui_ux_course.webp' }
    ],
    timeline: [
      { phase: 'Registration Opens', date: daysAgo(5), description: 'Team formation begins.' },
      { phase: 'Hacking Weekend', date: inDays(30), description: '48h of building.' },
      { phase: 'Demo Day', date: inDays(33), description: 'Live demos to judges.' }
    ],
    faq: [
      { question: 'Can I work solo?', answer: 'Yes! Solo participants are welcome.' },
      { question: 'Is this fully online?', answer: 'Yes, 100% virtual with video demos.' }
    ]
  },
  {
    id: 'designathon-2025',
    slug: 'designathon-2025',
    title: 'Designathon 2025',
    tagline: 'Design That Moves People',
    theme: ['UI/UX', 'Product Design', 'Motion', 'Accessibility'],
    banner: '/ui_ux_course.webp',
    prizePool: '₹3,00,000',
    prizes: [
      { place: '1st Place', amount: '₹1,50,000', perks: ['Figma Pro annual', 'Portfolio feature'] },
      { place: '2nd Place', amount: '₹75,000', perks: ['Design tools bundle'] }
    ],
    mode: 'offline',
    startDate: daysAgo(5),
    endDate: daysAgo(3),
    registrationDeadline: daysAgo(10),
    teamSize: { min: 2, max: 3 },
    participantsCount: 680,
    status: 'past',
    about: 'A design-focused hackathon for UX designers, product designers, and motion artists. No coding required — pure design excellence.',
    requirements: ['Figma account required', 'Team of 2-3', 'Design files submitted in Figma'],
    sponsors: [
      { name: 'Figma', logo: '/ui_ux_course.webp', tier: 'platinum' },
      { name: 'Adobe', logo: '/ui_ux_course.webp', tier: 'gold' }
    ],
    tracks: [
      { title: 'App Redesign', description: 'Redesign an existing popular app with better UX.', icon: 'Smartphone' },
      { title: 'Accessibility First', description: 'Design for users with disabilities.', icon: 'Accessibility' }
    ],
    judges: [
      { name: 'Kavya Nair', title: 'Design Lead', company: 'Zomato', avatar: '/ui_ux_course.webp' }
    ],
    timeline: [
      { phase: 'Opening', date: daysAgo(5), description: 'Brief and design sprint begins.' },
      { phase: 'Submissions', date: daysAgo(3), description: 'All Figma files submitted.' }
    ],
    faq: [
      { question: 'Do I need to code?', answer: 'No! This is a design-only hackathon.' }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// DEMO PADDING — placeholder events so the grid shows full rows while the real
// calendar is still short. Delete this block (and the spread below) once there
// are enough real hackathons.
// ─────────────────────────────────────────────────────────────────────────────
type HackathonDemo = Pick<
  Hackathon,
  'id' | 'title' | 'tagline' | 'theme' | 'banner' | 'prizePool' | 'mode' | 'participantsCount' | 'status'
> & { startsIn: number; team: [number, number] }

const demoVariants: HackathonDemo[] = [
  { id: 'codestorm-24', title: 'CodeStorm 24', tagline: 'Forty-eight hours. One idea. Ship it.', theme: ['DevTools', 'Open Source'], banner: '/event_workshop.webp', prizePool: '₹4,00,000', mode: 'online', participantsCount: 1620, status: 'ongoing', startsIn: 0, team: [1, 4] },
  { id: 'finhack-summit', title: 'FinHack Summit', tagline: 'Rebuild banking for the next billion users.', theme: ['FinTech', 'Security'], banner: '/react_course.webp', prizePool: '₹6,50,000', mode: 'offline', participantsCount: 940, status: 'upcoming', startsIn: 21, team: [2, 4] },
  { id: 'devsprint-global', title: 'DevSprint Global', tagline: 'A worldwide sprint for developer tooling.', theme: ['DevTools', 'Cloud'], banner: '/ui_ux_course.webp', prizePool: '₹3,20,000', mode: 'online', participantsCount: 3110, status: 'upcoming', startsIn: 28, team: [1, 3] },
  { id: 'greentech-challenge', title: 'GreenTech Challenge', tagline: 'Engineering answers to the climate crisis.', theme: ['Climate', 'IoT'], banner: '/event_webinar.webp', prizePool: '₹8,00,000', mode: 'hybrid', participantsCount: 1275, status: 'upcoming', startsIn: 35, team: [2, 5] },
  { id: 'ai-frontier-jam', title: 'AI Frontier Jam', tagline: 'Push the limits of applied machine learning.', theme: ['AI/ML', 'Research'], banner: '/event_workshop.webp', prizePool: '₹12,00,000', mode: 'online', participantsCount: 4480, status: 'upcoming', startsIn: 42, team: [2, 4] },
  { id: 'cybershield-ctf', title: 'CyberShield CTF', tagline: 'Capture the flag, defend the stack.', theme: ['Security', 'Systems'], banner: '/react_course.webp', prizePool: '₹2,75,000', mode: 'offline', participantsCount: 680, status: 'upcoming', startsIn: 49, team: [1, 3] },
  { id: 'opensource-fest', title: 'OpenSource Fest', tagline: 'Ship your first meaningful contribution.', theme: ['Open Source', 'Community'], banner: '/ui_ux_course.webp', prizePool: '₹1,50,000', mode: 'hybrid', participantsCount: 2260, status: 'upcoming', startsIn: 56, team: [1, 2] },
]

const demoHackathons: Hackathon[] = demoVariants.map(({ startsIn, team, ...variant }, i) => ({
  ...realHackathons[i % realHackathons.length],
  ...variant,
  slug: variant.id,
  startDate: inDays(startsIn),
  endDate: inDays(startsIn + 2),
  registrationDeadline: inDays(Math.max(startsIn - 5, 0)),
  teamSize: { min: team[0], max: team[1] },
}))

export const hackathons: Hackathon[] = [...realHackathons, ...demoHackathons]
