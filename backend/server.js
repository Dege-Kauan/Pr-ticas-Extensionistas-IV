const express = require('express');
const cors = require('cors');
const db = require('./database'); // Certifique-se de que este arquivo está correto

const app = express();
const PORT = process.env.PORT || 3001; // Porta configurável pela variável de ambiente

// Middleware para processar JSON e habilitar CORS
app.use(express.json());
app.use(cors());

// Criar a tabela 'books' se ela não existir
db.prepare(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        availability TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT NOT NULL
    )
`).run();

// Insere livros no banco de dados se estiver vazio
const bookCount = db.prepare('SELECT COUNT(*) AS count FROM books').get().count;

if (bookCount === 0) {
    db.prepare(`
        INSERT INTO books (title, author, genre, availability, state, city)
        VALUES
        ('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 'Disponível', 'Santa Catarina', 'Chapecó'),
        ('1984', 'George Orwell', 'Ficção Científica', 'Indisponível', 'São Paulo', 'São Paulo'),
        ('Dom Casmurro', 'Machado de Assis', 'Romance', 'Disponível', 'Rio de Janeiro', 'Rio de Janeiro')
    `).run();
}

// Rota para buscar todos os livros
app.get('/books', (req, res) => {
    try {
        const books = db.prepare('SELECT * FROM books').all();
        res.json(books);
    } catch (error) {
        console.error('Erro ao buscar livros:', error.message);
        res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
