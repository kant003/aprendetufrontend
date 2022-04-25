import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { GETUSER } from "../graphQl-query"
import { useParams } from 'react-router-dom'

function User() {
    //const [user, setUser] = useState(null)
    const {uid} = useParams()
    const { loading, error, data } = useQuery(GETUSER, {
        variables: { getUserId:uid },
      });
    //const {user} = data
    useEffect(() => {
        console.log('User')
    }, [])
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
   /* useQuery(GETUSER, {
        onCompleted: data => {
            console.log(data)
            setUser(data.getUser)
        }
    })*/


    return (
        <div>
            <h1>User</h1>
            <div>Id: {data?.getUser?._id}</div>
            <div>Nombre: {data?.getUser?.name}</div>
            <div>Email: {data?.getUser?.email}</div>
            <div>Rol: {data?.getUser?.rol}</div>
        </div>
    )

}

export default User