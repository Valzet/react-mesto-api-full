export const BASE_URL = 'http://api.mesto-foreve.students.nomoredomains.sbs';
// export const BASE_URL = 'http://api.mesto-foreve.students.nomoredomains.sbs/';

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

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
};
export const authorize = ({ password, email }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(checkResponse);

};
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(checkResponse)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
}

