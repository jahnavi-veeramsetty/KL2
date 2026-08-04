export type NotificationKind =
  | 'daily'
  | 'contest'
  | 'hackathon'
  | 'masterclass'
  | 'course'
  | 'streak'
  | 'achievement'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  /**
   * Minutes before "now", rather than a timestamp.
   *
   * A fixed date in seed data goes stale the moment you stop looking at it —
   * every notification would read "8 months ago" by the time anyone demos this.
   * Relative offsets stay believable forever.
   */
  minutesAgo: number
  /** Where the notification leads. Omitted when there is nowhere useful to go. */
  to?: string
}
