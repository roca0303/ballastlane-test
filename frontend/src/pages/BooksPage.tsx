import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Author {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  description?: string;
  author_id: number;
  author?: Author;
  user_id: number;
  published_year: number;
  genre: string;
  created_at: string;
  updated_at: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState<number | ''>('');
  const [publishedYear, setPublishedYear] = useState<number | ''>('');
  const [genre, setGenre] = useState('');

  const fetchBooks = async () => {
    const res = await api.get('books');
    setBooks(res.data.data || res.data);
  };

  const fetchAuthors = async () => {
    const res = await api.get('authors');
    setAuthors(res.data.data || res.data);
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const handleOpen = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setTitle(book.title);
      setDescription(book.description || '');
      setAuthorId(book.author_id);
      setPublishedYear(book.published_year);
      setGenre(book.genre);
    } else {
      setEditingBook(null);
      setTitle('');
      setDescription('');
      setAuthorId('');
      setPublishedYear('');
      setGenre('');
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const data = {
      title,
      description,
      author_id: authorId,
      published_year: publishedYear,
      genre,
    };
    if (editingBook) {
      await api.put(`books/${editingBook.id}`, data);
    } else {
      await api.post('books', data);
    }
    setOpen(false);
    fetchBooks();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`books/${id}`);
    fetchBooks();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Books</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Book
      </Button>
      <Paper>
        <List>
          {books.map(book => (
            <ListItem key={book.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${book.title} (${book.published_year})`}
                secondary={
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {`Author: ${authors.find(a => a.id === book.author_id)?.name || 'Unknown'}\nGenre: ${book.genre}\n${book.description}`}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingBook ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Author</InputLabel>
            <Select
              value={authorId}
              onChange={e => setAuthorId(Number(e.target.value))}
              label="Author"
            >
              {authors.map(author => (
                <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Published Year"
            type="number"
            value={publishedYear}
            onChange={e => setPublishedYear(Number(e.target.value))}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingBook ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BooksPage;
