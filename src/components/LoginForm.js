import { useState } from "react"
import { useMutation } from '@apollo/client'
import { LOGIN } from "../graphQl-query"


function LoginForm({ notificationError, setToken }) {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('123')
   // const [isLogued, setIsLogued] = useState( () => !!localStorage.getItem('token') )
    const [login, result] = useMutation(LOGIN, {
        onError: error => console.log('error'+error),//notificationError(error.graphQLErrors[0].message)
       onCompleted: (data) => {
              console.log('data'+data)
              localStorage.setItem('token', data.login.value)
              setToken(data.login.value)
              //setIsLogued(true)
         }
    })

    /*useEffect(() => {
        if (result.data) {
            const {value:token} = result.data.login
            setToken(token)
            localStorage.setItem('token', token)
            console.log('correcto:'+token)
        }
    }, [result.data])
*/

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('logueando',email,password)
        login({ variables: { email, password } })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Email: <input value={email} onChange={({ target }) => setEmail(target.value)} /> <br />
                Pass: <input value={password} onChange={({ target }) => setPassword(target.value)} /><br />
                <button>Loguearse</button>
            </form>
        </div>
    )
}

export default LoginForm