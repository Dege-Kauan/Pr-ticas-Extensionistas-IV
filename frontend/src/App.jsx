import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ state: '', city: '' });
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    availability: 'Disponível',
    state: '',
    city: '',
  });
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [addBookError, setAddBookError] = useState('');

  // Fallback local caso a API não funcione
  const localBooks = [
    { id: 1, title: 'O Senhor dos Anéis - J.R.R. Tolkien', status: 'Disponível', state: 'Santa Catarina', city: 'Chapecó' },
    { id: 2, title: '1984 - George Orwell', status: 'Indisponível', state: 'São Paulo', city: 'São Paulo' },
    { id: 3, title: 'Dom Casmurro - Machado de Assis', status: 'Disponível', state: 'Rio de Janeiro', city: 'Rio de Janeiro' },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/books');
        if (!response.ok) throw new Error('API indisponível');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar livros da API:', error.message);
        setBooks(localBooks); // Fallback para livros locais
      }
    };
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.genre || !newBook.state || !newBook.city) {
      setAddBookError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const message = await response.json();
        alert(message.message);
        setBooks([...books, { ...newBook, id: books.length + 1 }]);
        setNewBook({ title: '', author: '', genre: '', availability: 'Disponível', state: '', city: '' });
        setShowAddBookForm(false);
        setAddBookError('');
      } else {
        const errorData = await response.json();
        setAddBookError(errorData.error || 'Erro ao adicionar o livro.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error.message);
      setAddBookError('Erro ao conectar com o servidor.');
    }
  };

  const handleLogin = () => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setError('');
    } else {
      setError('Email ou senha inválidos!');
    }
  };

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !state || !city) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (users.find((user) => user.email === email)) {
      setError('Email já cadastrado.');
      return;
    }

    setUsers([...users, { email, password, state, city }]);
    setIsRegistering(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setState('');
    setCity('');
  };

  const handleBookClick = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              status: book.status === 'Disponível' ? 'Reservado' : 'Disponível',
            }
          : book
      )
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const filteredBooks = books.filter((book) => {
    return (
      (filters.state === '' || book.state === filters.state) &&
      (filters.city === '' || book.city === filters.city)
    );
  });

  return (
    <div>
      {!isLoggedIn ? (
        <div id="login-page">
          <div id="login-form">
            {!isRegistering ? (
              <>
                <h2>Login</h2>
                <input
                  type="text"
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleLogin}>Entrar</button>
                <p>
                  Não tem uma conta?{' '}
                  <button onClick={() => setIsRegistering(true)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Cadastre-se
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2>Cadastro</h2>
                <input
                  type="text"
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
                <input
                  type="password"
                  placeholder="Confirme sua Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleRegister}>Cadastrar</button>
                <p>
                  Já tem uma conta?{' '}
                  <button onClick={() => setIsRegistering(false)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Voltar para Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <header id="header">
            <img id="logo" src={logo} alt="Logo da Biblioteca" />
            <h1>Bem-vindo ao Sistema de Gerenciamento de Biblioteca Online</h1>
          </header>
          <main id="content">
            <h2>Filtrar Livros</h2>
            <div id="filters">
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              >
                <option value="">Selecione o estado</option>
                {[...new Set(books.map((book) => book.state))].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                disabled={!filters.state}
              >
                <option value="">Selecione a cidade</option>
                {[...new Set(books.filter((book) => book.state === filters.state).map((book) => book.city))].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <h2>Livros Disponíveis</h2>
            <div id="books-list">
              <ul>
                {filteredBooks.map((book) => (
                  <li key={book.id} onClick={() => handleBookClick(book.id)}>
                    <span>{book.title}</span>
                    <span className={`status ${book.status === 'Disponível' ? 'available' : 'reserved'}`}>
                      {book.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setShowAddBookForm(!showAddBookForm)}>
              {showAddBookForm ? 'Cancelar' : 'Adicionar Livro'}
            </button>
            {showAddBookForm && (
              <div id="add-book-form">
                <h2>Adicionar Livro</h2>
                <input
                  type="text"
                  placeholder="Título"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Autor"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Gênero"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={newBook.state}
                  onChange={(e) => setNewBook({ ...newBook, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={newBook.city}
                  onChange={(e) => setNewBook({ ...newBook, city: e.target.value })}
                />
                {addBookError && <p style={{ color: 'red' }}>{addBookError}</p>}
                <button onClick={handleAddBook}>Salvar Livro</button>
              </div>
            )}
          </main>
          <footer id="footer">
            <p>© 2024 Biblioteca Online. Todos os direitos reservados.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
