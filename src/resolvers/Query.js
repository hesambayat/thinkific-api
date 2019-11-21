import getUserId from '../utils/getUserId'

const Query = {
  users(parent, args, { prisma }, info) {

    return prisma.query.users(args, info)
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.query.user({
      where: {
        id: userId
      }
    }, info)
  },
  async course(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const courseExists = await prisma.exists.Course({
      id: args.where.id,
      author: {
        id: userId
      }
    })

    if (!courseExists) {
      throw new Error('Course not found!')
    }

    return prisma.query.course(args, info)
  },
}

export { Query as default }