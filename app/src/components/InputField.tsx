import React from "react";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

function InputField({label, value, onChange}: Props) {
    return (
        <>
            <label htmlFor={label}>{label}:</label>
            <input
                type="text"
                id={label}
                name={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
            </input>
        </>)
}

export default InputField;