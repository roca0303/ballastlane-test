import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import {
  Box, Button, Typography, Paper, List, ListItem, ListItemText, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users;
    }
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      (user.milestone && user.milestone.toLowerCase().includes(term))
    );
  }, [users, searchTerm]);

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
      
      {/* Search and Add User Section */}
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label="Search users..."
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
          Add User
        </Button>
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" mb={1}>
        Showing {filteredUsers.length} of {users.length} users
      </Typography>

      <Paper>
        <List>
          {filteredUsers.map(user => (
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
        {filteredUsers.length === 0 && (
          <Box p={3} textAlign="center">
            <Typography color="text.secondary">
              {searchTerm ? 'No users found matching your search.' : 'No users available.'}
            </Typography>
          </Box>
        )}
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
