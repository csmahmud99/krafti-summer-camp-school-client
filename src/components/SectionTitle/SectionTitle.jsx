const SectionTitle = ({ subHeading, heading }) => {
    return (
        <>
            <div className="text-center py-6">
                
                    <p className="font-bold text-xl">-- {subHeading} --</p>
                
              
                    <h1 className="text-primary text-4xl font-extrabold">{heading}</h1>
               
            </div>
        </>
    );
};

export default SectionTitle;