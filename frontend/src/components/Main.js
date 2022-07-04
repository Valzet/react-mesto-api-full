import React from "react";
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <button onClick={props.onEditAvatar} className="button profile__edit-image">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" aria-label="Изменить имя" className="button profile__edit-Button"></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="button profile__add-Button"> </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map(card => (<Card
            card={card}
            key={card._id}
            onCardLike={props.handleCardLike}
            onCardClick={props.onCardClick}
            onCardDelete={props.handleCardDelete} />))}
        </ul>
      </section>

    </main>
  );
}
export default Main;