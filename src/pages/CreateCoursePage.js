import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEED_SEARCH_QUERY, ALL_COURSES } from "../graphQl/CourseGraphqlQuery";
import { USERLIST } from "../graphQl-query";

export const CREATE_COURSE = gql`
  mutation CreateCourse($title: String!, $description: String!) {
    createCourse(title: $title, description: $description) {
      id
      title
      description
    }
  }
`
export const GET_COURSE = gql`
query GetCourse($getCourseId: ID!) {
  getCourse(id: $getCourseId) {
    id
    title
    description
    langs
    img
    active
    colaborators {
      id
      email
    }
    requests {
      id
      email
      name
    }
    themes {
      id
      title
      description
      active
      sections {
        active
        createdAt
        description
        id
        title
        type
        updatedAt
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    createdBy {
      email
      id
    }
  }
}
`



const CreateCoursePage = () => {
  const { idCourse } = useParams()
 /* const client = useApolloClient()
  const dataInStore = client.readQuery({ query: ALL_COURSES  })

  const dataInStore2 = client.readQuery({ query: USERLIST })


  //console.log(client)
  console.log('a',dataInStore)
  console.log(dataInStore2)
  */
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: '',
    description: ''
  });

  

  const [createCourse] = useMutation(CREATE_COURSE, {
    variables: {
      title: formState.title,
      description: formState.description
    },
    update: (cache, { data: { createCourse } }) => {
      const data = cache.readQuery({
        query: ALL_COURSES,
      });
      console.log('losDatos',data)
      console.log(createCourse)
      cache.writeQuery({
        query: ALL_COURSES,
        data: {
          allCourses: [createCourse, ...data.allCourses]
        }
      });
    },
    onError: (error) => console.log(error),
    onCompleted: () => navigate('/coursesPage')
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse();
  }
  return (
    <div>
      <h1>{idCourse?"editando:"+idCourse:"creando nuevo"}</h1>
      <form onSubmit={handleSubmit} >
        <div>
          Title: <input className="border-2" type="text" value={formState.title} onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })} /> <br />
          Description: <input value={formState.description} onChange={
            ({ target }) => setFormState({ ...formState, description: target.value })
          } /> <br />
        </div>
        <button className="btn btn--primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;