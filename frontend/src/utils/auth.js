const apiBaseUrl = 'https://api.mesto.pristupa.nomoredomains.work'; //заменить

function checkQueryResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

// логин пользователя
export const loginUse = (email, password) => {
  return fetch(`${apiBaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkQueryResult)
};

//регистрация пользователя
export const registerUser = (email, password) => {

  return fetch(`${apiBaseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkQueryResult)
}

//запрос для проверки валидности токена и получения email
export const getToken = () => {
  const token = localStorage.getItem('jwt');

  return fetch(`${apiBaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkQueryResult)
};


