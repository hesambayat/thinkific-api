import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async createCourse(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (!args.data.name.trim()) {
      throw new Error('Name is required')
    }

    const author = {
      connect: {
        id: userId
      }
    }

    return prisma.mutation.createCourse({
      data: {
        ...args.data,
        author
      }
    })
  },
  async updateCourse(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    return prisma.mutation.updateCourse({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
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
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })

    if (!user) {
      throw new Error('Email or password is wrong')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password)

    if (!isMatch) {
      throw new Error('Email or password, is wrong')
    }

    return {
      user,
      token: generateToken(user.id)
    }
  },
}

export { Mutation as default }