import { useEffect, useState } from 'react'

/**
 * Whether the browser thinks it has a network connection.
 *
 * navigator.onLine only reports whether there is *a* connection, not whether
 * anything is reachable through it — a captive portal or a dead uplink still
 * reads as online. Good enough to explain an obvious outage, not a substitute
 * for handling a failed request.
 */
export function useOnline(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine
  )

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return online
}
