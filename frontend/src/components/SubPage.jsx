export function SubPage({data}) {
    return <div className="m-10 font-montserrat">
        <p className="font-bold flex justify-center text-4xl mb-8">{data.heading}</p>
        <div>{data.content}</div>
    </div>
}