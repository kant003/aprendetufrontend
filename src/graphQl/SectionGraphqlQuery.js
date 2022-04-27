import { gql } from '@apollo/client'

export const ADD_SECTION = gql`
    mutation AddSectionToThemeType1($idCourse: ID!, $idTheme: ID!, $title: String!, $description: String) {
    addSectionToThemeType1(idCourse: $idCourse, idTheme: $idTheme, title: $title, description: $description) {
      id
      title
    }
  }
`

export const REMOVE_SECTION = gql`
mutation RemoveSectionFromTheme($idCourse: ID!, $idTheme: ID!, $idSection: ID!) {
  removeSectionFromTheme(idCourse: $idCourse, idTheme: $idTheme, idSection: $idSection) {
    id
    title
  }
}
`


export const CHANGE_SECTION_POSITION = gql`
    mutation ChangeSectionPosition($idCourse: ID!, $idTheme: ID!, $idSection: ID!, $positionDestination: Int!) {
    changeSectionPosition(idCourse: $idCourse, idTheme: $idTheme, idSection: $idSection, positionDestination: $positionDestination) {
        id
        title
    }
    }
`

export const TOGGLE_SECTION_ACTIVE = gql`
mutation ToggleSectionActive($idCourse: ID!, $idTheme: ID!, $idSection: ID!) {
  toggleSectionActive(idCourse: $idCourse, idTheme: $idTheme, idSection: $idSection) {
    id
    title
  }
}
`