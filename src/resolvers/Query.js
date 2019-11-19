const Query = {
  users(parent, args, { prisma }, info) {

    return prisma.query.users(args, info)
  }
}

export { Query as default }