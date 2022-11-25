const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/user',
});

console.log('trying to login');

instance.post('/login')
    .then((response) => {
    console.log('auth success');

    instance.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
    loadUserInfos();
}).catch((err) => {
    console.log(err.response.status);
});

function loadUserInfos() {
    instance.get('/me').then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log(err.response.status);
    });
}

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;



    return instance(originalRequest);
});