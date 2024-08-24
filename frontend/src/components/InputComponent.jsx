export function InputComponent({label, placeholder, onChange = null, type = 'text'}) {
    return <div className="my-2">
        <p className="font-semibold">{label}</p>
        <input type={type} placeholder={placeholder} onChange={onChange} className="border border-solid rounded-2xl border-black w-full p-2 text-black"/>
    </div>
}