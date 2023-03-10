import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as apiAuth from '../utils/apiAuth.js';

import { CurrenUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api.js';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isZoomPopupOpen, setZoomPopupOpen] = useState(false);

  const [isRegisterFailPopupOpen, setRegisterFailPopup] = useState(false);
  const [isRegisterSuccessPopupOpen, setRegisterSuccessPopupOpen] = useState(false);


  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  
  const [cards, setCards] = useState([]);

  const [userEmail, setUserEmail] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const tokenCheck = () => {

    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      apiAuth
      .getContent(jwt)
      .then((res) => {
        if (res._id) {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push("/")
        }})
      .catch((err) => {
        console.log(err);
      }) }
    }

  useEffect(() => {
    tokenCheck();
  }, []);


  const onLogin = (data) => {
    return apiAuth
      .authorize(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/');
        return data;
      })
      .catch((err) => {
        console.log(err);
        setRegisterFailPopup(true)
      }) 
    }

  const onRegister = (data) => {
    return apiAuth
      .register(data)
      .then(() => {
        setRegisterSuccessPopupOpen(true)
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setRegisterFailPopup(true)
      }) }

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt')
    history.push('/sign-in');
  }

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getAllNeededData()
        .then((argument) => {
          const [profileInfo, initialCards] = argument;
          setCards(initialCards);
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    }) }
  
  function handleCardDelete(cardId) {
      api.deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      }) }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {    
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function handleZoomClick () {
    setZoomPopupOpen(true);
  }

  function closeAllPopups () {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setZoomPopupOpen(false);
      setRegisterFailPopup(false);
      setRegisterSuccessPopupOpen(false);
    }
 
  function handleCardClick(card) {
    setSelectedCard(card);
    handleZoomClick();
  } 

  function handleUpdateUser(profileInfo) {
    api.addProfile(profileInfo) 
      .then((profileInfo)=> {
        setCurrentUser(profileInfo);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      }) }
  
  function handleUpdateAvatar(profileInfo) {
    api.addAvatar(profileInfo) 
      .then((profileInfo)=> {
        setCurrentUser(profileInfo);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      }) }  
  
  function handleAddPlace(newCard) {
    api.addCard(newCard) 
      .then((newCard)=> {
        // setCards([newCard, ...cards]); 
        setCards([newCard, ...cards]); 
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (

    <CurrenUserContext.Provider value={currentUser}>
    
    <div className="page__container">
      <Header 
        userEmail={userEmail}
        onLogout={onLogout}
        />

      <Switch>
        <ProtectedRoute 
          path exact="/"
          onEditAvatar = {handleEditAvatarClick} 
          onEditProfile = {handleEditProfileClick} 
          onAddPlace = {handleAddPlaceClick} 
          onCardClick = {handleCardClick} 
          cards = {cards} 
          onCardLike = {handleCardLike} 
          onCardDelete ={handleCardDelete}
          isLoggedIn={isLoggedIn}
          component={Main}
          />
        <Route path="/sign-up">
          <Register onRegister={onRegister}/>
        </Route>
        <Route path="/sign-in">
          <Login  onLogin={onLogin}/>
        </Route>
        <Route>
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in"/>}
        </Route>
      </Switch>


      <Footer />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} /> 

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlace}
      />

      <PopupWithForm
        isOpen={false}
        name='delete'
        popupTitle='Вы уверены?'
        buttonTitle='Да'>
      </PopupWithForm>

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} /> 

      <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
        isOpen = {isZoomPopupOpen}
      >
      </ImagePopup>

      <InfoTooltip
        isRegisterFailPopupOpen={isRegisterFailPopupOpen}
        isRegisterSuccessPopupOpen={isRegisterSuccessPopupOpen}
        onClose={closeAllPopups} 
      >
      </InfoTooltip>

    </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
