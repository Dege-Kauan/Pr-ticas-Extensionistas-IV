import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    state: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) alert('Usuário registrado com sucesso!');
    else alert('Erro ao registrar usuário.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="username" placeholder="Nome de Usuário" onChange={handleChange} />
      <input type="password" name="password" placeholder="Senha" onChange={handleChange} />
      <input name="state" placeholder="Estado" onChange={handleChange} />
      <input name="city" placeholder="Cidade" onChange={handleChange} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
