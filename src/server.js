import { GraphQLServer } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers'
import prisma from './prisma'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request
        }
    },
    fragmentReplacements
})

export { server as default }