import React from "react";
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name='edit-profile'
      title='Редактировать профиль'
      formName='Форма изменения имени'>
      <input value={name || ''} onChange={handleNameChange} id="name" name="name" required type="text" className="form__input form__input_type_name" minLength="2" maxLength="40" />
      <span id="error-name" className="form__input-error"></span>
      <input value={description || ''} onChange={handleAboutChange} id="about" name="about" required type="text" className="form__input form__input_type_about" minLength="2"
        maxLength="200" />
      <span id="error-about" className="form__input-error"></span> </PopupWithForm>
  );
}

export default EditProfilePopup;