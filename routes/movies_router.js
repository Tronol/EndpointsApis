const express = require('express');
const router = express.Router();

let movies = [
    { id: 1, title: 'Tron', year: 2010, category: 'Sci-fi' },
    { id: 2, title: 'Matrix', year: 1999, category: 'Sci-fi' },
    { id: 3, title: 'Titanic', year: 1997, category: 'Romance' },
    { id: 4, title: 'Avatar', year: 2009, category: 'Sci-fi' },
    { id: 5, title: 'Inception', year: 2010, category: 'Sci-fi' }
];

// Get all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// Get movie by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id == id); // Usando == para comparación flexible
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Add a new movie
router.post('/', (req, res) => {
    const { title, year, category } = req.body;

    // Validar campos requeridos
    if (!title || !year || !category) {
        return res.status(400).json({ message: 'Title, year and category are required' });
    }

    const newMovie = {
        id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
        title,
        year: parseInt(year),
        category
    };
    movies.push(newMovie);
    res.status(201).json({
        message: 'Movie added successfully',
        data: newMovie
    });
});

// Update a movie by ID (PUT - actualización completa)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, category } = req.body;

    // Validar campos requeridos
    if (!title || !year || !category) {
        return res.status(400).json({ message: 'Title, year and category are required' });
    }

    const movieIndex = movies.findIndex(m => m.id == id);
    if (movieIndex !== -1) {
        movies[movieIndex] = {
            id: parseInt(id),
            title,
            year: parseInt(year),
            category
        };
        res.json({
            message: 'Movie updated successfully',
            data: movies[movieIndex]
        });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Patch a movie by ID (PATCH - actualización parcial)
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, category } = req.body;
    const movie = movies.find(m => m.id == id);
    if (movie) {
        if (title) movie.title = title;
        if (year) movie.year = parseInt(year);
        if (category) movie.category = category;
        res.json({
            message: 'Movie patched successfully',
            data: movie
        });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// DELETE - Eliminar película por ID (CORREGIDO)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id == id);
    if (movieIndex !== -1) {
        const deletedMovie = movies.splice(movieIndex, 1)[0];
        res.json({
            message: 'Movie deleted successfully',
            data: deletedMovie
        });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

module.exports = router;
