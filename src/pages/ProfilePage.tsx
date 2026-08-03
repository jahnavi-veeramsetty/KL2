import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useProfile } from '../hooks/useProfile'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function heatColor(count: number) {
  if (count === 0) return '#0f172a'
  if (count <= 2) return '#164e63'
  if (count <= 5) return '#0e7490'
  if (count <= 9) return '#06b6d4'
  return '#22d3ee'
}

const rarityMeta: Record<string, { color: string; bg: string; label: string }> = {
  common:    { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', label: 'Common'    },
  rare:      { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  label: 'Rare'      },
  epic:      { color: '#22d3ee', bg: 'rgba(34,211,238,0.1)',  label: 'Epic'      },
  legendary: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  label: 'Legendary' },
}

const diffColors = { easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' }

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const Icons = {
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Github: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Trophy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
    </svg>
  ),
  Zap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Flame: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Lock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Award: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Code: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Network: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="10.5" y1="12.5" x2="6.5" y2="17.5"/><line x1="13.5" y1="12.5" x2="17.5" y2="17.5"/>
    </svg>
  ),
  Bug: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="8" height="14" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="m10 4 1 2"/><path d="m14 4-1 2"/>
    </svg>
  ),
  Sword: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Target: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Activity: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Medal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>
    </svg>
  ),
}

const badgeIconMap: Record<string, React.ReactNode> = {
  zap:     <Icons.Zap />,
  sword:   <Icons.Sword />,
  network: <Icons.Network />,
  crown:   <Icons.Trophy />,
  bug:     <Icons.Bug />,
  flame:   <Icons.Flame />,
  code:    <Icons.Code />,
  sun:     <Icons.Sun />,
}

// ─── Activity Heatmap ────────────────────────────────────────────────────────
function Heatmap() {
  const { profile: p } = useProfile()
  const [tip, setTip] = useState<{ date: string; count: number } | null>(null)
  const weeks = useMemo(() => {
    const raw = [...p.contributions].slice(-364)
    const result: typeof raw[] = []
    for (let i = 0; i < raw.length; i += 7) result.push(raw.slice(i, i + 7))
    return result
  }, [p.contributions])

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 2, minWidth: 'max-content' }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {week.map((cell, di) => (
                <div
                  key={di}
                  onMouseEnter={() => setTip(cell)}
                  onMouseLeave={() => setTip(null)}
                  style={{
                    width: 11, height: 11, borderRadius: 2,
                    background: heatColor(cell.count),
                    cursor: 'default',
                    border: `1px solid ${cell.count > 0 ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
                    transition: 'transform 0.1s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.3)')}
                  onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; setTip(null) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <span style={{ fontSize: 12, color: '#475569', height: 18 }}>
          {tip && <span><span style={{ color: '#22d3ee', fontWeight: 600 }}>{tip.count}</span> {tip.count === 1 ? 'solve' : 'solves'} · {tip.date}</span>}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#334155', marginRight: 2 }}>Less</span>
          {[0, 2, 5, 9, 12].map(v => (
            <div key={v} style={{ width: 11, height: 11, borderRadius: 2, background: heatColor(v) }} />
          ))}
          <span style={{ fontSize: 10, color: '#334155', marginLeft: 2 }}>More</span>
        </div>
      </div>
    </div>
  )
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────
function DonutChart({ segments, total }: { segments: { value: number; color: string }[]; total: number }) {
  const r = 40, cx = 50, cy = 50, circ = 2 * Math.PI * r
  let offset = 0
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth="11"/>
      {segments.map((s, i) => {
        const frac = s.value / total
        const dash = Math.max(0, frac * circ - 2)
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={s.color} strokeWidth="11"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )
        offset += frac * circ
        return el
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#f1f5f9" fontSize="17" fontWeight="700" fontFamily="Inter,sans-serif">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter,sans-serif">solved</text>
    </svg>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { profile: p } = useProfile()
  const totalSolved = p.solveStats.easy.solved + p.solveStats.medium.solved + p.solveStats.hard.solved
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [showBannerMenu, setShowBannerMenu] = useState(false)

  function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setBannerUrl(url)
    setShowBannerMenu(false)
  }

  return (
    <div>

      {/* ── COVER BANNER ── */}
      <div style={{
        height: 220,
        position: 'relative',
        overflow: 'hidden',
        background: bannerUrl
          ? 'none'
          : 'linear-gradient(135deg, #0a1628 0%, #0c1e35 50%, #071318 100%)',
      }}>
        {/* Uploaded image */}
        {bannerUrl && (
          <img src={bannerUrl} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        )}

        {/* Default grid pattern shown when no image */}
        {!bannerUrl && (
          <>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} preserveAspectRatio="none">
              <defs>
                <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="#22d3ee" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(34,211,238,0.07) 0%, transparent 70%)' }}/>
          </>
        )}

        {/* Dark overlay on image for readability */}
        {bannerUrl && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />}

        {/* Upload controls — top-right corner */}
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, zIndex: 10 }}>
          
          {bannerUrl ? (
            // Edit button (when photo is present)
            <>
              <button
                onClick={() => setShowBannerMenu(!showBannerMenu)}
                title="Edit cover photo"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 34, height: 34, borderRadius: '50%', cursor: 'pointer',
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#cbd5e1',
                  transition: 'background 0.15s',
                  outline: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.55)')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showBannerMenu && (
                <div style={{
                  background: 'rgba(15,23,42,0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: 4,
                  display: 'flex', flexDirection: 'column',
                  minWidth: 140,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}>
                  <label
                    htmlFor="banner-upload"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 12px', borderRadius: 5, cursor: 'pointer',
                      color: '#cbd5e1', fontSize: 12, fontWeight: 500,
                      userSelect: 'none',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
                    </svg>
                    Change photo
                  </label>
                  <button
                    onClick={() => {
                      setBannerUrl(null)
                      setShowBannerMenu(false)
                      const input = document.getElementById('banner-upload') as HTMLInputElement
                      if (input) input.value = ''
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 12px', borderRadius: 5, cursor: 'pointer',
                      background: 'transparent', border: 'none',
                      color: '#ef4444', fontSize: 12, fontWeight: 500,
                      textAlign: 'left',
                      transition: 'background 0.15s', outline: 'none'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Remove
                  </button>
                </div>
              )}
            </>
          ) : (
            // Add button (when no photo is present)
            <label
              htmlFor="banner-upload"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 12px', borderRadius: 7, cursor: 'pointer',
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#cbd5e1', fontSize: 12, fontWeight: 500,
                transition: 'background 0.15s',
                userSelect: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.55)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
              Add cover photo
            </label>
          )}
        </div>
        <input
          id="banner-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleBannerUpload}
        />
      </div>

      {/* ── PROFILE HEADER ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        
        {/* Avatar (Overlaps Banner) */}
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0f2744, #0c1e35)',
          border: '4px solid #060b19',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
          marginTop: -60,
          position: 'relative',
        }}>
          {p.avatarUrl ? (
            <img src={p.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          )}
        </div>

        {/* Name & Quick Stats Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginTop: 16, marginBottom: 32 }}>
          
          {/* Name block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
              <h1 style={{ fontSize: 'clamp(24px,4vw,28px)', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>{p.fullName}</h1>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#22d3ee', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 5, padding: '2px 9px' }}>
                {p.title.split('·')[0].trim()}
              </span>
              <Link 
                to={ROUTES.SETTINGS}
                title="Edit Profile"
                style={{ 
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.05)',
                  marginLeft: 4, transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#f1f5f9'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </Link>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>@{p.username}</p>
          </div>

          {/* Quick stat chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Rank',    value: `#${p.stats.globalRank.toLocaleString()}` },
              { label: 'XP',      value: p.stats.totalXP.toLocaleString()          },
              { label: 'Streak',  value: `${p.stats.currentStreak}d`               },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>{s.value}</div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TWO COLUMN LAYOUT ─────────────────────────────────────────────── */}
        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '220px minmax(0,1fr)', gap: 32, alignItems: 'start' }}>

          {/* ════ LEFT COLUMN ════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>

            {/* Bio + Meta */}
            <div>
              {p.bio && (
                <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65, margin: '0 0 16px' }}>
                  {p.bio.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('Hi') && !l.startsWith('-') && !l.startsWith('🔭') && !l.startsWith('🌱') && !l.startsWith('⚡'))[0] || 'Software engineer passionate about algorithms and scalable systems.'}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {p.location && (
                  <MetaRow icon={<Icons.MapPin />} text={p.location} />
                )}
                <MetaRow icon={<Icons.Calendar />} text={`Joined ${new Date(p.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`} />
              </div>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.links.github   && <SocialLink icon={<Icons.Github />}   label={p.links.github.replace('https://', '')}   href={p.links.github} />}
              {p.links.linkedin && <SocialLink icon={<Icons.Linkedin />} label="LinkedIn"                                  href={p.links.linkedin} />}
              {p.links.website  && <SocialLink icon={<Icons.Globe />}    label={p.links.website.replace('https://', '')}  href={p.links.website} />}
            </div>

            <HR />

            {/* Stats table */}
            <div>
              <SectionLabel>Stats</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <StatRow label="Global Rank"     value={`#${p.stats.globalRank.toLocaleString()}`} />
                <StatRow label="Percentile"      value={`Top ${(100 - p.stats.percentile).toFixed(1)}%`} accent />
                <StatRow label="Total XP"        value={p.stats.totalXP.toLocaleString()} />
                <StatRow label="Active Days"     value={p.stats.totalActiveDays.toString()} />
                <StatRow label="Longest Streak"  value={`${p.stats.longestStreak} days`} />
              </div>
            </div>

            <HR />

            {/* Skills */}
            <div>
              <SectionLabel>Skills</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  'Data Structures', 'Algorithms', 'Dynamic Programming',
                  'Graph Theory', 'System Design', 'TypeScript', 'Python',
                  'C++', 'Go', 'React', 'REST APIs', 'SQL',
                ].map(skill => (
                  <span
                    key={skill}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#94a3b8',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      lineHeight: 1,
                      cursor: 'default',
                      transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#22d3ee'
                      el.style.borderColor = 'rgba(34,211,238,0.3)'
                      el.style.background = 'rgba(34,211,238,0.06)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#94a3b8'
                      el.style.borderColor = 'rgba(255,255,255,0.08)'
                      el.style.background = 'rgba(255,255,255,0.05)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>


            <HR />

            {/* Certificates */}
            {p.certificates.length > 0 && (
              <div>
                <SectionLabel>Certificates</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.certificates.map(cert => (
                    <div key={cert.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <span style={{ color: '#f59e0b', marginTop: 1, flexShrink: 0 }}><Icons.GraduationCap /></span>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1', margin: '0 0 2px', lineHeight: 1.3 }}>{cert.courseName}</p>
                        <p style={{ fontSize: 10, color: '#475569', margin: 0 }}>{new Date(cert.dateCompleted).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ════ RIGHT COLUMN ═══════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0 }}>

            {/* ── Problems + XP side-by-side top row ──────────────── */}
            <div className="top-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>

              {/* Problems Solved */}
              <Panel>
                <PanelHeader icon={<Icons.Target />} title="Problems Solved" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <DonutChart
                    segments={[
                      { value: p.solveStats.easy.solved,   color: diffColors.easy   },
                      { value: p.solveStats.medium.solved, color: diffColors.medium },
                      { value: p.solveStats.hard.solved,   color: diffColors.hard   },
                    ]}
                    total={totalSolved}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(['easy', 'medium', 'hard'] as const).map(d => {
                      const s = p.solveStats[d]
                      return (
                        <div key={d}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: diffColors[d], textTransform: 'capitalize' }}>{d}</span>
                            <span style={{ fontSize: 11, color: '#475569' }}>{s.solved}<span style={{ color: '#334155' }}>/{s.total}</span></span>
                          </div>
                          <div style={{ height: 5, borderRadius: 2, background: '#1e293b' }}>
                            <div style={{ height: '100%', borderRadius: 2, width: `${(s.solved / s.total) * 100}%`, background: diffColors[d] }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom stat chips */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 0 14px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {[
                    { label: 'Total',       value: `${totalSolved}`, sub: `/ ${p.solveStats.easy.total + p.solveStats.medium.total + p.solveStats.hard.total}` },
                    { label: 'Completion',  value: `${((totalSolved / (p.solveStats.easy.total + p.solveStats.medium.total + p.solveStats.hard.total)) * 100).toFixed(0)}%`, sub: '' },
                    { label: 'Acceptance',  value: `${(p.stats as any).acceptanceRate ?? 72}%`, sub: '' },
                  ].map(chip => (
                    <div key={chip.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>
                        {chip.value}<span style={{ fontSize: 11, color: '#334155', fontWeight: 400 }}>{chip.sub}</span>
                      </div>
                      <div style={{ fontSize: 10, color: '#475569', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{chip.label}</div>
                    </div>
                  ))}
                </div>
              </Panel>


              {/* XP card */}
              <Panel>
                <PanelHeader icon={<Icons.Zap />} title="Experience" />
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#e2e8f0', lineHeight: 1, marginBottom: 2 }}>
                    {p.stats.totalXP.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: '#475569' }}>total XP earned</div>
                </div>

                {/* XP bar (progress to next level) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569', marginBottom: 6 }}>
                    <span>{p.title}</span>
                    <span style={{ color: '#94a3b8' }}>92%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: '#1e293b' }}>
                    <div style={{ height: '100%', borderRadius: 3, width: '92%', background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)' }} />
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 0 14px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {[
                    { label: 'Percentile', value: `Top ${(100 - p.stats.percentile).toFixed(0)}%` },
                    { label: 'Rank',       value: `#${p.stats.globalRank.toLocaleString()}`       },
                    { label: 'Streak',     value: `${p.stats.currentStreak}d`                     },
                  ].map(x => (
                    <div key={x.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{x.value}</div>
                      <div style={{ fontSize: 10, color: '#475569', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{x.label}</div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>


            {/* ── Activity Heatmap ────────────────────────────────────────── */}
            <Panel>
              <PanelHeader icon={<Icons.Activity />} title={`${p.stats.totalActiveDays} contributions in the last year`} />
              <Heatmap />
            </Panel>

            {/* ── Badges ──────────────────────────────────────────────────── */}
            <Panel>
              <PanelHeader icon={<Icons.Medal />} title="Badges" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
                {p.badges.map(badge => {
                  const rm = rarityMeta[badge.rarity]
                  return <BadgeCard key={badge.id} badge={badge} rm={rm} />
                })}
              </div>
            </Panel>

          </div>
        </div>

        {/* bottom spacing */}
        <div style={{ height: 64 }} />
      </div>

      <style>{`
        /* minmax(0,1fr), not 1fr: grid tracks default to min-width:auto, which
           lets wide children (the 689px contribution heatmap) stretch the track
           past the viewport instead of scrolling inside their own container. */
        @media (max-width: 760px) {
          .profile-grid { grid-template-columns: minmax(0,1fr) !important; }
          .top-row { grid-template-columns: minmax(0,1fr) !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Helper Components ────────────────────────────────────────────────────────

function HR() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#334155', margin: '0 0 12px' }}>{children}</p>
}

function MetaRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 13 }}>
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: hov ? '#94a3b8' : '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
    >
      <span>{icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </a>
  )
}

function StatRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 12, color: '#475569' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: accent ? '#22d3ee' : '#94a3b8' }}>{value}</span>
    </div>
  )
}

function Panel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      padding: 20, borderRadius: 12,
      background: 'rgba(255,255,255,0.03)',
      ...style,
    }}>
      {children}
    </div>
  )
}

function PanelHeader({ icon, title, iconColor }: { icon: React.ReactNode; title: string; iconColor?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <span style={{ color: iconColor || '#64748b' }}>{icon}</span>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', margin: 0 }}>{title}</h3>
    </div>
  )
}

function BadgeCard({ badge, rm }: { badge: any; rm: { color: string; bg: string; label: string } }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      title={badge.description}
      style={{
        padding: '14px 10px', borderRadius: 10, textAlign: 'center',
        border: `1px solid ${hov && !badge.isLocked ? `${rm.color}50` : 'rgba(255,255,255,0.07)'}`,
        background: hov && !badge.isLocked ? rm.bg : 'rgba(255,255,255,0.03)',
        opacity: badge.isLocked ? 0.4 : 1,
        cursor: 'default',
        transition: 'all 0.2s',
        transform: hov && !badge.isLocked ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: '50%', margin: '0 auto 10px',
        background: badge.isLocked ? 'rgba(255,255,255,0.05)' : `${rm.color}18`,
        border: `1px solid ${badge.isLocked ? 'rgba(255,255,255,0.08)' : `${rm.color}35`}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: badge.isLocked ? '#334155' : rm.color,
      }}>
        {badge.isLocked ? <Icons.Lock /> : (badgeIconMap[badge.icon] || <Icons.Award />)}
      </div>
      <p style={{ fontSize: 11, fontWeight: 600, color: badge.isLocked ? '#334155' : '#cbd5e1', margin: '0 0 3px', lineHeight: 1.3 }}>{badge.name}</p>
      <p style={{ fontSize: 10, color: rm.color, margin: 0, opacity: badge.isLocked ? 0.5 : 1 }}>{rm.label}</p>
    </div>
  )
}
