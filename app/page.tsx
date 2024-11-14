'use client'

import type { CommentsDatabase } from './initializeDatabase'
import { useEffect, useState } from 'react'
import { Provider } from 'rxdb-hooks'
import DiscussionView from './components/DiscussionView'
import { initialize } from './initializeDatabase'

export default function Home() {
  const [db, setDb] = useState<CommentsDatabase | undefined>()

  useEffect(() => {
    initialize().then(setDb)
  }, [])

  return (
    <Provider db={db}>
      <main className="flex flex-col w-full h-full items-center px-8 lg:px-16">
        <DiscussionView />
      </main>
    </Provider>
  )
}
