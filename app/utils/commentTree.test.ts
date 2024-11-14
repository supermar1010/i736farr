import type { CommentDocType } from '../initializeDatabase'
import type { CommentsTree } from '../types'
import { addMissingParentComments, buildCommentsTree } from './commentTree'

it('empty comments returns empty tree', () => {
  const comments: CommentDocType[] = []
  const result: CommentsTree[] = []
  expect(buildCommentsTree(comments, null)).toStrictEqual(result)
})

it('comments without parent return as toplevel', () => {
  const comments: CommentDocType[] = [{ id: '1', text: 'a', parentId: null }, { id: '2', text: 'b', parentId: null }]
  const result: CommentsTree[] = [
    {
      children: [],
      comment: {
        id: '1',
        parentId: null,
        text: 'a',
      },
    },
    {
      children: [],
      comment: {
        id: '2',
        parentId: null,
        text: 'b',
      },
    },
  ]

  expect(buildCommentsTree(comments, null)).toStrictEqual(result)
})

it('subcomments return as children', () => {
  const comments: CommentDocType[] = [{ id: '1', text: 'a', parentId: null }, { id: '2', text: 'b', parentId: '1' }, { id: '3', text: 'c', parentId: '2' }, { id: '4', text: 'd', parentId: '2' }]
  const result: CommentsTree[] = [
    {
      children: [
        {
          children: [
            {
              children: [],
              comment: {
                id: '3',
                parentId: '2',
                text: 'c',
              },
            },
            {
              children: [],
              comment: {
                id: '4',
                parentId: '2',
                text: 'd',
              },
            },
          ],
          comment: {
            id: '2',
            parentId: '1',
            text: 'b',
          },
        },
      ],
      comment: {
        id: '1',
        parentId: null,
        text: 'a',
      },
    },
  ]

  expect(buildCommentsTree(comments, null)).toStrictEqual(result)
})

it('orphaned comments get deorphaned', () => {
  const comments: CommentDocType[] = [{ id: '1', text: 'a', parentId: null }, { id: '4', text: 'b', parentId: '2' }]
  const result: CommentDocType[] = [
    {
      id: '1',
      parentId: null,
      text: 'a',
    },
    {
      id: '4',
      parentId: '2',
      text: 'b',
    },
    {
      id: '2',
      parentId: null,
      text: 'This comment was deleted',
    },
  ]

  expect(addMissingParentComments(comments)).toStrictEqual(result)
})

it('multiple orphaned comments from the same parent only get one new parent', () => {
  const comments: CommentDocType[] = [{ id: '1', text: 'a', parentId: null }, { id: '4', text: 'b', parentId: '2' }, { id: '5', text: 'c', parentId: '2' }]
  const result: CommentDocType[] = [
    {
      id: '1',
      parentId: null,
      text: 'a',
    },
    {
      id: '4',
      parentId: '2',
      text: 'b',
    },
    {
      id: '5',
      parentId: '2',
      text: 'c',
    },
    {
      id: '2',
      parentId: null,
      text: 'This comment was deleted',
    },
  ]

  expect(addMissingParentComments(comments)).toStrictEqual(result)
})
