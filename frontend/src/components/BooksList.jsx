import React, { useEffect, useState } from "react";

const BooksList = () => {
  const [books, setBooks] = useState([]); // Estado para armazenar os livros
  const [error, setError] = useState(null); // Estado para armazenar erros

  // Função para buscar os dados da API
  useEffect(() => {
    fetch("http://localhost:3001/books") // URL do backend
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="books-container">
      <h2>Livros Disponíveis</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe erros, se houver */}
      <ul>
        {books.map((book) => (
          <li key={book.id} className={book.availability === "Disponível" ? "available" : "unavailable"}>
            <strong>{book.title}</strong> - {book.author} ({book.genre}) <br />
            Estado: {book.state}, Cidade: {book.city} <br />
            <span className="status">{book.availability}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
