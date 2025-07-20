import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

interface Author {
  id: number;
  name: string;
  bio?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAuthors = async () => {
    const res = await api.get('authors');
    setAuthors(res.data.data || res.data); // handle resource or plain array
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Filter authors based on search term
  const filteredAuthors = useMemo(() => {
    if (!searchTerm.trim()) {
      return authors;
    }
    
    const term = searchTerm.toLowerCase();
    return authors.filter(author => 
      author.name.toLowerCase().includes(term) ||
      (author.bio && author.bio.toLowerCase().includes(term))
    );
  }, [authors, searchTerm]);

  const handleOpen = (author?: Author) => {
    if (author) {
      setEditingAuthor(author);
      setName(author.name);
      setBio(author.bio || '');
    } else {
      setEditingAuthor(null);
      setName('');
      setBio('');
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (editingAuthor) {
      await api.put(`authors/${editingAuthor.id}`, { name, bio });
    } else {
      await api.post('authors', { name, bio });
    }
    setOpen(false);
    fetchAuthors();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`authors/${id}`);
    fetchAuthors();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Authors</Typography>
      
      {/* Search and Add Author Section */}
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label="Search authors..."
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
          Add Author
        </Button>
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" mb={1}>
        Showing {filteredAuthors.length} of {authors.length} authors
      </Typography>

      <Paper>
        <List>
          {filteredAuthors.map(author => (
            <ListItem key={author.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(author)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(author.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={author.name}
                secondary={author.bio}
              />
            </ListItem>
          ))}
        </List>
        {filteredAuthors.length === 0 && (
          <Box p={3} textAlign="center">
            <Typography color="text.secondary">
              {searchTerm ? 'No authors found matching your search.' : 'No authors available.'}
            </Typography>
          </Box>
        )}
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingAuthor ? 'Edit Author' : 'Add Author'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingAuthor ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthorsPage;
