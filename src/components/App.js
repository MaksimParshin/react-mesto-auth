import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { API } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RecycleBinPopup from "./RecicleBinPopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState({});

  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isRecycleBinPopupOpen, setIsRecycleBinPopupOpen] =
  React.useState(false);

  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    React.useState(false);
  const [isSuccses, setIsSuccses] = React.useState();
  const [valueRegister, setValueRegister] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (loggedIn) {
      API.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const [isLoading, setIsLoading] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setIsRecycleBinPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    API.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    API.setAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    if (loggedIn) {
      API.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      API.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      API.putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    setIsRecycleBinPopupOpen(true);
    setSelectedCard(card);
  }

  function handeleRecicleBinClick() {
    setIsLoading(true);
    API.deleteCard(selectedCard._id)
      .then((data) => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }


  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    API.createCard(item)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCloseOverlay(evt) {
    if (evt.target.classList.contains("popup_opend")) {
      closeAllPopups();
    }
  }

  // выход
  function handleSignOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  // регистрация
  function handleRegister() {
    auth
      .register(valueRegister.password, valueRegister.email)
      .then((res) => {
        console.log(res);
        if (res) {
          setIsSuccses(true);
          openToolTip();
          navigate("/sign-in", { replace: true });
          setValueRegister({});
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccses(false);
        openToolTip();
      });
  }

  function openToolTip() {
    setIsInfoToolTipPopupOpen(true);
  }

  // вход
  const handleLogin = (bool) => {
    setLoggedIn(bool);
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getUserMe(jwt)
        .then((res) => {
          if (res) {
            const userData = {
              email: res.data.email,
            };

            setLoggedIn(true);
            setUserEmail(userData);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleUserData(userEmail) {
    setUserEmail({ email: userEmail });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          signOut={handleSignOut}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route
            index
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onHandleRegister={handleRegister}
                valueRegister={valueRegister}
                setValueRegister={setValueRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                handleUserData={handleUserData}
                setIsSuccses={setIsSuccses}
                openToolTip={openToolTip}
              />
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditAvatarPopup
          isOpend={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          handleCloseOverlay={handleCloseOverlay}
        />
        <EditProfilePopup
          isOpend={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          handleCloseOverlay={handleCloseOverlay}
        />

        <AddPlacePopup
          isOpend={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          handleCloseOverlay={handleCloseOverlay}
        />
            <RecycleBinPopup
          card={selectedCard}
          isOpend={isRecycleBinPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onDeletCard={handeleRecicleBinClick}
          handleCloseOverlay={handleCloseOverlay}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          handleCloseOverlay={handleCloseOverlay}
        />
        <InfoTooltip
          name="info-tool-tip"
          isSuccses={isSuccses}
          title={
            isSuccses
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
          isOpend={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          handleCloseOverlay={handleCloseOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
