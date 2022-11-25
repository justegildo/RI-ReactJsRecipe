import axios from 'axios';

export default class IngredientService{
    getIngredients() {
        return axios.get(`${process.env.REACT_APP_API_URL}api/ingredient/`).then(res => res.data);
    }
}