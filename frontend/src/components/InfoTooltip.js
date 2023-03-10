import closeButton from '../images/close-button.svg';

import imageSuccess from '../images/register-succes.svg';
import imageFail from '../images/register-fail.svg';
import { useTranslation } from 'react-i18next';

function InfoTooltip({ isRegisterFailPopupOpen, isRegisterSuccessPopupOpen, onClose }) {
    const { t } = useTranslation();
  
    return (
        <article
        className={`popup ${isRegisterSuccessPopupOpen||isRegisterFailPopupOpen ? "popup_opened" : ""}`}>
        <div className="popup__container tooltip__container">
            <button className="popup__close-button" type="button" onClick = {onClose}>
                <img className="popup__image-close" src={closeButton} alt="закрыть попап"/>
            </button>
            {isRegisterSuccessPopupOpen && (<img className="tooltip__image" src={imageSuccess} alt="успешная регистрация"/>)}
            {isRegisterFailPopupOpen && (<img className="tooltip__image" src={imageFail} alt="ошибка регистрации"/>)}
            {isRegisterSuccessPopupOpen && (<h2 className="tooltip__title">{t("you-have-successfully-signed-up")}</h2>)}
            {isRegisterFailPopupOpen && (<h2 className="tooltip__title">{t("sorry-something-went-wrong-try-again")}</h2>)}
        </div>
    </article>
)}

export default InfoTooltip;
