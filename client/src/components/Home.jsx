import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form, Alert } from 'react-bootstrap';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(res.data);
            } catch (err) {
                setMessage('Error fetching users');
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            setMessage('Error deleting user');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/user/${editUser._id}`, editUser, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEditUser(null);
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(res.data);
        } catch (err) {
            setMessage('Error updating user');
        }
    };

    return (
        <div className="container">
            <h2 className='font-sans font-extrabold px-8 py-4 flex items-center justify-center'>Registered Users</h2>
            {message && <Alert variant="danger">{message}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Profession</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.profession}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {editUser && (
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editUser.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            value={editUser.phone}
                            onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="profession">
                        <Form.Label>Profession</Form.Label>
                        <Form.Control
                            type="text"
                            value={editUser.profession}
                            onChange={(e) => setEditUser({ ...editUser, profession: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setEditUser(null)}>
                        Cancel
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default Home;

