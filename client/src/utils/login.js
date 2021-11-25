import {routesUsers} from '../utils/routes.js';
import {postData} from '../utils/fetchFunctions.js';

const login = async (data) => {
    const response = await postData(routesUsers.login, data);
    return response;
};

export default login;