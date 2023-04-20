import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

export const App = () => {
    const [values, setValues] = useState({name: "", room: ""});
    const navigate = useNavigate();

    const joinRoomHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, room} = values;
        navigate(`/chat?name=${name}&room=${room}`);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setValues((prevValues) => ({...prevValues, [name]: value}));
    };

    return (
        <div>
            <form onSubmit={joinRoomHandler}>
                <div>
                    <input
                        type="text"
                        placeholder="name"
                        value={values.name}
                        autoComplete="off"
                        required
                        onChange={onChangeHandler}
                        name="name"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="room"
                        value={values["room"]}
                        onChange={onChangeHandler}
                        name="room"
                    />
                    <button type="submit">Join</button>
                </div>
            </form>
        </div>
    );
};
