import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/home');
        } catch (err) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className='flex items-center justify-center ml-10 lg:ml-[38rem]'>
        <div className="container flex flex-col gap-5 bg-[#ebd769] rounded-md px-10 py-4">
            <h2 className='text-2xl font-sans font-bold bg-black text-white py-2 flex items-center justify-center'>Login</h2>
            {message && <Alert variant="danger">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className='gap-5 px-4 py-4'>
                    <Button className='mx-2' variant="primary" type="submit">
                        Login
                    </Button>
                    <Button className='mx-2'>
                        <Link className='text-white' to='/register'>
                            Register
                        </Link>
                    </Button>
                </div>
            </Form>
        </div>
        </div>
    );
};

export default Login;
