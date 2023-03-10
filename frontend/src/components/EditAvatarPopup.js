import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useTranslation } from 'react-i18next';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    
    const { t } = useTranslation();

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
            popupTitle={t("update-avatar")}
            buttonTitle={t("save")}>
            <div className="field-container">
            <input ref={linkInputRef} id="avatar-input" className="popup__input" name="avatar" type="url" placeholder="link-to-an-image" required />
            <span className="avatar-input-error" id="avatar-error"></span>
            </div>
      </PopupWithForm>

    )
}

export default EditAvatarPopup
