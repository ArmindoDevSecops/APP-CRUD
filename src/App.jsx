import { useEffect, useState } from "react";
import "./App.css";
import api from "./components/api";
import Cadastrar from "./components/Cadastrar";
import Editar from "./components/Editar";

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [editingModal, setModalEditinhg] = useState(false);

  function BuscaDados() {
    api
      .get("/usuarios")
      .then((res) => {
        setUsers(res.data);
        console.log("dados retornados com sucesso", res.data);
      })
      .catch((err) => console.error("erro ao buscar usuarios", err));
  }

  useEffect(() => {
    BuscaDados();
  }, []);

  function deleteUser(id) {
    if (confirm("tem certeza?")) {
      api
        .delete(`/deletar/${id}`)
        .then(() => BuscaDados())
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className="app-geral">
      <h1 className="h1">lista de usuarios</h1>
      <div className="Center">
        {users.map((user) => (
          <ul key={user.id} className="listaUser">
            <li>
              {user.nome} - {user.email}
            </li>
            <div className="buttonUsers">
              <button className="editar" onClick={() => setModalEditinhg(true)}>
                editar
              </button>
              <button className="cadastrar" onClick={() => setModal(true)}>
                cadastrar
              </button>
              <button className="deletar" onClick={() => deleteUser(user.id)}>
                deletar
              </button>
            </div>
          </ul>
        ))}
      </div>

      {modal && (
        <div>
          <Cadastrar fechar={() => setModal(false)} />
        </div>
      )}

      {editingModal && (
        <div>
          <Editar closeModal={() => setModal(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
