export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000':'https://api.liamichev.students.nomoredomains.icu';

const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Возникла ошибка')
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email })
  })
    .then((res) => checkServerResponse(res))
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  })
    .then((res) => checkServerResponse(res))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => checkServerResponse(res))
}