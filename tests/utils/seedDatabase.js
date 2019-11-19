import prisma from '../../src/prisma'

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers()
}

export { seedDatabase as default }