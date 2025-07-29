import React from "react";
import {useNavigate} from "react-router-dom";
import dayton from '../assets/img/DaytonPeaceAgreement.jpg';


export function Home() {
    const nav = useNavigate();
    return (
        <div className="hcContentContainer hcMarginTop5 hcMarginBottom5">
            <div className="hcBasicSideMargin">
                <h1>An Ongoing Project</h1>
                <p className="hcParagraph">
                    Between March 2024 and September 2025, the NIOD Institute for War, Holocaust and Genocide Studies embarked on a pilot project to develop a feasibility study for a digital research environment (DRE) for the 1990s wars in the former Yugoslavia. The DRE was conceptualized as an open access, online based platform, which would gather in one place information about the existing archival collections relevant to the research of the Yugoslav wars, as well as establish a scholarly and institutional network that advances research of the archives of or about Yugoslav Wars. The main problem this pilot was set up to address was the relative lack of findability and accessibility of the archival information about the wars, including the collections created during the operation of the International Criminal Tribunal for the former Yugoslavia (ICTY) and its successor, the International Residual Mechanism for Criminal Tribunals (IRMCT).
                </p>
            </div>
            <br/>
            <img src={dayton}/>
        </div>
    )
}