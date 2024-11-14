'use client'

import type { RxDocument } from 'rxdb'
import type { CommentDocType } from '../initializeDatabase'
import { isRxDocument } from 'rxdb'
import AddCommentView from './AddCommentView'

export default function CommentView({ comment, children }: { comment: CommentDocType | RxDocument<CommentDocType>, children?: React.ReactNode }) {
  const deletable = isRxDocument(comment)
  async function handleDeleteClick() {
    if (!isRxDocument(comment)) {
      console.error('Not an rxdocument, can\'t delete')
      return
    }
    await (comment as RxDocument<CommentDocType>).remove()
  }

  return (
    <div className="flex flex-col w-full h-fit border rounded pl-2 py-1 gap-y-4">
      <div className="flex flex-col px-2 py-1 gap-y-4">
        <div className="flex justify-between">
          <p>
            {comment.text}
          </p>
          {deletable && (
            <button type="button" onClick={handleDeleteClick}>
              X
            </button>
          )}
        </div>
        <AddCommentView parentId={comment.id} />
      </div>
      {children}
    </div>
  )
}
