import { useEffect } from 'react'

export function useDocumentTitle(title: string, suffix: boolean = true) {
  useEffect(() => {
    document.title = suffix ? `${title} - Knowvation Learnings` : title
  }, [title, suffix])
}
