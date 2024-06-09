import { images } from "../data"
import { MainComponent } from "./MainComponent"
import { SlideShow } from "./SlideShow"


export function MainContent({ data, MainContentData }) {
    return (
        <div className="bg-yellow-100 flex font-montserrat flex-1 h-screen">
            <div className="w-1/2 p-1 m-1 flex flex-col text-center">
                <div className="bg-indigo-300 mb-1 flex-1">
                    <div className="w-full font-bold">News / Events (What's new)</div>
                    <div>
                        {data.map((item, index) => {
                            return <li key={index} className="list-decimal">{item}</li>
                        })}
                    </div>
                </div>
                <div className="mt-1.5 flex-1">
                    <SlideShow images={images} interval={5000}></SlideShow>
                </div>
            </div>

            <div className="w-1/2 grid grid-cols-2 h-full">
                {MainContentData.map((item, index) => {
                    return <MainComponent label={item.name} address={item.address} key={index} />
                })}
            </div>
        </div>
    );
}
