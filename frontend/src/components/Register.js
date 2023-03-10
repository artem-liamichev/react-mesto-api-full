import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Register({ onRegister }) {

    const { t } = useTranslation();

    const [registerData, setRegisterData] = useState ({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(registerData)
    }

  
    return (
    <article>
        <div className="login__container">
        <form onSubmit={handleSubmit} className="login__form" noValidate>
            <h3 className="login__title">{t("registration")}</h3>
            <div className="field-container">
            <input onChange={handleChange} value={registerData.email} className="login__input" name="email" type="email" placeholder="Email" required minLength="2" maxLength="30" />
            </div>
            <div className="field-container">
            <input onChange={handleChange} value={registerData.password} className="login__input" name="password" type="password" placeholder={t("password")} required />
            </div>
            <button className="login__save" type="submit">{t("sign-up")}</button>
            <p className="login__text">{t("already-registered")} <Link to="/sign-in" className="login__link">{t("sign-in")}</Link></p>
        </form>
        </div>
    </article>
)}

export default Register;
