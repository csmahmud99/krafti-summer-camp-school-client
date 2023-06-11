import { FaGoogle } from "react-icons/fa";

const SocialLogin = ({ initialText, }) => {
    return (
        <>
            <div className="divider text-primary font-bold">OR</div>
            <div>
                <div className="text-center mb-5">
                    <button className="btn btn-outline btn-lg md:text-2xl bg-primary text-white">
                        <FaGoogle /> {initialText} Google
                    </button>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;