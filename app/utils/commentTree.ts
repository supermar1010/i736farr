import type { RxDocument } from 'rxdb'
import type { CommentDocType } from '../initializeDatabase'
import type { CommentsTree } from '../types'

export function buildCommentsTree(comments: (CommentDocType | RxDocument<CommentDocType>)[], parentId: string | null | undefined): CommentsTree[] {
  return comments
    .filter(comment => comment.parentId === parentId)
    .map(comment => ({ comment, children: buildCommentsTree(comments, comment.id) }))
}

export function addMissingParentComments(comments: (CommentDocType | RxDocument<CommentDocType>)[]): (CommentDocType | RxDocument<CommentDocType>)[] {
  const commentIds = comments.map(comment => comment.id)
  const missingParentComments: CommentDocType[] = []

  for (const comment of comments) {
    if (!comment.parentId || commentIds.includes(comment.parentId)) {
      continue
    }
    missingParentComments.push({ id: comment.parentId, parentId: null, text: 'This comment was deleted' })
    commentIds.push(comment.parentId)
  }

  return [...comments, ...missingParentComments]
}
