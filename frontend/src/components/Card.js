import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;

    const isLiked = card.likes.some((i) => i === currentUser._id);

    const cardLikeButtonClassName = `element__img-like ${isLiked && 'element__img-like_active'}`;
    const cardDeleteButtonClassName = `element__trash ${isOwn && 'element__trash_active'}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            <img className="element__img" src={card.link} alt={card.name} onClick={handleClick} />

            <h2 className="element__title">{card.name}</h2>
            <button aria-label="Удалить картинку" className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="element__info">
                <button aria-label="Отметка мне нравится" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <p className="element__like-number">{card.likes.length}</p>
            </div>

        </article>
    )
}

export default Card;