import axios from 'axios';

export default class UtilisateurService{
    getUtilisateurs() {
        return axios.get(`${process.env.REACT_APP_API_URL}api/user/`).then(res => res.data);
    }
}