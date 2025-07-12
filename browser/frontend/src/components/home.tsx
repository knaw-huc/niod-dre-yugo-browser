import React from "react";
import {useNavigate} from "react-router-dom";


export function Home() {
    const nav = useNavigate();
    return (
        <div className="hcContentContainer hcMarginTop5 hcMarginBottom5">
            <div className="hcBasicSideMargin">
                <h1>NIOD Yugoslavia browser</h1>
            </div>
        </div>
    )
}