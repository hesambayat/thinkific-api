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
  async deleteCourse(parent, args, { prisma, request }, info) {
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

    return prisma.mutation.deleteCourse({
      where: {
        id: args.id
      }
    }, info)
  },
  async createCapture(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.courseId,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    const course = {
      connect: {
        id: args.courseId
      }
    }

    return prisma.mutation.createCapture({
      data: {
        ...args.data,
        course
      }
    })
  },
  async updateCapture(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.courseId,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    const captureExists = await prisma.exists.Capture({
      id: args.id,
      course: {
        id: args.courseId
      }
    })

    if (!captureExists) {
      throw new Error('Capture not found!')
    }

    return prisma.mutation.updateCapture({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async deleteCapture(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.courseId,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    const captureExists = await prisma.exists.Capture({
      id: args.id,
      course: {
        id: args.courseId
      }
    })

    if (!captureExists) {
      throw new Error('Capture not found!')
    }

    return prisma.mutation.deleteCapture({
      where: {
        id: args.id
      }
    }, info)
  },
  async createContent(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.courseId,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    const captureExists = await prisma.exists.Capture({
      id: args.captureId,
      course: {
        id: args.courseId
      }
    })

    if (!captureExists) {
      throw new Error('Capture not found!')
    }

    const capture = {
      connect: {
        id: args.captureId
      }
    }

    return prisma.mutation.createContent({
      data: {
        ...args.data,
        capture
      }
    })
  },
  async updateContent(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.courseId,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    const captureExists = await prisma.exists.Capture({
      id: args.captureId,
      course: {
        id: args.courseId
      }
    })

    if (!captureExists) {
      throw new Error('Capture not found!')
    }

    const contentExists = await prisma.exists.Content({
      id: args.id,
      capture: {
        id: args.captureId
      }
    })

    if (!contentExists) {
      throw new Error('Content not found!')
    }

    return prisma.mutation.updateContent({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async deleteContent(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.courseId,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    const captureExists = await prisma.exists.Capture({
      id: args.captureId,
      course: {
        id: args.courseId
      }
    })

    if (!captureExists) {
      throw new Error('Capture not found!')
    }

    const contentExists = await prisma.exists.Content({
      id: args.id,
      capture: {
        id: args.captureId
      }
    })

    if (!contentExists) {
      throw new Error('Content not found!')
    }

    return prisma.mutation.deleteContent({
      where: {
        id: args.id
      }
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
  async deleteManyUsers(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    if (!userId) {
      throw new Error('No script kiddies, please!')
    }

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