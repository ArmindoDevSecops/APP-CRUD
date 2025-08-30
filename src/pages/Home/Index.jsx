import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa"; 
import Edit from "../../components/Edit";
import "./style.css"


function Home() {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [userEditing, setUserEditing] = useState(null); //guarda o usuario clicado

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const userFromApi = await api.get("/usuarios");
    setUsers(userFromApi.data);
     console.log(userFromApi.data); 
  }
  useEffect(() => {
    getUsers();
  }, []);

  // criar ou cadastrar um novo usuário

  async function CreatUser() {
    const newUser = {
      nome: inputName.current.value,
      age: Number(inputAge.current.value),
      email: inputEmail.current.value,
    };

    try {
      await api.post("/cadastrar", newUser);
      getUsers(); // carrega a lista
      // limpando os inputs
      inputName.current.value = ""
      inputAge.current.value = ""
      inputEmail.current.value = ""
    } catch (erro) {
      console.error("erro ao cadastrar usuario", erro);
    }
  }

  // deletar dados dos usuários
  async function deleteUser(id) {
    try {
     await api.delete(`/delete/${id}`);
      getUsers(); // carrega a lista
    } catch (erro) {
      console.error("erro ao deleta usuário", erro);
    }
  }

  return (
    <div className="container">
      <form className="form">
        <h2>cadastro de usuários</h2>
        <input type="text" name="nome" placeholder="Nome:" ref={inputName} />
        <input type="number" name="idade" placeholder="idade:" ref={inputAge} />
        <input
          type="email"
          name="email"
          placeholder="email:"
          ref={inputEmail}
        />
        <button type="button" onClick={CreatUser}>
          cadastrar
        </button>
      </form>

      <div>
        {toggle && userEditing &&  (
          <div>
            <Edit closeButton={()=> setToggle(false)} getUsers={getUsers} user={userEditing} />
          </div>
        )}
      </div>

      {users.map((user) => (
        <div key={user.id} className="cards">
          <div>
            <p>
              Nome: <span>{user.nome}</span>
            </p>
            <p>
              idade: <span>{user.age}</span>
            </p>
            <p>
              email: <span>{user.email}</span>
            </p>
          </div>

          <div className="icons-button">
            <button>
              <FaEdit size={15}color="yellow" onClick={()=> {setUserEditing(user); setToggle(true)}}/>
            </button>
            <button onClick={() => deleteUser(user.id)}>
              <FaTrash  size={15} color="red"/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
