import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card(props) {

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleClick() {
    props.onCardClick(props.card);
  }
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `item__remove-button ${isOwn ? 'button' && 'item__remove-button' : 'item__remove-button_type_hidden'}` //item__remove-button
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `item__like ${isLiked ? 'item__like_type_active' : ''}`;

  return (
    <li className="item" >
      <img className="item__img" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button type="button" aria-label="Удалить изображение" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="item__about">
        <h2 className="item__title">{props.card.name}</h2>
        <div className="item__like-area">
          <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="item__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;