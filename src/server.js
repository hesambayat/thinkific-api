import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({
    context(request) {
        return {
            request
        }
    }
})

export { server as default }