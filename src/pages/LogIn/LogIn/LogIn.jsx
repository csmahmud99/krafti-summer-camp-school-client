import { useForm } from "react-hook-form";
import LogInRedirect from "../../../components/LoginRedirect/LogInRedirect";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Importing "Eye" icon for showing/hiding password
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Importing 'email-password' signIn provider from AuthContext API
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import SocialLogin from "../SocialLogIn/SocialLogin";

const LogIn = () => {
    // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    // Handle form events
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    // State for showing or hiding password
    const [visiblePassword, setVisiblePassword] = useState(false);

    // Handle password eye
    const handlePasswordClick = (event) => {
        event.preventDefault();
        setVisiblePassword(!visiblePassword);
    };

    // 'email-password' signIn provider from AuthContext API
    const { signIn } = useContext(AuthContext);

    // Handle submit 
    const onSubmit = data => {
        // console.log(data);
        signIn(data.email, data.password)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                // console.log(loggedUser);
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your have logged in successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                // User wished to go to a protected page, he/she is redirected to the login page. After the successful log in, the user will go towards the page he/she wished for.
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log("error login:", error.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Log In | Krafti - Summer Camp Learning School</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 pt-24 pb-10">
                <div className="hero-content flex-col md:flex-row w-full">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-bold">Log In now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>

                    <div className="flex-shrink-0 w-1/2 shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* Log In :: Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" className="input input-bordered w-full" />
                                {errors.email && <span className="text-red-600">Email is required.</span>}
                            </div>

                            {/* Log In :: Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex items-center relative">
                                    <input
                                        type={visiblePassword ? "text" : "password"} {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*()\-__+.])(?=.*[0-9])(?=.*[a-z])/
                                        })}
                                        placeholder="Enter Your Password"
                                        className="input input-bordered w-full"
                                    />
                                    <div className="p-2 text-xl 1/3 absolute right-1 -mr-3">
                                        {
                                            visiblePassword
                                                ? <button onClick={handlePasswordClick} className="btn btn-primary text-white"><FaEye /></button>
                                                : <button onClick={handlePasswordClick} className="btn btn-primary text-white"><FaEyeSlash /></button>
                                        }
                                    </div>
                                </div>
                                {errors.password?.type === "required" && <span className="text-red-600">Password is required.</span>}

                                {errors.password?.type === "minLength" && <span className="text-red-600">Password must not less than 6 characters.</span>}

                                {errors.password?.type === "pattern" && <span className="text-red-600">Password must have at least one upper case character, one lower case character, one number & one special character.</span>}
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" value="Log In" className="btn btn-primary" />
                            </div>
                        </form>

                        <LogInRedirect
                            generalText="New to this Website? Please, "
                            URL="/register"
                            linkText="Register"
                        />

                        <SocialLogin initialText="Log In with" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;