'use client'

import type { CommentDocType } from '../initializeDatabase'
import type { CommentsTree } from '../types'
import { useRxData } from 'rxdb-hooks'
import { addMissingParentComments, buildCommentsTree } from '../utils/commentTree'
import AddCommentView from './AddCommentView'
import CommentView from './CommentView'

function generateCommentsComponents(commentsTree: CommentsTree) {
  return (
    <CommentView key={commentsTree.comment.id} comment={commentsTree.comment}>
      {commentsTree.children.map(c => generateCommentsComponents(c))}
    </CommentView>
  )
}

export default function DiscussionView() {
  const { result: comments } = useRxData<CommentDocType>(
    'comments',
    collection =>
      collection.find(),
  )
  const commentsUnorphaned = addMissingParentComments(comments)
  const commentsTree = buildCommentsTree(commentsUnorphaned, null)

  return (
    <div className="flex flex-col w-full h-fit border rounded px-8 py-4 gap-y-2">
      <h3>
        Comments
      </h3>
      <AddCommentView />
      <div>
        {commentsTree.map(generateCommentsComponents)}
      </div>
    </div>
  )
}
