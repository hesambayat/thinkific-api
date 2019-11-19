import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createCourse } from './utils/operations'

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
