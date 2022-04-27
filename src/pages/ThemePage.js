import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_COURSE } from "./CreateCoursePage";
import { ADD_SECTION, REMOVE_SECTION, CHANGE_SECTION_POSITION, TOGGLE_SECTION_ACTIVE } from "../graphQl/SectionGraphqlQuery";
const Course = ({ id, title, description, createdBy }) => {
    return <>

        <div>
            <h1>{id} - {title}</h1>
            <small>Creado por: {createdBy.id} {createdBy.email}</small>
            <small>{description}</small>
        </div>
    </>
}

const Sections = ({ idCourse, idTheme, sections }) => {

    const [removeUser] = useMutation(REMOVE_SECTION, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const [changePosition] = useMutation(CHANGE_SECTION_POSITION, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const [toggleActive] = useMutation(TOGGLE_SECTION_ACTIVE, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const handleRemove = (idSection) => {
        removeUser({
            variables: { idCourse, idTheme, idSection }
        })
    }

    const handleChangePosition = (idSection, positionDestination) => {
        changePosition({
            variables: { idCourse, idTheme, idSection, positionDestination }
        })
    }

    const handleToggleActive = (idSection) => {
        toggleActive({
            variables: { idCourse, idTheme, idSection }
        })
    }
    

    if (sections.length === 0) return 'No tiene secciones';
    return <div>
        <ul>
            {sections.map( (section,i) => <li key={section.id}>
                {section.id} - {section.title} - {section.description} - {section.active ? 'Activo' : 'Inactivo'} - {section.position}
                <button onClick={() => handleRemove(section.id)}>Borrar</button> |
                <button onClick={() => handleToggleActive(section.id)}> {section.active?'Desactivar':'Activar'}</button> |
                <button onClick={() => handleChangePosition(section.id, i - 1)}>Subir pos</button> |
                <button onClick={() => handleChangePosition(section.id, i + 1)}>Bajar pos</button> |

            </li>)}
        </ul>
    </div>
}

const Theme = ({ id, title, description, active, createdAt, updatedAt }) => {
    return <>
        <div>
            <h1>{id} - {title}</h1>
            <small>{description}</small>
        </div>
    </>
}



const AddSectionForm = ({ idCourse, idTheme }) => {

    const [formState, setFormState] = useState({
        title: '',
        description: ''
    });

    const [create] = useMutation(ADD_SECTION, {
        variables: {
            idCourse,
            idTheme,
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


const ThemePage = () => {
    const { idCourse, idTheme } = useParams();

    const { loading, error, data = {} } = useQuery(GET_COURSE, {
        variables: { getCourseId: idCourse },
    });

    const getSectionsOfTheme = (idTheme) => {
        return data.getCourse.themes.find(theme => theme.id === idTheme).sections;
    }
    const getTheme = (idTheme) => {
        return data.getCourse.themes.find(theme => theme.id === idTheme);
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return <>
        <h1>El curso</h1>
        <Course {...data.getCourse} />
        <h1>El tema</h1>
        <Theme {...getTheme(idTheme)} />
        <h1>Sections {getTheme(idTheme).sections.length}</h1>
        <AddSectionForm idCourse={idCourse} idTheme={idTheme} />
        <Sections idCourse={idCourse} idTheme={idTheme} sections={getSectionsOfTheme(idTheme)} />
        <hr></hr>
        <Link to={`/course/${idCourse}`}>Volver</Link>
    </>
};

export default ThemePage;