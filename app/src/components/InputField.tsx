import React from "react";

interface Props {
    children: string;
}

function InputField({children}: Props) {
    return (
        <>
            <label htmlFor={children}>{children}:</label>
            <input type="text" id={children} name={children}/>
        </>)
}

export default InputField;