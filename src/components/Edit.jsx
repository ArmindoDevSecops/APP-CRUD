import { useRef } from "react";
import "../pages/Home/style.css";
import api from "../services/api";

export default function Edit({ closeButton, getUsers, user }) {
  function handleForm(e) {
    e.preventDefault();
  }

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function EditarUsuario(id) {
    const userEditing = {
      nome: inputName.current.value,
      age: Number(inputAge.current.value),
      email: inputEmail.current.value,
    };
  
    try {
      await api.put(`/editar/${id}`, userEditing);
      closeButton(); // fecha o botao depois de clicar
      getUsers();
    } catch (err) {
      console.error("erro ao editar usuário", err);
    }
  }

  return (
    <div>
      <form className="containerForm" onSubmit={handleForm}>
        <h3>Editar dados do usuário</h3>
        <input
          type="text"
          name="nome"
          ref={inputName}
          defaultValue={user.nome}
        />
        <input
          type="number"
          name="age"
          ref={inputAge}
          defaultValue={user.age}
        />
        <input
          type="email"
          name="email"
          ref={inputEmail}
          defaultValue={user.email}
        />
        <button type="button" onClick={() => EditarUsuario(user.id)}>
          Editar
        </button>
        <button onClick={closeButton} className="close">
          x
        </button>
      </form>
    </div>
  );
}
