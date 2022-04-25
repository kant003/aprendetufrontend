import {gql} from '@apollo/client'
export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            value
        }
    }

`
export const USERLIST = gql`
query AllUsers {
  allUsers {
    _id
    name
    email
  }
}
`

export const SEARCH_USERS = gql`
query SearchUsers($query: String!) {
  searchUsers(query: $query) {
    _id
    name
    email
  }
}
`

export const GETUSER = gql`
query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    _id
    name
    email
    rol
  }
}
`
export const REMOVE = gql`

mutation RemoveUser($removeUserId: String!) {
  removeUser(id: $removeUserId) {
    _id
  }
}
`

export const CREATE_USER = gql`

mutation CreateUser($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    _id
    name
    email
  }
}
`
export const EDIT_USER = gql`
mutation EditUser($editUserId: String!, $name: String, $email: String) {
  editUser(id: $editUserId, name: $name, email: $email) {
    _id
    name
    email
  }
}
`


export const USERADDED = gql`
subscription {
  userAdded {
    _id
    name
    email
  }
}
`



export const USERREMOVED = gql`
subscription UserRemoved {
  userRemoved {
    _id
  }
}
`

export const USEREDITED = gql`
subscription UserEdited {
  userEdited {
    _id
    email
    name
  }
}
`


