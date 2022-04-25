import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { EDIT_USER, GETUSER } from "../graphQl-query";

function UserFormEdit({uid}) {

    //const { uid } = useParams()
    const { loading, error, data } = useQuery(GETUSER, {
          variables: { getUserId:uid },
            onError: error => console.log(error),//notificationError(error.graphQLErrors[0].message)
            onCompleted: () => console.log("OcompletadoK")
        });
  
    const [name, setName] = useState(loading ? '':data?.getUser.name);
    const [email, setEmail] = useState(loading ? '':data?.getUser.email);
    const [password, setPassword] = useState(loading ? '':data?.getUser.password);

    const [editUser] = useMutation(EDIT_USER, {
        onError: error => console.log(error),
        onCompleted: () => console.log("OK")
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        editUser({ variables: { editUserId:uid, name, email } });
    };

    return <div>
        <h2>Formulario registro {uid}</h2>
        <form onSubmit={handleSubmit}>
            Nombre: <input value={name} onChange={({ target }) => setName(target.value)} /> <br />
            Email: <input value={email} onChange={({ target }) => setEmail(target.value)} /><br />
            Password: <input value={password} onChange={({ target }) => setPassword(target.value)} /><br />
            <button>Registrar</button>
        </form>

    </div>
}

export default UserFormEdit