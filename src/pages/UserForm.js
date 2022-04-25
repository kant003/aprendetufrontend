import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "../graphQl-query";

function UserForm() {
    const [name, setName] = useState('pp');
    const [email, setEmail] = useState('p@gmail.com');
    const [password, setPassword] = useState('123');

    const [createUser] = useMutation(CREATE_USER, {
        onError: error => console.log(error)
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        createUser({ variables: { name, email, password } });
        setName('')
        setEmail('')
        setPassword('')
    };

    return <div>
        <h2>Formulario registro</h2>
        <form onSubmit={handleSubmit}>
            Nombre: <input value={name} onChange={({ target }) => setName(target.value)} /> <br />
            Email: <input value={email} onChange={({ target }) => setEmail(target.value)} /><br />
            Password: <input value={password} onChange={({ target }) => setPassword(target.value)} /><br />
            <button>Registrar</button>
        </form>

    </div>
}

export default UserForm