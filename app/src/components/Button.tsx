import React from "react";

interface Props {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ children, onClick }: Props) {

    return <button onClick={onClick}>{children}</button>
}

export default Button
