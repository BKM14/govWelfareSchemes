import { images } from "../data"
import { MainComponent } from "./MainComponent"
import { SlideShow } from "./SlideShow"


export function MainContent({ MainContentData }) {
    return (
        <div className="bg-slate-100 flex flex-col md:mx-4 md:my-36 md:flex-row font-montserrat">
            <div className="w-full md:w-1/2 p-1 flex">
                <div className="mt-1.5 flex-1 hidden md:block">
                    <SlideShow images={images} interval={5000}></SlideShow>
                </div>
                <div className="block md:hidden w-4/5 mx-auto">
                    <img src="social.jpg" alt="social awareness"/>
                </div>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 flex-1">
                {MainContentData.map((item, index) => {
                    return <MainComponent label={item.name} address={item.address} key={index} />
                })}
            </div>
        </div>
    );
}   
