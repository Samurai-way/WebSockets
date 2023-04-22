import { useState } from "react";
// @ts-ignore
import styles from "./Login.module.css";
import {useNavigate} from "react-router-dom";

interface LoginFormValues {
    loginOrEmail: string;
    password: string;
}

interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
}

export const Login: React.FC = () => {
    const [formValues, setFormValues] = useState<LoginFormValues>({
        loginOrEmail: "",
        password: "",
    });
    const navigate = useNavigate()
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("https://instagramapi-production.up.railway.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });
            const data: LoginResponseData = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            navigate('/')

        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Login or Email:
                    <input
                        type="text"
                        name="loginOrEmail"
                        value={formValues.loginOrEmail}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};


