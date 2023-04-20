import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// @ts-ignore
import styles from './../styles/Chat.module.css';

const socket = io('http://localhost:3000');

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', inputValue);
        setInputValue('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>Chat</div>
            <div className={styles.chatBox}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            index % 2 === 0 ? styles.messageSelf : styles.messageOther
                        }`}
                    >
                        {message}
                    </div>
                ))}
            </div>
            <div className={styles.inputBox}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className={styles.sendButton} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};
