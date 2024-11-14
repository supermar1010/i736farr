'use client'

import type { CommentDocType } from '../initializeDatabase'
import { useState } from 'react'
import { useRxCollection } from 'rxdb-hooks'

export default function AddCommentView({ parentId = null }: { parentId?: string | null }) {
  const [comment, setComment] = useState('')
  const collection = useRxCollection<CommentDocType>('comments')

  function handleCommentChange(event: React.FormEvent<HTMLInputElement>) {
    setComment(event.currentTarget.value)
  }

  async function handleKeyUp(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter') {
      await handleAddCommentClick()
    }
  };

  async function handleAddCommentClick() {
    await collection?.insert({
      id: crypto.randomUUID(),
      text: comment,
      parentId,
    })
    // TODO: Error message or deactivate form when collection is null
    setComment('')
  }

  return (
    <div className="flex flex-row gap-x-4">
      <label className="flex flex-col gap-y-1 grow">
        <input
          onKeyUp={handleKeyUp}
          value={comment}
          onChange={handleCommentChange}
          className="rounded p-1 border-2"
          type="text"
          placeholder="Your comment"
        />
      </label>
      <button type="button" onClick={handleAddCommentClick} className="self-end w-fit h-fit border-2 rounded px-2 py-1">
        Send
      </button>
    </div>
  )
}
