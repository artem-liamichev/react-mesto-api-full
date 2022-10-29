import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const linkInputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: linkInputRef.current.value,
        });
    } 

    return (
        <PopupWithForm
            name='avatar'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            popupTitle='Обновить аватар'
            buttonTitle='Сохранить'>
            <div className="field-container">
            <input ref={linkInputRef} id="avatar-input" className="popup__input" name="avatar" type="url" placeholder="Ссылка на картинку" required />
            <span className="avatar-input-error" id="avatar-error"></span>
            </div>
      </PopupWithForm>

    )
}

export default EditAvatarPopup
