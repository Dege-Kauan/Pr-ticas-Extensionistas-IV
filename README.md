# 📚 Biblioteca Online

## **Descrição do Projeto**
A **Biblioteca Online** é uma aplicação web desenvolvida para gerenciar o empréstimo e a disponibilidade de livros. O projeto é responsivo e oferece uma interface intuitiva para login, cadastro de usuários e livros, além de permitir a busca e filtro de livros por estado e cidade.

O sistema foi desenvolvido como parte de um projeto acadêmico, atendendo aos requisitos de:
1. Aplicação web responsiva;
2. Aplicação mobile (via Progressive Web App - PWA);
3. API hospedada na nuvem;
4. Infraestrutura de nuvem configurada.

---

## **Funcionalidades**

### **1. Gerenciamento de Usuários**
- Login e cadastro de usuários;
- Campos obrigatórios: e-mail, senha, estado e cidade;
- Validação de senha e tratamento de erros.

### **2. Gerenciamento de Livros**
- Cadastro de novos livros;
- Consulta de livros disponíveis e reservados;
- Filtros para busca por estado e cidade;
- Alteração de status (disponível ou reservado).

### **3. Progressive Web App (PWA)**
- Aplicação empacotada como PWA para ser instalada em dispositivos mobile e desktops;
- Compatível com navegadores modernos.

### **4. API**
- API RESTful para gerenciamento dos dados de usuários e livros;
- Conexão ao banco de dados SQLite;
- Rotas disponíveis:
  - `GET /books`: Retorna todos os livros cadastrados;
  - `POST /books`: Adiciona um novo livro.

### **5. Infraestrutura na Nuvem**
- API hospedada na plataforma Railway, garantindo alta disponibilidade.

---

## **Tecnologias Utilizadas**

### **Frontend**
- **Framework**: React.js (com Vite)
- **Linguagem**: JavaScript
- **Estilo**: CSS personalizado
- **Funcionalidade PWA**: Configuração de `manifest.json` e `service worker`

### **Backend**
- **Framework**: Express.js
- **Banco de Dados**: SQLite
- **Gerenciamento de dependências**: NPM

### **Infraestrutura**
- **Hospedagem do Backend**: Railway
- **Hospedagem do Frontend**: Localmente com Vite (para desenvolvimento)

---

## **Instalação e Configuração**

### **Pré-requisitos**
- Node.js instalado (versão 16 ou superior);
- Gerenciador de pacotes NPM;
- Conexão com a internet para dependências e APIs.

### **Passos para rodar o projeto**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd SEU_REPOSITORIO
