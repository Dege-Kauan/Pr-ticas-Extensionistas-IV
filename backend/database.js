const sqlite3 = require('better-sqlite3');
const db = new sqlite3('./database.sqlite'); // Caminho do arquivo SQLite

// Função para buscar todos os livros
function getBooks() {
    try {
        const books = db.prepare('SELECT * FROM books').all(); // Busca todos os registros da tabela 'books'
        return books;
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error.message);
        throw error; // Lança o erro para o tratamento no server.js
    }
}

// Exporta o banco e a função
module.exports = db;
module.exports.getBooks = getBooks;
