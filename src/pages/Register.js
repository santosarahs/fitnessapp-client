import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from 'react-router-dom'; // Import Link
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Register({ apiUrl }) {

    const notyf = new Notyf();
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if ((email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();
        fetch(`${apiUrl}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message) {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                notyf.success(data.message);

                navigate('/login')
            }
            /*
            else if (data.message === "Email invalid") {
                notyf.error("Email is invalid");
            } else if (data.message === "Mobile number is invalid") {
                notyf.error("Mobile number is invalid");
            } else if (data.message === "Password must be atleast 8 characters long") {
                notyf.error("Password must be at least 8 characters");
            } 
            */
            else {
                notyf.error(data.error || "Something went wrong.");
            }
           
        });
    }


    return (
        (user.id !== null) ?
            <Navigate to="/workouts" />
            :
            <>
                <h1 className="my-5 text-center">Register</h1>
                <p className="text-center">
                    Already Registered? <Link to="/login">Click here to login!</Link>
                </p>
                <Form onSubmit={(e) => registerUser(e)}>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    {isActive ?
                        <Button variant="primary" type="submit" id="submitBtn">
                            Submit
                        </Button>
                        :
                        <Button variant="danger" type="submit" id="submitBtn" disabled>
                            Submit
                        </Button>
                    }
                </Form>
            </>
    )
}
