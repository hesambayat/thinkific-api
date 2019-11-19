import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser, testCourse } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCapture } from './utils/operations'

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
