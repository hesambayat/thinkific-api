import { extractFragmentReplacements } from 'prisma-binding'
import Capture from './Capture'
import Course from './Course'
import Mutation from './Mutation'
import Query from './Query'
import User from './User'

const resolvers = {
  Capture,
  Course,
  Mutation,
  Query,
  User
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }