import type { ExtractDocumentTypeFromTypedRxJsonSchema, RxCollection, RxDatabase, RxJsonSchema } from 'rxdb'
import { createRxDatabase, toTypedRxJsonSchema } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

const commentSchemaLiteral = {
  title: 'comment schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', maxLength: 100 },
    text: { type: 'string' },
    parentId: { type: ['string', 'null'] },
  },
} as const

const commentSchemaTyped = toTypedRxJsonSchema(commentSchemaLiteral)
export type CommentDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof commentSchemaTyped>
export const commentsSchema: RxJsonSchema<CommentDocType> = commentSchemaLiteral

export type CommentsCollection = RxCollection<CommentDocType>

export interface CommentsDatabaseCollections {
  comments: CommentsCollection
}
export type CommentsDatabase = RxDatabase<CommentsDatabaseCollections>

export async function initialize() {
  // create RxDB
  const db = await createRxDatabase<CommentsDatabase>({
    name: 'comment_db',
    storage: getRxStorageDexie(),
  })

  // create a collection
  await db.addCollections({
    comments: { schema: commentSchemaTyped },
  })

  return db
};
