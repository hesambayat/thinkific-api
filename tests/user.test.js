import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { testUser } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getProfile, getUsers, login } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should signup a new user', async () => {
  const variables = {
    data: {
      name: 'Rob',
      email: 'rob@example.com',
      password: 'strongPassword'
    }
  }
  const response = await client.mutate({
    mutation: createUser,
    variables
  })

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
  expect(exists).toBe(true)
})

test('Should not signup user with invalid password', async () => {
  const variables = {
    data: {
      name: 'Rob',
      email: 'bob@example.com',
      password: '1234'
    }
  }

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow()
})

test('Should expose public user profile', async () => {
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Sara')
})

test('Should login with correct credentials', async () => {
  const variables = {
    data: {
      email: "sara@example.com",
      password: "thinksara!@#$"
    }
  }

  const response = await client.mutate({ mutation: login, variables })

  expect(response.data.login.token).not.toBe(null)
})

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: "sara@example.com",
      password: "wrong password"
    }
  }

  await expect(
    client.mutate({ mutation: login, variables })
  ).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  const client = getClient(testUser.jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(testUser.user.id)
  expect(data.me.name).toBe(testUser.user.name)
  expect(data.me.email).toBe(testUser.user.email)
})