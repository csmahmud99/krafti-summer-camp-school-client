import { useForm } from "react-hook-form";
import LogInRedirect from "../../../components/LoginRedirect/LogInRedirect";
import { useState } from "react";

// Importing "Eye" icon for showing/hiding password
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onTouched"
    });

    // States for showing or hiding password
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

    //    check password event 
    const password = watch("password")

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <>
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
                                    <div className="p-2 text-xl 1/3 absolute right-1 -mr-3">
                                        {
                                            visiblePassword
                                                ? <button onClick={() => setVisiblePassword(!visiblePassword)} className="btn btn-primary text-white"><FaEye /></button>
                                                : <button onClick={() => setVisiblePassword(!visiblePassword)} className="btn btn-primary text-white"><FaEyeSlash /></button>
                                        }
                                    </div>
                                </div>
                                {errors.password?.type === "required" && <span className="text-red-600">Password is required.</span>}

                                {errors.password?.type === "minLength" && <span className="text-red-600">Password must not less than 6 characters.</span>}

                                {errors.password?.type === "pattern" && <span className="text-red-600">Password must have at least one upper case character, one lower case character, one number & one special character.</span>}
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
                                                ? <button onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)} className="btn btn-primary text-white"><FaEye /></button>
                                                : <button onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)} className="btn btn-primary text-white"><FaEyeSlash /></button>
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