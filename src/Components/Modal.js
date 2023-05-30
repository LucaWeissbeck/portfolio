import React, { useState } from 'react';
import { GeneratePresignedURL } from '../services/generatePresignedURL';

const PasswordPopup = (props) => {
    const apiHook = new GeneratePresignedURL()
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(true);
    const [responseMessage, setResponseMessage] = useState("")

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Password:', password);
        if (password.length > 0) {
            apiHook.generatePresignedURL(props.objectKey, password).then((res) => {
                console.log(res)
                if (res.includes("s3")) {
                    window.open(res)
                    setShowPopup(false); // Hide the popup after submitting
                }
                setResponseMessage(res)
            }).catch((err) => {
                setResponseMessage(err)
            })
        } else {
            setResponseMessage("No password was entered.")
        }

    };



    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={handlePasswordChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    <p style={{ color: "red" }}>{responseMessage}</p>
                </div>
            )}
        </div>
    );

};

export default PasswordPopup;