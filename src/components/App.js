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
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      API.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    elem: {},
  });

  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    React.useState(false);

  // выход
  function handleSignOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  // регистрация
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((response) => {
        // console.log(response.status);

        setIsInfoToolTipPopupOpen(true);
        if (loggedIn) {
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }
  // вход
  const handleLogin = () => {
    setLoggedIn(true);
  };

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
    setSelectedCard({ isOpen: false, elem: {} });
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, elem: card });
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

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (loggedIn) {
      API.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
    }
    
  }, [loggedIn]);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getUserMe(jwt).then((res) => {
        if (res) {
          const userData = {
            email: res.data.email,
          };

          setLoggedIn(true);
          setUserEmail(userData);
          navigate("/main", { replace: true });
        }
      });
    }
  }

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
    API.deleteCard(card._id)
      .then((data) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
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

  function closeEsc(event) {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", closeEsc);
    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, []);

  function handleCloseOverlay(evt) {
    if (evt.target.classList.contains("popup_opend")) {
      closeAllPopups();
    }
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
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />

          <Route
            path="/main"
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
          <Route path="/main" element={<Footer />} />

          <Route
            path="/sign-up"
            element={<Register onHandleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
        </Routes>

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

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          handleCloseOverlay={handleCloseOverlay}
        />
        <InfoTooltip
          name="info-tool-tip"
          loggedIn={loggedIn}
          title={
            loggedIn
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
