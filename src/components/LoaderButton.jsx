import React from "react";
import { Button } from "reactstrap";
import "./LoaderButton.css";

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <Button
            className={`LoaderButton ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >{isLoading ?
            <i className='fas fa-cog spinning' style={{'fontSize':'36px'}}></i> :
            "SUBMIT"
            }</Button>
    );
}