import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const linkInputRef = React.useRef();
    const nameInputRef = React.useRef();


    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        
        onAddPlace({
            name: nameInputRef.current.value,
            link: linkInputRef.current.value
        });
    } 

    return (
        <PopupWithForm
            name='add'
            isOpen={isOpen}
            onClose = {onClose}
            onSubmit={handleAddPlaceSubmit}
            popupTitle='Новое место'
            buttonTitle='Сохранить'>
            <div className="field-container">
            <input ref={nameInputRef} id="place-input" className="popup__input" name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="place-input-error" id="place-error"></span>
            </div>
            <div className="field-container">
            <input ref={linkInputRef} id="link-input" className="popup__input" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="link-input-error" id="link-error"></span>
            </div>
      </PopupWithForm>

    )
}

export default AddPlacePopup
