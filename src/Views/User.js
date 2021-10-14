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
                <p><span className="answer-label">ID: </span>{user.id}</p>
                <p><span className="answer-label">Date of submission: </span>{user.value.Date}</p>
                <p><span className="answer-label">Time of submission: </span> {user.value.Time}</p>

                <ul>
                    <li><span className="answer-label">Patient first name: </span>{dcryptNames(user.value.FirstName)}</li>
                    <li><span className="answer-label">Patient last name: </span>{dcryptNames(user.value.LastName)}</li>
                    <li><span className="answer-label">Therapist name: </span>{dcryptNames(user.value.TherapistName)}</li>
                    <li><span className="answer-label">Satisfied by therapist: </span>{user.value.SatisfiedByTherapist}</li>
                    <li><span className="answer-label">Overall experience: </span>{user.value.OverallExperience}</li>
                    <li><span className="answer-label">Feel heard by therapist: </span>{user.value.FeelHeardByTherapist}</li>
                    <li><span className="answer-label">Feel seen by therapist: </span>{user.value.FeelSeenByTherapist}</li>
                    <li><span className="answer-label">Feel understood by therapist: </span>{user.value.FeelUnderstoodByTherapist}</li>
                    <li><span className="answer-label">Feel safe By therapist: </span>{user.value.FeelSafeByTherapist}</li>
                    <li><span className="answer-label">Feel comfortable with therapist: </span>{user.value.FeelComfortableWithTherapist}</li>
                    <li><span className="answer-label">How long to feel comfortable with therapist: </span>{user.value.HowlongTofeelComfortableWithTherapist}</li>
                    <li><span className="answer-label">Confidence in therapist: </span>{user.value.ConfidenceInTherapist}</li>
                    <li><span className="answer-label">Clicking with therapist: </span>{user.value.ClickingWithTherapist}</li>
                    <li><span className="answer-label">Therapist matches your preferences: </span>{user.value.TherapistMatchesYourPreferences}</li>
                    <li><span className="answer-label">Enjoying most about therapist: </span>{user.value.EnjoyingMostAboutTherapist}</li>
                    <li><span className="answer-label">Enjoying most about therapy: </span>{user.value.EnjoyingMostAboutTherapy}</li>
                    <li><span className="answer-label">Enjoying least about therapist: </span>{user.value.EnjoyingLeastAboutTherapist}</li>
                    <li><span className="answer-label">Enjoying least about therapy: </span>{user.value.EnjoyingLeastAboutTherapy}</li>
                    <li><span className="answer-label">Why choose this therapist: </span>{user.value.WhyChooseThisTherapist}</li>
                    <li><span className="answer-label">How long have you been thinking about therapist: </span>{user.value.HowLongHaveYouBeenThinkingAboutTherapist}</li>
                    <li><span className="answer-label">Actively looking for therapist: </span>{user.value.ActivelyLookingForTherapist}</li>
                    <li><span className="answer-label">Therapist have profile picture: </span>{user.value.TherapistHaveProfilePicture}</li>
                    <li><span className="answer-label">Therapist to have own website: </span>{user.value.TherapistToHaveOwnWebsite}</li>
                    <li><span className="answer-label">Anything we missed: </span>{user.value.AnythingWeMissed}</li>
                </ul>
            </div>
        );
    }
}
export default User;