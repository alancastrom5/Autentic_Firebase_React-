# Sistema de Autenticação com Firebase e React  

Um sistema de login seguro com validação de domínio de e-mail, autenticação por Google e gerenciamento de sessão.  

---

## 🚀 Funcionalidades  

✅ **Autenticação por e-mail/senha**  
- Login e cadastro com validação de formato de e-mail  
- Restrição por domínio (`@seu_diminio.com.br`) (OBS: Pode ser editado para quer email.)

🔐 **Autenticação social**  
- Login via Google (com mesma validação de domínio)  

⏳ **Sessão controlada**  
- Expira após 15 minutos  
- Redirecionamento automático para `/users`  

🔄 **Interface dinâmica**  
- Alternância entre telas de login/cadastro  
- Mensagens de erro claras  

---

## 🛠️ Tecnologias  

- **Frontend**: React, React Router  
- **Autenticação**: Firebase (Email/Google)  
- **Estilo**: CSS modular  

---

## ⚙️ Configuração  

1. **Preparar ambiente**  
   ```bash
   git clone [https://github.com/alancastrom5/Autentic_Firebase_React-.git]
   cd [Autentic_Firebase_React-]
   npm install
    ```

2. **Configurar Firebase**  
   ```bash
    Adicione suas credenciais em firebaseConfig.js
    Ative no Console do Firebase:
    Autenticação por Email/Senha
    Autenticação por Google

3. **Executar**
   ```bash
    npm start
    ```
📌 **Como Usar**  
---
 🔑 Login Tradicional
1. Insira um e-mail @seu_diminio.com.br

2. Digite sua senha

3. Clique em "Entrar"

---

🖼️ **Login com Google**  
---

- Clique no botão "Entrar com Google"
- CApenas contas com o domínio permitido terão acesso

---

✏️ **Cadastro**  
---

1. Clique em "Não tem uma conta? Cadastre-se."
2. Preencha com e-mail válido do domínio
3. Defina uma senha segura

---

⏱️ **Comportamento da Sessão**  
---

- Válida por 15 minutos
- Ao recarregar:
  - Se dentro do prazo → Permanece logado
  -  Se expirado → Logout automático
---

📄 **Estrutura de Arquivos**  
---
```bash
src/
├── App.jsx            # Rotas principais
├── index.js           # Renderização raiz
├── Login.jsx          # Lógica de autenticação
├── firebaseConfig.js  # Credenciais do Firebase
└── css/               # Estilos
---
```
