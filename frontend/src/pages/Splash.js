import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import { SliderData } from "../images/SliderData";


const Splash = () => {
    const [current,setCurrent] = useState(0)
    const length = slides.length
    return (
        <>
            {SliderData.map((slide, index) => {
                return (
                    <img src={slide.image}
                    alt="tthis is the alt" />
                )
            })}
        </>
    );
};

export default Splash;
