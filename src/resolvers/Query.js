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
    })
  }
}

export { Query as default }