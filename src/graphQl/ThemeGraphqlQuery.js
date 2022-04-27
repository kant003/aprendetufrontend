import { gql } from '@apollo/client'

export const ADD_THEME = gql`
    mutation AddThemeToCourse($title: String!, $idCourse: ID!, $description: String) {
        addThemeToCourse(title: $title, idCourse: $idCourse, description: $description) {
        id
        title
        }
    }
`
export const REMOVE_THEME = gql`
    mutation RemoveThemeFromCourse($idCourse: ID!, $idTheme: ID!) {
        removeThemeFromCourse(idCourse: $idCourse, idTheme: $idTheme) {
        id
        title
        }
    }
`


export const CHANGE_THEME_POSITION = gql`
    mutation ChangeThemePosition($idCourse: ID!, $idTheme: ID!, $positionDestination: Int!) {
    changeThemePosition(idCourse: $idCourse, idTheme: $idTheme, positionDestination: $positionDestination) {
        id
    }
    }
`

export const TOGGLE_THEME_ACTIVE = gql`
    mutation ToggleThemeActive($idCourse: ID!, $idTheme: ID!) {
    toggleThemeActive(idCourse: $idCourse, idTheme: $idTheme) {
        id
        title
    }
    }
`

