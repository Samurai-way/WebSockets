import React, { useState } from 'react';
// @ts-ignore
import styles from './Registration.module.css';

export const Registration = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            login,
            password,
            email,
        };

        const response = await fetch('https://instagramapi-production.up.railway.app/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
};
