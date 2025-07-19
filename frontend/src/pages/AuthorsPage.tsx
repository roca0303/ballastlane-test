import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

  const fetchAuthors = async () => {
    const res = await api.get('authors');
    setAuthors(res.data.data || res.data); // handle resource or plain array
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

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
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Author
      </Button>
      <Paper>
        <List>
          {authors.map(author => (
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
