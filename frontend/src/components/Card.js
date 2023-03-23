import React from 'react';
import { CurrenUserContext } from '../contexts/CurrentUserContext';


function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrenUserContext);
    const isOwn = (card.owner._id || card.owner)  === currentUser._id;
    const cardDeleteButtonStyle = (`${isOwn ? 'grid' : 'none'}`)
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active': 'element__like-button_disabled'}`); 

    function handleClick() {
        onCardClick(card);
      }  
    
    function handleLikeClick() {
        onCardLike(card);
      }

    function handleDeleteClick() {
        onCardDelete(card._id);
      }
      
  return (
          <article className="element">
            <img src={card.link} alt={card.name} className="element__image"
            onClick={handleClick}
            />
            <button className="element__delete-button" type="button" style={{display: cardDeleteButtonStyle}}
            onClick={handleDeleteClick}
            ></button>
            <div className="element__info">
              <h2 className="element__name">{card.name}</h2>
              <div className="element__likes">
                <button className={cardLikeButtonClassName} type="button"
                onClick={handleLikeClick}
                ></button>
                <p className="element__like-number">{card.likes.length}</p>
            </div>
            </div>
          </article>
)}

export default Card;
