import { useState } from "react";
import "../App.css"



export default function Editar() {
  const [editar, setEditar] = useState({
    nome: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditar({ ...editar, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="editarUsers">
        <h1>Editar usuarios</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="nome"
            value={editar.nome}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={editar.email}
            onChange={handleChange}
          />
        </div>

        <div>
             <button>Editar</button>
        </div>
      </form>
    </div>
  );
}
