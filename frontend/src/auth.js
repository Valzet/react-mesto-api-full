// export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'http://api.mesto-foreve.students.nomoredomains.sbs';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return res.json()
        .then((data) => {
            console.log('возвращаем данные', data)
            throw new Error(data.message[0].messages[0].message);
        });
};

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    }).then(checkResponse)
};
export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);

};
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${token}`
        }
    }).then(checkResponse)
        .catch((err) => console.log(err));
}
 
