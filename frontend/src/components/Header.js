import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
function Header( { userEmail, onLogout } ) {

  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="header">
        <a className="header__logo" href="#"></a>
        <div>
          <div className="header__lang-links">
            <a onClick={() => changeLanguage("en")} className={`${i18n.language==='en' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="en">En</a>
            <a onClick={() => changeLanguage("ru")} className={`${i18n.language==='ru' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="ru">Ru</a>
          </div>
          <div className='header__container'>
            {pathname==='/sign-up' && (<Link to="/sign-in" className="header__link">{t("sign-in")}</Link>)}
            {pathname==='/sign-in' && (<Link to="/sign-up" className="header__link">{t("sign-up")}</Link>)}
            {pathname==='/' && (
            <>
              <p className="header__user-info">{userEmail}</p>
              <Link to="/sign-in" className="header__link" onClick={onLogout}>{t("logout")}</Link>
            </>)
            }
          </div>
        </div>
    </header>  );
}

export default Header;
