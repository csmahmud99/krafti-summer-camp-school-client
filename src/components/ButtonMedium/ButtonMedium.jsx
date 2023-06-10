import { Link } from "react-router-dom";

const ButtonMedium = ({ buttonURL, buttonText }) => {
    return (
        <>
            <Link to={buttonURL}>
                <button className="btn btn-primary btn-md mt-4">{buttonText}</button>
            </Link>
        </>
    );
};

export default ButtonMedium;