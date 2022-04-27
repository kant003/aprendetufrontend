import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { ALL_COURSES, COURSE_ADDED, FEED_SEARCH_QUERY, LINKS_PER_PAGE, REMOVE_COURSE } from "../graphQl/CourseGraphqlQuery";

export function useCourse({take, skip, orderBy, handleCompleted}) {

  const { data, loading, error, subscribeToMore } = useQuery(FEED_SEARCH_QUERY, {
    variables: {take, skip, orderBy},
    fetchPolicy: "cache-and-network",  // see note for explanation. Necesario para solucionar bug
    onCompleted: (data) => {
      handleCompleted(data.filterCourses.count )
    }
  });

 

  const client = useApolloClient()
  const dataInStore = client.readQuery({ query: ALL_COURSES,  })
  console.log('valor:',dataInStore)


  //console.log(client)

  const [removeCourse, result] = useMutation(REMOVE_COURSE, {
    onError: error => console.log(error)//console.log(error.graphQLErrors[0].message)
  })

  const handleRemove = (id) => {
    console.log('0borrando' + id)
    removeCourse({
      variables: { removeCourseId: id }
    })
  }

  subscribeToMore({
    document: COURSE_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const courseAdded = subscriptionData.data.courseAdded;
      //console.log(courseAdded)
      //const courseAdded = subscriptionData.data.courseAdded;
      const exists = prev.filterCourses.courses.find(
        ({ id }) => id === courseAdded.id
      );
      if (exists) return prev;

      return Object.assign({}, prev, {
        filterCourses: {
          courses: [courseAdded, ...prev.filterCourses.courses],
          count: prev.filterCourses.courses.length + 1,
          __typename: prev.filterCourses.__typename
        }
      });
    }
  });


  return {
    data, loading, error, subscribeToMore,handleRemove
  };
}