import ButtonSmall from "../../../../components/ButtonSmall/ButtonSmall";

const SliderContent = ({title, subTitle, content}) => {
    return (
        <>
            <div className="title" data-swiper-parallax="-300">
                {title}
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
                {subTitle}
            </div>
            <div className="text" data-swiper-parallax="-100">
                <p>
                    {content}
                </p>
            </div>
        </>
    );
};

export default SliderContent;