import { useState } from 'react'
import { Button, SearchInput } from '../../ui'

const COMING_FEATURES = [
  { icon: '🎮', title: 'Mini-Games', desc: 'Coding puzzles wrapped in fun game mechanics.' },
  { icon: '⚡', title: 'Speed Challenges', desc: 'Race against the clock to solve problems faster.' },
  { icon: '🏅', title: 'Badges & Achievements', desc: 'Earn rewards for every milestone you hit.' },
  { icon: '📊', title: 'Gamified Leaderboards', desc: 'Climb the ranks and challenge your friends.' },
  { icon: '🤖', title: 'AI Opponents', desc: 'Battle AI bots tuned to your skill level.' },
  { icon: '🌍', title: 'Multiplayer Rooms', desc: 'Real-time coding battles with other players.' },
]

export function ComingSoon() {
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const handleNotify = () => {
    if (email.includes('@')) {
      setNotified(true)
    }
  }

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Animated background orbs. They are light sources — nothing for them to
          light on a white page — so light drops them and keeps the particles. */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse light:hidden" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse light:hidden" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl animate-pulse light:hidden" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        {/* Floating particles */}
        {['⭐', '💫', '🎯', '⚡', '🌟'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 animate-bounce"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 20}%`,
              animationDuration: `${2 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-xs font-bold text-accent uppercase tracking-wider">
          <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
          Coming Soon
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          {/* The cyan→purple ramp is built from 400-shades, which sit around
              1.8:1 on white — a headline you cannot read. Light gets it flat. */}
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 light:bg-none light:text-accent">
            Arcade
          </h1>
          <p className="text-xl text-subtle leading-relaxed">
            Where coding meets play. Level up your skills through games, battles, and challenges designed to make learning addictively fun.
          </p>
        </div>

        {/* Notify me form */}
        {!notified ? (
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <SearchInput
              className="flex-1"
              placeholder="Enter your email..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              onClear={() => setEmail('')}
              type="email"
            />
            <Button onClick={handleNotify} size="md">
              Notify Me
            </Button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-easy/10 border border-easy/30 rounded-xl text-easy text-sm font-semibold">
            ✓ You're on the list! We'll notify you when Arcade launches.
          </div>
        )}

        {/* What's coming */}
        <div className="pt-8">
          <p className="text-sm text-subtle uppercase tracking-wider font-semibold mb-6">What's Coming</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {COMING_FEATURES.map(feature => (
              <div
                key={feature.title}
                className="bg-raised/30 border border-line rounded-2xl p-4 text-left hover:border-accent/20 hover:bg-raised/50 transition-all duration-300 group"
              >
                <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{feature.icon}</span>
                <p className="text-sm font-semibold text-strong mb-1">{feature.title}</p>
                <p className="text-xs text-subtle leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
