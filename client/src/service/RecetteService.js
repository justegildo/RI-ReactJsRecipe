import axios from 'axios';

export default class RecetteService{
    get() {
        return axios.get(`${process.env.REACT_APP_API_URL}api/recette/`).then(res => res.data);
    }
}
