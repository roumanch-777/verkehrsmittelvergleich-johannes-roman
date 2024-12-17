import React from "react";

interface Props {
    children: string;
}

function Button({children}: Props) {
    return <button>{children}</button>
}

export default Button