import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser, testCourse, testCapture, testContent } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createContent, updateContent, deleteContent } from './utils/operations'

beforeEach(seedDatabase)

test('Should create a new content', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    courseId: testCourse.course.id,
    captureId: testCapture.capture.id,
    data: {
      title: 'My test content',
      order: 1
    }
  }
  const response = await client.mutate({
    mutation: createContent,
    variables
  })

  const exists = await prisma.exists.Content({ id: response.data.createContent.id })
  expect(exists).toBe(true)
})

test('Should update a content', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    courseId : testCourse.course.id,
    captureId: testCapture.capture.id,
    id : testContent.content.id,
    data: {
      order: 7
    }
  }
  const response = await client.mutate({
    mutation: updateContent,
    variables
  })

  expect(response.data.updateContent.order).toBe(variables.data.order)
})

test('Should delete a content', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    courseId : testCourse.course.id,
    captureId: testCapture.capture.id,
    id : testContent.content.id
  }
  const response = await client.mutate({
    mutation: deleteContent,
    variables
  })

  expect(response.data.deleteContent.id).toBe(testContent.content.id)
})