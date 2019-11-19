import { extractFragmentReplacements } from 'prisma-binding'
import Mutation from './Mutation'
import Query from './Query'
import User from './User'

const resolvers = {
  Mutation,
  Query,
  User
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }