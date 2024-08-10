import React from 'react'
import "./banner.css"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const data = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
]

const Bannner = () => {
    return (
        <>
            <Carousel
                className="carousel"
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                animation="slide"
                // interval={3000}
                // transitionTime={500}
                stopOnHover={false}
                showIndicators={false}
                cycleNavigation={true}
            >
                {data.map((image, i) => (
                    <div key={i}>
                        <img src={image} alt={`img-${i}`} className="banner_img" />
                    </div>
                ))}
            </Carousel>
        </>
    )
}

export default Bannner;
