const SliderContent = ({ title, subTitle, content }) => {
    return (
        <>
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                <h4 className="text-xl font-bold">
                    {subTitle}
                </h4>

                <p>
                    {content}
                </p>
            </div>
        </>
    );
};

export default SliderContent;