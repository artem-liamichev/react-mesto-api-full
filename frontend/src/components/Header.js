import React from 'react';
import { Link, useLocation} from 'react-router-dom';

function Header( { userEmail, onLogout } ) {

  const { pathname } = useLocation()

  return (
    <header className="header">
        <a className="header__logo" href="#"></a>
        {pathname==='/sign-up' && (<Link to="/sign-in" className="header__link">Войти</Link>)}
        {pathname==='/sign-in' && (<Link to="/sign-up" className="header__link">Зарегистрироваться</Link>)}
        {pathname==='/' && (
        <>
          <p className="header__user-info">{userEmail}</p>
          <Link to="/sign-in" className="header__link" onClick={onLogout}>Выйти</Link>
        </>)
        }
    </header>  );
}

export default Header;
