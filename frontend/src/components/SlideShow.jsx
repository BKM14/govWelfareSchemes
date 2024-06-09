import React, {useState, useEffect} from "react";

export function SlideShow({images, interval}) {
    const [currentImageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval)

        return () => clearInterval(intervalId);
    }, [images.length, interval])

    return <div className="relative flex justify-center w-full h-full">
        {images.map((image, index) => {
           return <img src={image} key={index} alt={`Slide ${index}`} className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} />
        })}
    </div>
}