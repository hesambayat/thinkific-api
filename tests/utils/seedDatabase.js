import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

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
}

export { seedDatabase as default, testUser }