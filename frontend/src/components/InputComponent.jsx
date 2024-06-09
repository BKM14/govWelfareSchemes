export function InputComponent({label, placeholder, onChange = null}) {
    return <div className="my-2">
        <p className="font-semibold">{label}</p>
        <input type="text" placeholder={placeholder} onChange={onChange} className="border rounded-2xl border-black w-full p-2 text-black"/>
    </div>
}