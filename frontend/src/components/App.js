import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup'
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from '../contexts/CurrentUserContext'
import Register from './Register'
import Login from './Login'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth'
import InfoTooltip from './InfoTooltip'
import succesImg from '../images/loginTrue.svg'
import failImg from '../images/loginFalse.svg'

function App() {

  const [isAddNewUser, setIsAddNewUser] = useState({ opened: false, success: false })
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = useState('')
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
    api.getProfile()
      .then(res =>
        setCurrentUser(res.data)
      )
      .catch(err => {
        console.log(err);
      })
    api.getInitialCards()
      .then((card) => {
        setCards(card)
      })
      .catch(err => {
        console.log(err);
      });
  }}, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }
    history.push('/signin');
  }, [loggedIn, history]);


  const handleLogin = ({ email, password }) => {
    auth.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.token);
        tokenCheck();
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        setIsAddNewUser({ opened: true, success: false });
        console.log(err);
      })
  }

  const handleRegister = ({ password, email }) => {
   auth.register({ password, email })
      .then(() => {
        setIsAddNewUser({ opened: true, success: true });
        history.push('/signin');
      })
      .catch(err => {
        setIsAddNewUser({ opened: true, success: false });
        console.log(err);
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserData(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }



  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddNewUser({ success: false, fall: false })
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile({ name, about })
      .then(res => {
        setCurrentUser({...currentUser, name, about });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.addAvatar({ avatar })
      .then(res => {
        setCurrentUser({...currentUser, avatar});
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(items => items.filter(item => item._id !== card._id))
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    
    const isLiked = card.likes.some(i => i === currentUser._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res.data : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then(res => {
        setCards([res, ...cards]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUserData('');
    setLoggedIn(false);
    
  }

  return (
    <div className="content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} handleLogout={handleLogout} />
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardDelete={handleCardDelete}
            handleCardLike={handleCardLike}>
          </ProtectedRoute>
          <Route exact path='/signup'> <Register handleRegister={handleRegister} /> </Route>
          <Route exact path='/signin'> <Login handleLogin={handleLogin} tokenCheck={tokenCheck} /></Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isAddNewUser.opened}
          image={isAddNewUser.success ? succesImg : failImg}
          text={isAddNewUser.success ? '???? ?????????????? ????????????????????????????????????!' : '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????'}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>

    </div >
  );
}

export default App;
