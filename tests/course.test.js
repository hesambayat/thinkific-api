import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser, testGuestUser, testCourse } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCourse, updateCourse, deleteCourse } from './utils/operations'

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

test('Should not update other users\' course', async () => {
  const client = await getClient(testGuestUser.jwt)
  const variables = {
    id : testCourse.course.id,
    data: {
      price: 0.99
    }
  }

  await expect(
    client.mutate({ mutation: updateCourse, variables })
  ).rejects.toThrow()
})

test('Should delete a course', async () => {
  const client = await getClient(testUser.jwt)
  const variables = {
    id : testCourse.course.id,
  }
  const response = await client.mutate({
    mutation: deleteCourse,
    variables
  })

  expect(response.data.deleteCourse.id).toBe(testCourse.course.id)
})