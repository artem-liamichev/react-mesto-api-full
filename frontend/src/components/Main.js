import React from 'react';
import '../components/App.js'
import editButton from '../images/edit-button.svg';
import addButton from '../images/add-button.svg';
import Card from '../components/Card.js'
import { CurrenUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrenUserContext);
  const editButtonRef = React.useRef();
  const handleMouseOver = () => {
    editButtonRef.current.style.display = 'block'
  }
  const handleMouseLeave = () => {
    editButtonRef.current.style.display = 'none'
  }

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__container">
        <img src={currentUser.avatar} alt="аватар профиля" className="profile__avatar"
            onClick={onEditAvatar}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        />
        <button className="profile__avatar-edit-button" ref={editButtonRef} type="button">
          <img className="profile__avatar-edit" src={editButton} alt="редактировать аватар"/>
        </button>

        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button"
            onClick={onEditProfile}
            >
              <img className="profile__edit-button-image" src={editButton} alt="редактировать профиль"/>
            </button>
          </div>
          <p className="profile__bio">{currentUser.about}</p>
        </div>
      </div>
      <button className="profile__add-button" type="button"
            onClick={onAddPlace}
            >
        <img className="profile__add-button-image" src={addButton} alt="иконка добавить новую картинку"/>
      </button>
    </section>

    <section className="elements">
      { cards.map((card) => {
        return (
            <Card
            key = {card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
      )
    }     )  
  }
    </section>
    
    </main>  );
}

export default Main;
