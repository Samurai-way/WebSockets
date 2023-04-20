import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// @ts-ignore
import styles from '../styles/Chat.module.css';
import {socket} from "../socket/socket";

interface Message {
    username: string;
    message: string;
}

export const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = new URLSearchParams(location.search).get('name') ?? 'Anonymous';

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [numClients, setNumClients] = useState<number>(0);

    useEffect(() => {
        socket.connect();
        const handleMessage = (message: Message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };

        const handleNumClients = (num: number) => {
            setNumClients(num);
        };

        socket.on('message', handleMessage);
        socket.on('numClients', handleNumClients);
        socket.emit('joinRoom', username);

        return () => {
            socket.off('message', handleMessage);
            socket.off('numClients', handleNumClients);
        };
    }, [socket, username]);

    const sendMessage = () => {
        socket.emit('message', {username, message: inputValue});
        setInputValue('');
    };

    const handleExitRoom = () => {
        socket.disconnect();
        navigate('/');
    };

    return (
        <div className={styles.chatContainer}>
            <header className={styles.chatHeader}>
                <h1 className={styles.chatName}>Chat ({numClients} users)</h1>
                <div className={styles.userInfo}>
                    <span className={styles.username}>Username: {username}</span>
                    <button className={styles.exitButton} onClick={handleExitRoom}>
                        Exit Room
                    </button>
                </div>
            </header>
            <div className={styles.chatBox}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            message.username === username ? styles.messageSent : styles.messageReceived
                        }`}
                    >
                        <div className={styles.messageUser}>{message.username}</div>
                        <div className={styles.messageText}>{message.message}</div>
                    </div>
                ))}
            </div>
            <form className={styles.messageForm} onSubmit={e => e.preventDefault()}>
                <div className={styles.inputBox}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button className={styles.sendButton} onClick={sendMessage} disabled={!inputValue}>
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};
