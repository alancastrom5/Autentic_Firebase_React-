import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../src/css/users.css";

const Users = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const expireTime = localStorage.getItem("expireTime");

    // Verifica se a UID existe e se o tempo de expiração ainda não passou
    if (uid && expireTime && new Date().getTime() < expireTime) {
      // Se o tempo de expiração não passou, recupera o usuário e autentica
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.uid === uid) {
        setUser(currentUser);
        setLoading(false);
      } else {
        navigate("/"); // Redireciona se o usuário não estiver autenticado
      }
    } else {
      // Caso o tempo tenha expirado ou o UID não esteja presente
      localStorage.removeItem("uid");
      localStorage.removeItem("expireTime");
      navigate("/"); // Redireciona para o login
    }
  }, [auth, navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("uid");
      localStorage.removeItem("expireTime");
      navigate("/"); // Redireciona para o login após o logout
    });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="portal-container">
      <nav className="navbar">
        <div className="user-info">
          <img
            src={user?.photoURL || "/avatar.png"}
            alt="Foto do usuário"
            className="user-avatar"
            onError={(e) => { e.target.src = "/avatar.png"; }}
          />
          <span className="user-name">{user?.displayName || user?.email}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </nav>

      <div className="user-details">
        <h2>Bem-vindo ao Portal</h2>
        <div>{user?.displayName}</div>
      </div>
    </div>
  );
};

export default Users;
