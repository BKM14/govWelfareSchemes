export function SubPage({data}) {
    return <div className="md:m-10 m-3 font-montserrat">
        <p className="font-bold text-lg md:text-xl lg:text-3xl mt-3 text-center">{data.heading}</p>
        <div className="p-10 font-poppins mb-20 text-md md:text-lg lg:text-xl">{data.content}</div>
    </div>
}