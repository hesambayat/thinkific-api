import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)

    if (!args.data.name.trim()) {
      throw new Error('Name is required')
    }

    const email = String(args.data.email).trim().toLowerCase()
    if (!email) {
      throw new Error('Email is required')
    }

    const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!reg.test(email)) {
      throw new Error('Enter a valid email')
    }

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        email,
        password
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async deleteManyUsers(parent, args, { prisma }, info) {
    return prisma.mutation.deleteManyUsers(args, info)
  }
}

export { Mutation as default }