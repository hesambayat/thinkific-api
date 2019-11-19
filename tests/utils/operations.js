import { gql } from 'apollo-boost'

const createCourse = gql`
  mutation($data: CourseCreateInput!) {
    createCourse(
      data: $data
    ){
      id
      name
      author {
        id
        name
      }
    }
  }
`

const updateCourse = gql`
  mutation($id: ID!, $data: CourseUpdateInput!) {
    updateCourse(
      id: $id
      data: $data
    ){
      id
      name
      price
    }
  }
`

const deleteCourse = gql`
  mutation($id: ID!) {
    deleteCourse(
      id: $id
    ){
      id
      name
    }
  }
`

const createCapture = gql`
  mutation($courseId: ID!, $data: CaptureCreateInput!) {
    createCapture(
      courseId: $courseId
      data: $data
    ){
      id
      title
      order
      course {
        id
        name
      }
    }
  }
`

const updateCapture = gql`
  mutation($courseId: ID!, $id: ID!, $data: CaptureUpdateInput!) {
    updateCapture(
      courseId: $courseId
      id: $id
      data: $data
    ){
      id
      title
      order
    }
  }
`

const deleteCapture = gql`
  mutation($courseId: ID!, $id: ID!) {
    deleteCapture(
      courseId: $courseId
      id: $id
    ){
      id
      title
      order
    }
  }
`

const createUser = gql`
  mutation($data: UserCreateInput!) {
    createUser(
      data: $data
    ){
      token
      user {
        id
        name
        email
      }
    }
  }
`

const getProfile = gql`
  query {
    me {
      id
      name
      email
      courses {
        id
        name
      }
    }
  }
`

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

const login = gql`
  mutation($data: LoginUserInput!) {
    login(
      data: $data
    ){
      user {
        email
      }
      token
    }
  }
`

export {
  createCourse,
  updateCourse,
  deleteCourse,
  createCapture,
  updateCapture,
  deleteCapture,
  createUser,
  getProfile,
  getUsers,
  login
}