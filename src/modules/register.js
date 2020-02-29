import axios from 'axios';

const register = async (email, password, password_confirmation) => {
    try {
        const response = await axios.post('auth/', {
            email: email,
            password: password,
            password_confirmation: password_confirmation
        });
        return { registered: true };
    } catch (error) {
        return { authenticated: false, message: error.response.data.errors[0] };
    }
};

export { register }