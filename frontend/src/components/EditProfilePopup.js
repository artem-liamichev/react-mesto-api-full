import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import { useTranslation } from 'react-i18next';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const { t } = useTranslation();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
           name: userName,
           about: userDescription
        });
      }

    const currentUser = React.useContext(CurrenUserContext);
    
    const [userName, setUserName] = useState('') 
    const [userDescription, setUserDescription] = useState('') 

    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
      }, [currentUser, isOpen]); 

    function handleChangeUserName(e) {
        setUserName(e.target.value)
    }

    function handleChangeUserDescription(e) {
        setUserDescription(e.target.value)
    }

    return (
        <PopupWithForm
            name='profile'
            popupTitle={t("edit-profile")}
            buttonTitle={t("save")}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="field-container">
                <input id="name-input" className="popup__input" name="surname" type="text" placeholder={t("name")} required minLength="2" maxLength="40"
                value={userName || ''} onChange={handleChangeUserName}
                />
                <span className="name-input-error" id="name-error"></span>
            </div>
            <div className="field-container">
                <input id="job-input" className="popup__input" name="job" type="text" placeholder={t("profession")} required minLength="2" maxLength="200"
                value={userDescription || ''} onChange={handleChangeUserDescription}
                />
                <span className="job-input-error" id="job-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup