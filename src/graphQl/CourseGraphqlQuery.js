import { gql } from '@apollo/client'

export const LINKS_PER_PAGE = 5;


export const ALL_COURSES = gql`
query AllCourses {
  allCourses {
    id
    title
    description
  }
}
`
export const FEED_SEARCH_QUERY = gql`
    query FilterCourses($filter: String, $skip: Int, $take: Int, $orderBy: CourseOrderByInput) {
        filterCourses(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
            courses {
                id
                description
                title
            }
            count
        }
    }
`



export const COURSE_ADDED = gql`
  subscription CourseAdded {
    courseAdded {
      id
      title
      description
    }
  }
`

export const REMOVE_COURSE = gql`
mutation RemoveCourse($removeCourseId: String!) {
  removeCourse(id: $removeCourseId) {
    createdAt
    id
    title
    description
  }
}
`


export const TOGGLE_COURSE_COLABORATOR = gql`
    mutation ToggleColaborator($idCourse: ID!, $idUser: ID!) {
        toggleColaborator(idCourse: $idCourse, idUser: $idUser) {
        id
        title
        }
    }
`

export const TOGGLE_COURSE_REQUEST_COLABORATE = gql`
mutation ToggleRequestColaborate($idCourse: ID!) {
  toggleRequestColaborate(idCourse: $idCourse) {
    id
    title
  }
}
`