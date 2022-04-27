import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { ADD_THEME, CHANGE_THEME_POSITION, REMOVE_THEME, TOGGLE_THEME_ACTIVE } from "../graphQl/ThemeGraphqlQuery";
import { GET_COURSE } from "./CreateCoursePage";
import { TOGGLE_COURSE_COLABORATOR } from "../graphQl/CourseGraphqlQuery";
import { useState } from "react";

const Course = ({ id, title, description, createdBy, acceptColaborators }) => {
    return <>
        <div>
            <h1>{id} - {title}</h1>
            <small>Creado por: {createdBy.id} {createdBy.email}</small>
            <small>{description}</small>
            <b>{acceptColaborators ? "acepta colab" : "no acepta colab"}</b>
        </div>
    </>
}
const Themes = ({ idCourse, themes }) => {
    const [removeUser] = useMutation(REMOVE_THEME, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const [changePosition] = useMutation(CHANGE_THEME_POSITION, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const [toggleActive] = useMutation(TOGGLE_THEME_ACTIVE, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const handleRemove = (idTheme) => {
        removeUser({
            variables: { idCourse, idTheme }
        })
    }

    const handleChangePosition = (idTheme, positionDestination) => {
        changePosition({
            variables: { idCourse, idTheme, positionDestination }
        })
    }

    const handleToggleActive = (idTheme) => {
        toggleActive({
            variables: { idCourse, idTheme }
        })
    }

    if (themes.length === 0) return 'No tiene temas';
    return <div>
        <ul>
            {themes.map((theme, i) =>
                <li key={theme.id}>{theme.id} - {theme.title} {theme.active ? "activo" : "inactivo"}|
                    <Link to={`/theme/${idCourse}/${theme.id}`}>Ver</Link> |
                    <button onClick={() => handleRemove(theme.id)}>Borrar</button> |
                    <button onClick={() => handleToggleActive(theme.id)}>{theme.active?'Desactivar':'Activar'}</button> |
                    <button onClick={() => handleChangePosition(theme.id, i - 1)}>Subir pos</button> |
                    <button onClick={() => handleChangePosition(theme.id, i + 1)}>Bajar pos</button> |
                </li>)}
        </ul>
    </div>
}
const Colaborators = ({ idCourse, colaborators }) => {
    const [toggleActive] = useMutation(TOGGLE_COURSE_COLABORATOR, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const handleToggleColaborator = (idCourse, idUser) => {
        toggleActive({
            variables: { idCourse, idUser }
        })
    }

    if (colaborators.length === 0) return 'No tiene colaboradores';
    return <div>
        <ul>
            {colaborators.map(colaborator => <li key={colaborator.id}>
                {colaborator.id} - {colaborator.email}
                <button onClick={() => handleToggleColaborator(idCourse, colaborator.id)}> Quitar colaboración</button> |
            </li>)}

        </ul>
    </div>
}

const Requests = ({ idCourse, requests }) => {
    const [toggleActive] = useMutation(TOGGLE_COURSE_COLABORATOR, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const handleToggleColaborator = (idCourse, idUser) => {
        toggleActive({
            variables: { idCourse, idUser }
        })
    }

    if (requests.length === 0) return 'No tiene peticiones de colaboración';
    return <div>
        <ul>
            {requests.map(request => <li key={request.id}>
                {request.id} - {request.email}
                <button onClick={() => handleToggleColaborator(idCourse, request.id)}>Aceptar colaboración</button> |

            </li>)}

        </ul>
    </div>
}



const AddThemeForm = ({ idCourse }) => {

    const [formState, setFormState] = useState({
        title: '',
        description: ''
    });

    const [create] = useMutation(ADD_THEME, {
        variables: {
            idCourse,
            title: formState.title,
            description: formState.description
        },
        onError: (error) => console.log(error),
        //onCompleted: () => navigate('/coursesPage')
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        create();
    }
    return (
        <div>
            <form className="flex justify-center border-2" onSubmit={handleSubmit} >
                <div>
                    Title: <input className="border-2" type="text" value={formState.title} onChange={(e) =>
                        setFormState({ ...formState, title: e.target.value })} /> <br />
                    Description: <input value={formState.description} onChange={
                        ({ target }) => setFormState({ ...formState, description: target.value })
                    } /> <br />
                </div>
                <button className="btn">Submit</button>
            </form>
        </div>
    );
};

const CoursePage = () => {
    const { idCourse } = useParams();

    const { loading, error, data = {} } = useQuery(GET_COURSE, {
        variables: { getCourseId: idCourse },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return <>
        <Course {...data.getCourse} />
        <h1>Colaborators</h1>
        <Colaborators idCourse={idCourse} colaborators={data.getCourse.colaborators} />
        <h1>Peticiones de colaboracion</h1>
        <Requests idCourse={idCourse} requests={data.getCourse.requests} />
        <h1>Themes {data.getCourse.themes.length}</h1>

        <AddThemeForm idCourse={idCourse} />
        <Themes idCourse={idCourse} {...data.getCourse} />
    </>
};

export default CoursePage;