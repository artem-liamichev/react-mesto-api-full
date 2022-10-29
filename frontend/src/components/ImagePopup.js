import closeButton from '../images/close-button.svg';

function ImagePopup({card, onClose, isOpen}) {

  return (
      <article
       className={`popup popup_zoom ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__zoom-container">
          <button className="popup__close-button" type="button"
            onClick = {onClose}>
            <img className="popup__image-close" src={closeButton} alt="закрыть попап"/>
          </button>
          <figure className="popup__figure">
            <img className="popup__image" src={card.link} alt={card.name}/>
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
        </div>
      </article>
)}

export default ImagePopup;
