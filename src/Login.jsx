import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/services/firebaseConfig"; 

import "../src/css/app.css";
import "../src/css/login.css";

// Inicializa o Firebase apenas uma vez
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const allowedDomain = "@seu_diminio.com.br"; // linha usada para limitar users apenas emails com dominio especifico tem acesso
  
  // Regex para validar o formato do e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email.endsWith(allowedDomain)) {
        // Checa se a sessão ainda está válida (15 minutos)
        const expireTime = localStorage.getItem("expireTime");
        if (expireTime && new Date().getTime() < expireTime) {
          navigate("/users");
        } else {
          signOut(auth);
          localStorage.removeItem("expireTime");
        }
      }
    });
    return unsubscribe;
  }, [navigate]);

  const isValidEmail = (email) => {
    if (!emailRegex.test(email)) {
      setError("E-mail inválido. Verifique o formato.");
      return false;
    }
    if (!email.endsWith(allowedDomain)) {
      setError(`Somente e-mails do domínio ${allowedDomain} podem fazer login.`);
      return false;
    }
    return true;
  };

  const handleAuth = async (method) => {
    setError(null);
    if (!isValidEmail(email)) return; // Verificação do domínio antes de continuar
    
    try {
      let userCredential;
      if (method === "register") {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      // Checa se o e-mail do usuário tem o domínio permitido
      if (!userCredential.user.email.endsWith(allowedDomain)) {
        setError(`Somente e-mails do domínio ${allowedDomain} podem fazer login.`);
        await signOut(auth); // Desconecta o usuário não autorizado
        return;
      }

      // Armazena o UID e a expiração da sessão por 15 minutos
      const expireTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutos
      localStorage.setItem("uid", userCredential.user.uid);
      localStorage.setItem("expireTime", expireTime);

      navigate("/users"); // Só navega se for válido
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // Verifica o domínio do e-mail após o login com o Google
      if (!isValidEmail(user.email)) {
        await signOut(auth); // Desconecta usuário não autorizado
        setError(`Somente e-mails do domínio ${allowedDomain} podem fazer login.`);
        return;
      }

      // Armazenando UID e tempo de expiração (15 minutos)
      const expireTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutos
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("expireTime", expireTime);

      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h2>{isRegistering ? "Cadastro" : "Login"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleAuth(isRegistering ? "register" : "login")}>
          {isRegistering ? "Cadastrar" : "Entrar"}
        </button>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <img src="/icons8-google-48.png" alt="Google" className="google-icon" />
          Entrar com Google
        </button>
        <p onClick={() => { setIsRegistering(!isRegistering); setError(null); }}>
          {isRegistering ? "Já tem uma conta? Faça login." : "Não tem uma conta? Cadastre-se."}
        </p>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );  
};

export default Login;
