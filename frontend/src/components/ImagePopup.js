import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_full-pic ${props.card.link && "popup_opened"}`}>
      <figure className="popup__image">
        <button type="button" aria-label="Закрыть" className="button popup__close popup__close_type_full-pic" onClick={props.onClose}> </button>
        <img src={props.card.link} className="popup__full-img" alt={props.card.name} />
        <figcaption className="popup__figcaption">{props.card.name}</figcaption>
      </figure>
    </div>

  );
}

export default ImagePopup;