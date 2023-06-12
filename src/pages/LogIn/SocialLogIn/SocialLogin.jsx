import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = ({ initialText }) => {
    const { googleSignIn } = useContext(AuthContext);

    // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log("social log in:", loggedUser);
                const saveUser = {
                    name: loggedUser.displayName,
                    photo: loggedUser.photoURL,
                    email: loggedUser.email
                };
                // Sending data to the backend to save registered user info into the database of MongoDB
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your are in your account now.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
                // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log("error google sign in", error.message);
            });
    };

    return (
        <>
            <div className="divider text-primary font-bold">OR</div>
            <div>
                <div className="text-center mb-5">
                    <button onClick={handleGoogleSignIn} className="btn btn-outline btn-lg md:text-2xl bg-primary text-white">
                        <FaGoogle /> {initialText} Google
                    </button>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;