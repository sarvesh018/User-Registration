import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', {
                name, password, email, phone, profession
            });
            setMessage('Registration successful');
            navigate('/login');
        } catch (err) {
            setMessage('Error registering user');
        }
    };

    return (
        <div className='flex items-center justify-center h-screen px-20 ml-10 lg:ml-[35rem]'>
        <div className="container flex flex-col gap-5 bg-[#ebd769] rounded-md px-10 py-4">
            <h2 className='text-2xl font-sans font-bold bg-black text-white py-2 flex items-center justify-center'>Register</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone No</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="profession">
                    <Form.Label>Profession</Form.Label>
                    <Form.Control
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button className='my-4' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
        </div>
    );
};

export default Register;
