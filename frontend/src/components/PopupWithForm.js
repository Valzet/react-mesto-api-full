import React from "react";
 
function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}  >
      <div className="popup__container">
        <button onClick={props.onClose} type="button" aria-label="Закрыть" className={`button popup__close popup__close_type_${props.name}`}></button>
        <form onSubmit={props.onSubmit} name={props.formName} className={`form form_type_${props.name}`}>
          <h3 className="form__title"> {props.title} </h3>{props.children}
          <button type="submit" className={`button form__submit form__submit_type_${props.name}`}
            value="Сохранить">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
