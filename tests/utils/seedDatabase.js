import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const testCourse = {
  input: {
    name: 'Sara test course',
    subtitle: 'Auto generated course',
    price: 99.00,
    duration: 60
  },
  course: undefined
}

const testUser = {
  input: {
    name: 'Sara',
    email: 'sara@example.com',
    password: bcrypt.hashSync('thinksara!@#$')
  },
  user: undefined,
  jwt: undefined
}

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers()

  // Create test user
  testUser.user = await prisma.mutation.createUser({
    data: testUser.input
  })
  testUser.jwt = jwt.sign({ userId: testUser.user.id }, process.env.JWT_SECRET)

  // Create test course
  testCourse.course = await prisma.mutation.createCourse({
    data: {
      ...testCourse.input,
      author: {
        connect: {
          id: testUser.user.id
        }
      }
    }
  })
}

export { seedDatabase as default, testCourse, testUser }