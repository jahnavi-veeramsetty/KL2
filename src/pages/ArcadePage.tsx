import { ComingSoon } from '../components/arcade/ComingSoon'

import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ArcadePage() {
  useDocumentTitle('Arcade')
  return (
    <>
      <ComingSoon />
    </>
  )
}
