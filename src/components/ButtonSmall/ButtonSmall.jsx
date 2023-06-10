import { Link } from "react-router-dom";

const ButtonSmall = ({ buttonText, buttonURL }) => {
    return (
        <>
            <Link to={buttonURL}>
                <button className="btn btn-primary btn-sm mt-4">{buttonText}</button>
            </Link>
        </>
    );
};

export default ButtonSmall;