/**
 * Groups a flat catalog into the horizontal shelves the mobile browse view
 * renders. A flat list is fine at a dozen courses and hostile at sixty —
 * shelves scale with the catalog instead of against it.
 *
 * Items deliberately appear in more than one shelf: a new AI course belongs in
 * both "New this month" and "AI/ML". That is how shelves are meant to work —
 * each is an answer to a different question, not a slice of a partition.
 */
export interface Shelf<T> {
  key: string
  title: string
  items: T[]
}

/** The minimum an item needs to be shelvable. */
export interface Shelvable {
  id: string
  category: string
  isNew?: boolean
  progress?: number
}

/**
 * Below this, shelves are worse than a list — three categories over four items
 * gives rows of a single tile, which read as broken carousels rather than
 * scrollable shelves. Returning [] lets the caller fall back to the flat list.
 */
const MIN_ITEMS_FOR_SHELVES = 6

/** A highlight shelf has to hold at least a pair to look like a row. */
const MIN_HIGHLIGHT_ITEMS = 2

export function buildShelves<T extends Shelvable>(items: T[]): Shelf<T>[] {
  if (items.length < MIN_ITEMS_FOR_SHELVES) return []

  const shelves: Shelf<T>[] = []

  // Anything already started comes first — it is why a returning student opened
  // the page at all. Exempt from the pair rule: one course you are halfway
  // through is the most useful row on the page even on its own.
  const started = items.filter(i => i.progress !== undefined)
  if (started.length > 0) {
    shelves.push({ key: 'continue', title: 'Continue learning', items: started })
  }

  // Dropping a thin "New" shelf loses nothing — every item is still reachable
  // through its category shelf below.
  const fresh = items.filter(i => i.isNew)
  if (fresh.length >= MIN_HIGHLIGHT_ITEMS) {
    shelves.push({ key: 'new', title: 'New this month', items: fresh })
  }

  // One shelf per category, in first-seen order — the data file controls the
  // running order rather than an alphabetical sort nobody asked for.
  const byCategory = new Map<string, T[]>()
  for (const item of items) {
    const existing = byCategory.get(item.category)
    if (existing) existing.push(item)
    else byCategory.set(item.category, [item])
  }

  for (const [category, list] of byCategory) {
    shelves.push({ key: `category:${category}`, title: category, items: list })
  }

  return shelves
}
