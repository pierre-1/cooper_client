import React from 'react'

const RegisterUser = ({ submitFormHandler }) => {
    return (
        <form onSubmit={submitFormHandler} id="login-form">
            <label>Email</label>
            <input name="email" type="email" id="email"></input>

            <label>Password</label>
            <input name="password" type="password" id="password"></input>

            <label>Password Confirmation</label>
            <input name="password_confirmaton" type="password" id="password_confirmation"></input>

            <button id="submit">Submit</button>

        </form>
    );

}

export default RegisterUser;