import React from "react";
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    },[props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            name='edit-avatar'
            title='Обновить аватар'
            formName='Форма изменения аватара'>
            <input ref={avatarRef} id="avatar" name="avatar" required type="url" placeholder="Ссылка на картинку" className="form__input form__input_type_url" />
            <span id="error-avatar" className="form__input-error"></span></PopupWithForm>
    );
}

export default EditAvatarPopup