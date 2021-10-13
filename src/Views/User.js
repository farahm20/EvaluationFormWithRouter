import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';

require("dotenv").config()
const CryptoJS = require('crypto-js');

const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY


const dcryptNames = (encryptedName) => {

    let dcryptedUserName = CryptoJS.AES.decrypt(encryptedName, REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    console.log("Dcrypted User Name: ", dcryptedUserName)

    return dcryptedUserName;
}


const User = props => {
    var id = props.match.params.id //matches to the Id that comes in url parameter.
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/answers/" + id)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setUser(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (user) {
        return (
            <div>
                <h1>{dcryptNames(user.value.FirstName)}</h1>
                <div>
                    ID: {user.id}
                </div>
                <div>
                    Date: {user.value.Date}
                </div>
                <div>
                    Time: {user.value.Time}
                </div>
            </div>
        );
    }
}
export default User;