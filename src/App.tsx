import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import styles from './styles/Commons.module.css'
import {socket} from "./socket/socket";

export const App = () => {
    socket.disconnect();
    const [values, setValues] = useState({name: "", room: ""});
    const navigate = useNavigate();

    const joinRoomHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, room} = values;
        socket.emit('join', {name});
        navigate(`/chat?name=${name}&room=${room}`);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setValues(prevValues => ({...prevValues, [name]: value}));
    };


    return (
        <div className={styles.container}>
            <form onSubmit={joinRoomHandler} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        className={styles.input}
                        placeholder="Enter your name"
                        required
                        value={values.name}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="room" className={styles.label}>
                        Room:
                    </label>
                    <input
                        type="text"
                        name="room"
                        className={styles.input}
                        required
                        placeholder="Enter room name"
                        value={values.room}
                        onChange={onChangeHandler}
                    />
                    <button type="submit" className={styles.button}>
                        Join
                    </button>
                </div>
            </form>
        </div>
    );
};
