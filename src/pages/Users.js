import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { REMOVE, USERLIST } from "../graphQl-query"

function Users() {
    const { loading, error, data } = useQuery(USERLIST);
    
    const [removeUser, result] = useMutation(REMOVE, {
        onError: error => console.log(error.graphQLErrors[0].message)
    })

    const handleRemove = (id) => {
        console.log('0borrando'+id)
        removeUser( { 
            variables: { removeUserId:id }
          })
    }

    useEffect(() => {
        if (result.data) {
            
            console.log('Borrado:')
        }
    }, [result.data])



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (
        <div>
            <h1>UserList</h1>
            <ul>
                {
                data?.allUsers?.map(user => 
                <li key={user._id}>
                    {user._id} {user.name} {user.email} <button onClick={() => handleRemove(user._id)}>Borrar</button>
                </li>)
                }
            </ul>

        </div>
    )

}

export default Users