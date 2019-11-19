import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

jest.setTimeout(30000)

const testCourse = {
  input: {
    name: 'Sara test course',
    subtitle: 'Auto generated course',
    price: 99.00,
    duration: 60
  },
  course: undefined
}

const testCapture = {
  input: {
    title: 'Lecture one: why?',
    order: 0
  },
  capture: undefined
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

const testGuestUser = {
  input: {
    name: 'Joe',
    email: 'joe@example.com',
    password: bcrypt.hashSync('joeboy!@#$')
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

  // Create test guest user
  testGuestUser.user = await prisma.mutation.createUser({
    data: testGuestUser.input
  })
  testGuestUser.jwt = jwt.sign({ userId: testGuestUser.user.id }, process.env.JWT_SECRET)

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

  // Create test capture
  testCapture.capture = await prisma.mutation.createCapture({
    data: {
      ...testCapture.input,
      course: {
        connect: {
          id: testCourse.course.id
        }
      }
    }
  })
}

export { seedDatabase as default, testCourse, testCapture, testUser, testGuestUser }