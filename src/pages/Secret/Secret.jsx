import { Helmet } from "react-helmet-async";

const Secret = () => {
    return (
        <>
            <Helmet>
                <title>Secret | Krafti - Summer Camp Learning School</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center text-purple-800 py-40">This is Secret Page</h2>
        </>
    );
};

export default Secret;