import { useEffect, useState } from "react";
import "./App.css";
import api from "./components/api";
import Cadastrar from "./components/Cadastrar";

function App() {
 
const [users, setUsers] = useState([]);
const [modal , setModal] = useState(false);

const toggle = ()=> setModal(!modal);

  function BuscaDados () {
      api.get("/usuarios")
      .then(res => {
            setUsers(res.data)
            console.log("dados retornados com sucesso", res.data)
      })
      .catch(err=> console.error("erro ao buscar usuarios", err))
  }
     
  useEffect(()=>{
    BuscaDados();
  }, [])

  return (
    <div className="app-geral">
      <h1 className="h1">lista de usuarios</h1>
    <div className="Center">
      {users.map((user)=> (
        <ul key={user.id} className="listaUser">
          <li>{user.nome} - {user.email}</li>
        <div>
          <button>editar</button>
          <button onClick={toggle}>cadastrar</button>
        </div>
        </ul>
      ))}
    </div>

    {modal && (
      <div>
        <Cadastrar />
      </div>
    )}
    </div>
  )
      
}

export default App;
