import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser, testCourse, testCapture } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCapture, updateCapture, deleteCapture } from './utils/operations'

beforeEach(seedDatabase)

test('Should create a new capture', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    courseId: testCourse.course.id,
    data: {
      title: 'My test capture',
      order: 1
    }
  }
  const response = await client.mutate({
    mutation: createCapture,
    variables
  })

  const exists = await prisma.exists.Capture({ id: response.data.createCapture.id })
  expect(exists).toBe(true)
})

test('Should update a capture', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    courseId : testCourse.course.id,
    id : testCapture.capture.id,
    data: {
      order: 7
    }
  }
  const response = await client.mutate({
    mutation: updateCapture,
    variables
  })

  expect(response.data.updateCapture.order).toBe(variables.data.order)
})

test('Should delete a capture', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    courseId : testCourse.course.id,
    id : testCapture.capture.id,
  }
  const response = await client.mutate({
    mutation: deleteCapture,
    variables
  })

  expect(response.data.deleteCapture.id).toBe(testCapture.capture.id)
})