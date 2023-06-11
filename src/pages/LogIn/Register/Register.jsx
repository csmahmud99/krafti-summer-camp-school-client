import { useForm } from "react-hook-form";
import LogInRedirect from "../../../components/LoginRedirect/LogInRedirect";
import { useContext, useState } from "react";

// Importing "Eye" icon for showing/hiding password
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Importing 'email-password' signIn provider from AuthContext API
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const navigate = useNavigate();

    // Handle form events
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    // States for showing or hiding password
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    // Handle password eye
    const handlePasswordClick = (event) => {
        event.preventDefault();
        setVisiblePassword(!visiblePassword);
    };

    // Handle confirm password eye
    const handleConfirmPasswordClick = (event) => {
        event.preventDefault();
        setVisibleConfirmPassword(!visibleConfirmPassword);
    };

    // Check password event 
    const password = watch("password");

    // 'email-password' signIn provider from AuthContext API
    // Update a user's profile :: getting the user's name and photo-URL
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);

    // Handle submit 
    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log("User Profile Info. is updated successfully.")
                        const saveUser = {
                            name: data.name,
                            photo: data.photoURL,
                            email: data.email
                        };
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
                                    reset();
                                    Swal.fire({
                                        title: 'You have been successfully registered. Please Log In Now to go to your profile',
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    });
                                    // Profile Image / Name not showing problem :: solution
                                    logOut()
                                        .then(() => {
                                            console.log("Log Out is Successful after Sign Up");
                                        })
                                        .catch(error => {
                                            console.log("error log out", error.message);
                                        });
                                    navigate("/login");
                                }
                            });
                    })
                    .catch(error => {
                        console.log("Error: Update User Profile", error.message);
                    });
            })
            .catch(error => {
                console.log("error register", error.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Register | Krafti - Summer Camp Learning School</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 pt-24 pb-10">
                <div className="hero-content flex-col md:flex-row w-full">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>

                    <div className="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* Registration :: Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} placeholder="Enter Your Name" className="input input-bordered" />
                            </div>

                            {/* Registration :: Photo URL Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Enter Your Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required.</span>}
                            </div>

                            {/* Registration :: Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required.</span>}
                            </div>

                            {/* Registration :: Password Field */}
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
                                    {errors.password?.type === "required" && <span className="text-red-600">Password is required.</span>}

                                    {errors.password?.type === "minLength" && <span className="text-red-600">Password must not less than 6 characters.</span>}

                                    {errors.password?.type === "pattern" && <span className="text-red-600">Password must have at least one upper case character, one lower case character, one number & one special character.</span>}

                                    <div className="p-2 text-xl 1/3 absolute right-1 -mr-3">
                                        {
                                            visiblePassword
                                                ? <button onClick={handlePasswordClick} className="btn btn-primary text-white"><FaEye /></button>
                                                : <button onClick={handlePasswordClick} className="btn btn-primary text-white"><FaEyeSlash /></button>
                                        }
                                    </div>
                                </div>

                            </div>

                            {/* Registration :: Confirm Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className="flex items-center relative">
                                    <input
                                        type={visibleConfirmPassword ? "text" : "password"} {...register("confirmPassword", {
                                            required: true,
                                            minLength: 6,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*()\-__+.])(?=.*[0-9])(?=.*[a-z])/,
                                            validate: value => value === password || "The Password Doesn't Match"
                                        })}
                                        placeholder="Re-enter Your Password"
                                        onPaste={(event) => {
                                            event.preventDefault()
                                            return false;
                                        }}
                                        className="input input-bordered w-full"
                                    />
                                    <div className="p-2 text-xl 1/3 absolute right-1 -mr-3">
                                        {
                                            visibleConfirmPassword
                                                ? <button onClick={handleConfirmPasswordClick} className="btn btn-primary text-white"><FaEye /></button>
                                                : <button onClick={handleConfirmPasswordClick} className="btn btn-primary text-white"><FaEyeSlash /></button>
                                        }
                                    </div>
                                </div>
                                {errors.password?.type === "required" && <span className="text-red-600">Password is required.</span>}

                                {errors.password?.type === "minLength" && <span className="text-red-600">Password must not less than 6 characters.</span>}

                                {errors.password?.type === "pattern" && <span className="text-red-600">Password must have at least one upper case character, one lower case character, one number & one special character.</span>}
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" value="Register" className="btn btn-primary" />
                            </div>
                        </form>

                        <LogInRedirect
                            generalText="Already have an account? Please, "
                            URL="/login"
                            linkText="Log In"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;