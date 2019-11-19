import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser, testCourse } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCourse, updateCourse } from './utils/operations'

beforeEach(seedDatabase)

test('Should create a new course', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    data: {
      name: 'My test course!'
    }
  }
  const response = await client.mutate({
    mutation: createCourse,
    variables
  })

  const exists = await prisma.exists.Course({ id: response.data.createCourse.id })
  expect(exists).toBe(true)
})

test('Should update a course', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    id : testCourse.course.id,
    data: {
      price: 9.99
    }
  }
  const response = await client.mutate({
    mutation: updateCourse,
    variables
  })

  expect(response.data.updateCourse.price).toBe(variables.data.price)
})