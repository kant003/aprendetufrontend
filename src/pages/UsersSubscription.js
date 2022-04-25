import { useApolloClient, useLazyQuery, useMutation, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import { REMOVE, SEARCH_USERS, USERADDED, USEREDITED, USERLIST, USERREMOVED } from "../graphQl-query"

function User({ user }) {
    return <>
        {user._id} {user.email}
    </>

}

function Users({ users, removeUser }) {
    if (!users) return 'Sin datos';

    return <ul>
        {
            users.map(user =>
                <li key={user._id}>
                    <User user={user} /> <button onClick={() => removeUser(user._id)}>Borrar</button>
                </li>)
        }
    </ul>
}

function SearchUserForm({ handleSubmit }) {

    const [query, setQuery] = useState('');

    //  const [results, setResults] = useState([]);


    //if (called && loading) return <div>Loading...</div>;

    return <form onSubmit={(event) => handleSubmit(event, query)}>
        Query: <input value={query} onChange={({ target }) => setQuery(target.value)} />
        <button>Buscar</button>
    </form>
}

function UsersSubscription() {
    const client = useApolloClient()
    console.log(client)

    useSubscription(USERADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log({ subscriptionData })
            const { userAdded } = subscriptionData.data

            const dataInStore = client.readQuery({ query: USERLIST })
            console.log('aaaaaa', dataInStore)
            client.writeQuery({
                query: USERLIST,
                data: {
                    ...dataInStore,
                    allUsers: [...dataInStore.allUsers, userAdded]

                }
            })
        }
    })

    useSubscription(USERREMOVED, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log('user removed subscrit')
            const { userRemoved } = subscriptionData.data
            console.log(userRemoved)

            const dataInStore = client.readQuery({ query: USERLIST })
            console.log(dataInStore.allUsers)
            client.writeQuery({
                query: USERLIST,
                data: {
                    ...dataInStore,
                    allUsers: dataInStore.allUsers.filter(user => user._id !== userRemoved._id)

                }
            })
        }
    })

    useSubscription(USEREDITED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const { userEdited } = subscriptionData.data
            console.log(userEdited)

            const dataInStore = client.readQuery({ query: USERLIST })
            console.log(dataInStore.allUsers)
            client.writeQuery({
                query: USERLIST,
                data: {
                    ...dataInStore,
                    allUsers: dataInStore.allUsers.map(user => user._id === userEdited._id ? userEdited : user)
                }
            })
        }
    })

    const handleSubmit = (event, query) => {
        event.preventDefault();
        searchUsers({
            variables: { query: query }
        })
        console.log('buscanod', query)
        console.log(event)
    };
    //const { loading, error, data } = useQuery(USERLIST);
    const [searchUsers, { loading, error, data }] = useLazyQuery(SEARCH_USERS, {
        variables: { query: '' }
    });

    // const r=searchUsers

    const [removeUser, result] = useMutation(REMOVE, {
        onError: error => console.log(error)//console.log(error.graphQLErrors[0].message)
    })

    const handleRemove = (id) => {
        console.log('0borrando' + id)
        removeUser({
            variables: { removeUserId: id }
        })
    }

     useEffect(() => {
         console.log('use eff')
          searchUsers( {
              variables: { query: '' }
          })
         
      }, [])



    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (
        <div>
            <h1>Lista de usuarios</h1>
            <SearchUserForm handleSubmit={handleSubmit} />
            <Users users={data?.searchUsers} removeUser={handleRemove} />
        </div>
    )

}

export default UsersSubscription