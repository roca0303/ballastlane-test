import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import {
  Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter books based on search term
  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) {
      return books;
    }
    
    const term = searchTerm.toLowerCase();
    return books.filter(book => {
      const authorName = authors.find(a => a.id === book.author_id)?.name || '';
      return (
        book.title.toLowerCase().includes(term) ||
        (book.description && book.description.toLowerCase().includes(term)) ||
        book.genre.toLowerCase().includes(term) ||
        authorName.toLowerCase().includes(term) ||
        book.published_year.toString().includes(term)
      );
    });
  }, [books, authors, searchTerm]);

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
      
      {/* Search and Add Book Section */}
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Book
        </Button>
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" mb={1}>
        Showing {filteredBooks.length} of {books.length} books
      </Typography>

      <Paper>
        <List>
          {filteredBooks.map(book => (
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
        {filteredBooks.length === 0 && (
          <Box p={3} textAlign="center">
            <Typography color="text.secondary">
              {searchTerm ? 'No books found matching your search.' : 'No books available.'}
            </Typography>
          </Box>
        )}
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
