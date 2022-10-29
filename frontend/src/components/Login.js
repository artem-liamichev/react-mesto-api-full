import React, { useState } from "react";
function Login({ onLogin }) {

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
            <h3 className="login__title">Вход</h3>
            <div className="field-container">
            <input onChange={handleChange} autoComplete="user-name" value={loginData.email} className="login__input" name="email" type="email" placeholder="Email" required minLength="2" maxLength="30" />
            </div>
            <div className="field-container">
            <input onChange={handleChange} autoComplete="current-password" value={loginData.password} className="login__input" name="password" type="password" placeholder="Пароль" required />
            </div>
            <button className="login__save" type="submit">Войти</button>
        </form>
        </div>
    </article>
)}

export default Login;
