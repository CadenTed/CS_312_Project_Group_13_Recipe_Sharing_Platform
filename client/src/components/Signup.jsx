import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if passwords match
        if (password !== '')
            {
             if (password !== confirmPassword)
                {
                 setPasswordMatch(false);
                 setError("Passwords Do Not Match");
                }
             else if (password.length < 8)
                {
                 setPasswordMatch(false);
                 setError("Password needs to be at least 8 characters long");
                }
             else
                {
                 setPasswordMatch(true);
                 setError('');
                }
            }
        else
            {
             setPasswordMatch(false);
             setError('');
            }
        
    }, [password, confirmPassword]);

    const handleForm = async (event) => {
        event.preventDefault();


        let userData = {
            username: username,
            email: email,
            birthday: birthday,
            password: password 
        };

        if (passwordMatch) {
            try {
                const response = await fetch("http://localhost:5001/api/signup", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                const data = await response.json();

                if (data.success) {
                    navigate("/");
                } else {
                    setError(data.error);
                }
            } catch (err) {
                console.error("Error during signup:", err);
                setError("An error occurred. Please try again.");
            }
        } else {
            setError("Passwords do not match");
        }
    };

    return (
        <div className="Signup-Container">
            <form className="Signup-Form" onSubmit={handleForm}>
                <div className="Signup-Top">
                    <div className="Signup-Title">
                        <h2>Sign Up</h2>
                    </div>
                    <div className="Signup-Item-Group">
                            <input
                                className="Signup-Item"
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                                                        <input
                                className="Signup-Item"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className="Signup-Item"
                                type="date"
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            <input
                                className="Signup-Item"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                className="Signup-Item"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                    </div>
                </div>

                {passwordMatch ? <div className="Password-Match">Valid Password</div> : <div className="Error-Message">{error}</div>}

                <div className="Signup-Button-Group">
                    <button className="Signup-Button" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
