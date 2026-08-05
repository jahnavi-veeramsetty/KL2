import { useEffect, useRef, useState } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { useOnline } from '../../hooks/useOnline'
import { cn } from '../../lib/cn'

/**
 * A bar, not a page.
 *
 * Losing connection should not throw away what someone is looking at — most of
 * this app is already-rendered content that stays perfectly readable offline.
 * The bar states the problem and gets out of the way once it is fixed.
 */
export function OfflineBanner() {
  const online = useOnline()
  const [showRestored, setShowRestored] = useState(false)
  const wasOffline = useRef(false)

  useEffect(() => {
    if (!online) {
      wasOffline.current = true
      setShowRestored(false)
      return
    }

    // Only announce a reconnection to someone who saw the disconnection.
    if (!wasOffline.current) return
    wasOffline.current = false
    setShowRestored(true)

    const timer = setTimeout(() => setShowRestored(false), 3000)
    return () => clearTimeout(timer)
  }, [online])

  if (online && !showRestored) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        // Clears the mobile tab bar; sits low and centred on desktop.
        'fixed left-1/2 -translate-x-1/2 z-[80] bottom-[88px] lg:bottom-6',
        'flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md',
        'text-xs font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.5)]',
        'transition-opacity duration-300',
        online
          ? 'bg-green-500/15 border-green-500/35 text-green-300'
          : 'bg-red-500/15 border-red-500/35 text-red-300'
      )}
    >
      {online ? (
        <>
          <Wifi className="w-4 h-4 shrink-0" />
          Back online
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>
            You&rsquo;re offline
            <span className="hidden sm:inline text-red-300/70 font-medium"> — pages already open still work</span>
          </span>
        </>
      )}
    </div>
  )
}
