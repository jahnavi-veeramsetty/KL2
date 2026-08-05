import { useLocation } from 'react-router-dom'
import { PAGE_TITLES } from '../../lib/pageTitle'

/**
 * The page name, shown at the top of the content. The TopBar carries only the
 * wordmark and account controls, so the page identifies itself here.
 *
 * Only renders for top-level routes — an exact PAGE_TITLES hit. Detail pages
 * are excluded on purpose: they already show the same name in their
 * <Breadcrumbs> trail and again in their own hero.
 */
export default function PageHeading() {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname]

  if (!title) return null

  return (
    <h1 className="text-2xl font-bold text-strong tracking-tight mb-5">
      {title}
    </h1>
  )
}
