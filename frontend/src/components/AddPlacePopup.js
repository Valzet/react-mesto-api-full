import React from "react";
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceLinkAdd(e) {
    setPlaceLink(e.target.value);
  }

  function handlePlaceNameAdd(e) {
    setPlaceName(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });

  }

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='add-picture'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      formName='Форма добавления карточки' >
      <input value={placeName} onChange={handlePlaceNameAdd} id="name-picture" name="name" required type="text" placeholder="Название"
        className="form__input form__input_type_pic-name" minLength="2" maxLength="30" />
      <span id="error-name-picture" className="form__input-error"></span>
      <input value={placeLink} onChange={handlePlaceLinkAdd} id="link-picture" name="link" required type="url" placeholder="Ссылка на картинку"
        className="form__input form__input_type_url" />
      <span id="error-link-picture" className="form__input-error"></span> </PopupWithForm>
  );
}

export default AddPlacePopup;