import type { RxDocument } from 'rxdb'
import type { CommentDocType } from './initializeDatabase'

export interface CommentsTree { comment: CommentDocType | RxDocument<CommentDocType>, children: CommentsTree[] }
