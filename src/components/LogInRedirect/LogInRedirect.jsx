import { Link } from "react-router-dom";

const LogInRedirect = ({generalText, URL, linkText}) => {
    return (
        <>
            <p className="text-center pb-5">
                {generalText} <Link to={URL} className="text-purple-800 font-bold">{linkText}.</Link>
            </p>
        </>
    );
};

export default LogInRedirect;