  import React, { useState } from "react";
  import "../App.css";
  import api from "./api";

  export default function Cadastrar({fechar}) {
    const [formData, setFormData] = useState({
      nome: "",
      email: "",
    });

    function handleChange(e) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
  event.preventDefault();

  api.post("/cadastrar", formData)
    .then(res => {
      console.log("Usuário cadastrado com sucesso:", res.data);
      setFormData({ nome: "", email: "" }); // limpa campos
      fechar(); // fecha modal
    })
    .catch(err => {
      console.error("Erro ao cadastrar:", err);
    });
}

    return (
      <section className="cadastrer">
        <h1>Cadastra-se</h1>
        <form onSubmit={handleSubmit} className="formCadastro">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="digite seu nome"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="digite seu email"
            required
          />

          <div className="button">
            <button className="buttonCadastrar" type="submit">
              cadastrar
            </button>
            <button className="eliminar" onClick={fechar}>x</button>
          </div>
        </form>
      </section>
    );
  }
