import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

function Login({ onLogin }) {

    const { t } = useTranslation();

    const emailInputRef = React.useRef();
    const passwordInputRef = React.useRef();

    function handleEnterTestUser() {
        emailInputRef.current.value = 'test@test.cl';
        passwordInputRef.current.value = 'test';
    }

    const [loginData, setLoginData] = useState ({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            return
        }
        onLogin(loginData)
    }
  
    return (
    <article>
        <div className="login__container">
        <form onSubmit={handleSubmit} className="login__form" noValidate>
            <h3 className="login__title">{t("login")}</h3>
            <div className="field-container">
            <input ref={emailInputRef} onChange={handleChange} autoComplete="user-name" value={loginData.email} className="login__input" name="email" type="email" placeholder="Email" required minLength="2" maxLength="30" />
            </div>
            <div className="field-container">
            <input ref={passwordInputRef} onChange={handleChange} autoComplete="current-password" value={loginData.password} className="login__input" name="password" type="password" placeholder={t("password")} required />
            </div>
            <button className="login__save" type="submit">{t("sign-in")}</button>
            <p className="login__subline"><a onClick={handleEnterTestUser} >Войти в тестовый аккаунт</a></p>
        </form>
        </div>
    </article>
)}

export default Login;
