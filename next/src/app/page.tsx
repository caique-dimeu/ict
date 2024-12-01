'use client'

import React, { useState, useEffect } from "react";
import styles from './page.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Home = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [searchId, setSearchId] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      if (token) {
        setAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return alert('Por favor, preencha todos os campos.');

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      document.cookie = `token=${data.token}; path=/`;
      setAuthenticated(true);
      setUserData(data.user || null);
    } else {
      alert('Erro ao fazer login');
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setAuthenticated(false);
    setUserData(null);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      return alert('Por favor, preencha todos os campos.');
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      document.cookie = `token=${data.token}; path=/`;
      setAuthenticated(true);
      setUserData(data.user || null);
    } else {
      alert('Erro ao fazer registro');
    }
  };

  const handleSearchUserById = async () => {
    if (!searchId) return alert('Por favor, informe um ID para pesquisa.');
    
    setLoading(true);
    const res = await fetch(`/api/users?id=${searchId}`);
    const data = await res.json();
    if (data) {
      setUsers([data]);
    }
    setLoading(false);
  };

  const handleSearchUserByName = async () => {
    if (!searchName) return alert('Por favor, informe um nome para pesquisa.');
    
    setLoading(true);
    const res = await fetch(`/api/users/search?name=${searchName}`);
    const data = await res.json();
    if (data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleUpdateUser = async () => {
    if (!userId || !name || !email || !role) {
      return alert('Por favor, preencha todos os campos para atualização.');
    }

    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, name, email, role }),
    });
    const data = await res.json();
    alert(data.message);
  };

  const handleDeleteUser = async (id: number) => {
    if (!id) return;

    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    alert(data.message);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          {authenticated && userData ? (
            <div className={styles.loggedIn}>
              <span>Logado como: {userData.name}</span>
              <button className={styles.button} onClick={handleLogout}>Sair</button>
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleLogin} className={styles.button}>Entrar</button>

              <h2>Registro</h2>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleRegister} className={styles.button}>Registrar</button>
            </div>
          )}
        </div>
      </header>

      <div className={styles.crudContainer}>
        <h2>CRUD de Usuários</h2>

        <div>
          <h3>Buscar Usuário por ID</h3>
          <input
            type="text"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSearchUserById} className={styles.button}>Buscar</button>
          {loading ? <p>Carregando...</p> : (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <p>ID: {user.id}</p>
                  <p>Nome: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                  <button onClick={() => handleDeleteUser(user.id)} className={styles.deleteButton}>Deletar</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3>Atualizar Usuário</h3>
          <input
            type="text"
            placeholder="ID do usuário"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Novo Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Novo E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Novo Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleUpdateUser} className={styles.button}>Atualizar</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
