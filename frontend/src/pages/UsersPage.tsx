import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  id: number;
  name: string;
  email: string;
  milestone?: string;
  roles?: string[];
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [milestone, setMilestone] = useState('');

  const fetchUsers = async () => {
    const res = await api.get('users');
    setUsers(res.data.data || res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setName(user.name);
      setEmail(user.email);
      setPassword('');
      setMilestone(user.milestone || '');
    } else {
      setEditingUser(null);
      setName('');
      setEmail('');
      setPassword('');
      setMilestone('');
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const data: any = { name, email, milestone };
    if (password) data.password = password;
    if (editingUser) {
      await api.put(`users/${editingUser.id}`, data);
    } else {
      data.password = password || 'password123'; // password required for new user
      data.role = 'superAdmin'; // or 'user' if you want to support more roles
      await api.post('users', data);
    }
    setOpen(false);
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`users/${id}`);
    fetchUsers();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Users</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add User
      </Button>
      <Paper>
        <List>
          {users.map(user => (
            <ListItem key={user.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${user.name} (${user.email})`}
                secondary={
                  <>
                    <span>Milestone: {user.milestone || '-'}</span><br />
                    <span>Roles: {user.roles?.join(', ') || '-'}</span>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
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
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            disabled={!!editingUser}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required={!editingUser}
            helperText={editingUser ? 'Leave blank to keep current password' : ''}
          />
          <TextField
            label="Milestone"
            value={milestone}
            onChange={e => setMilestone(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
