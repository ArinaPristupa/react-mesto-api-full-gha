class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkQueryResult)
  }

  _checkQueryResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  }

  //гет запрос подгрузки карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
  }

  //гет запрос подгрузки информации о пользователe с сервера
  getInformationUser() {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
  }

  //oтредактированные данные профиля
  getEditedDataProfile(data) {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: data.name, 
        about: data.about, 
      }) 
    })
  }

  //добавление новой карточки
  addNewCard({ name, link }) {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
  }

  //удаление карточки
  deleteCard(data) {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  //поставка лайка карточки и удаление лайка карточки
  likeCard(data, isLiked) {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/cards/${data}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  //обновление аватара пользователя
  updateAvatarUser(cardId) {
    const token = localStorage.getItem('jwt');

    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: cardId.avatar,
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.pristupa.nomoredomains.work',
});

export default api;


