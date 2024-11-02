const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '12345', // replace with your MySQL password
    database: 'web_lab5' // replace with your database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to get all planes
app.get('/movies', (req, res) => {
    connection.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/movies/:movie_id', (req, res) => {
    const movieId = req.params.id;

    const query = 'SELECT * FROM movies WHERE id = ?';
    connection.query(query, [movieId], (err, results) => {
        if (err) {
            console.error('Error fetching movie:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).send('Movie not found');
        }

        res.json(results[0]);
    });
});

app.post('/movies', (req, res) => {
    const { title, duration, reviews } = req.body;
    const newMovie = { title, duration, reviews };

    const query = 'INSERT INTO movies (title, duration, reviews) VALUES (?, ?, ?)';
    connection.query(query, [title, duration, reviews], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error', error: err.sqlMessage });
        }
        res.status(201).send({ message: 'Movie added successfully!', plane: newPlane });
    });
});

app.delete('/movies/:movie_id', (req, res) => {
    const movieId = req.params.id;
    console.log(`Received request to delete plane with ID: ${movieId}`);

    const deleteQuery = 'DELETE FROM movies WHERE movie_id = ?';
    connection.query(deleteQuery, [movieId], (err, result) => {
        if (err) {
            console.error('Error deleting movie:', err);
            return res.status(500).send('Error deleting movie');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Movie not found');
        }

        res.status(200).send(`Movie with ID ${movieId} deleted successfully`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

app.patch('/movies/:movie_id', (req, res) => {
  const movieId = req.params.id;
  const { title, duration, reviews } = req.body;


  const updateValues = {};
  if (title) updateValues.title = title;
  if (duration) updateValues.duration = duration;
  if (reviews) updateValues.reviews = reviews;

  const query = 'UPDATE movies SET ? WHERE movie_id = ?';
  
  connection.query(query, [updateValues, moId], (err, result) => {
      if (err) {
          console.error('Error updating plane:', err);
          return res.status(500).send('Internal Server Error');
      }

      if (result.affectedRows === 0) {
          return res.status(404).send('Plane not found');
      }

      res.status(200).send(`Plane with ID ${planeId} updated successfully`);
  });
});