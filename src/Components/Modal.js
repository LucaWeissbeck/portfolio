import React, { useState } from 'react';
import { GeneratePresignedURL } from '../services/generatePresignedURL';

const PasswordPopup = (props) => {
    const apiHook = new GeneratePresignedURL()
    const [password, setPassword] = useState('');
    const [presignedURL, setPresignedURL] = useState(null);
    const [responseMessage, setResponseMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPresignedURL(null);
        setIsLoading(true);
        setResponseMessage("");
        if (password.length > 0) {
            apiHook.generatePresignedURL(props.objectKey, password).then((res) => {
                try {
                    if (res.includes("s3")) {
                        setPresignedURL(res);
                    } else {
                        setResponseMessage(res);
                    }
                } catch (err) {
                    setResponseMessage(res?.message);
                }
            }).catch((err) => {
                setResponseMessage(err + "Please try again.")
            }).finally(() => {
                setIsLoading(false);
            })
        } else {
            setResponseMessage("No password was entered.");
        }

    };



    return (
        <div>
            <div className="popup">
                <form onSubmit={handleSubmit}>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {isLoading &&
                    <p>Loading, please wait...</p>}
                {presignedURL &&
                    <p>Success! <a style={{ color: "blue" }} href={presignedURL} target="_blank" rel="noreferrer"> Click here to view. </a></p>
                }
                <p style={{ color: "red" }}>{responseMessage}</p>
            </div>
        </div>
    );

};

export default PasswordPopup;