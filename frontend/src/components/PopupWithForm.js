import closeButton from '../images/close-button.svg';


function PopupWithForm({name, popupTitle, buttonTitle, children, isOpen, onClose, onSubmit}) {
  
    return (
    <article 
        className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
        <button className="popup__close-button" type="button"
            onClick = {onClose}>
            <img className="popup__image-close" src={closeButton} alt="закрыть попап"/>
        </button>
        <form className="popup__form popup__form_profile" name={`${name}`} noValidate
        onSubmit={onSubmit}>
            <h3 className="popup__title">{popupTitle}</h3>
            {children}

            <button className="popup__save" type="submit">{buttonTitle}</button>
        </form>
        </div>
    </article>
)}

export default PopupWithForm;
