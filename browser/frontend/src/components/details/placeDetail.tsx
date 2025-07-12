import React from "react";
import {IPlaceDetailResult, IResource} from "../../misc/interfaces";
import {useNavigate} from 'react-router-dom';
import DOMPurify from "dompurify";

export default function PlaceDetail({data}: { data: IPlaceDetailResult }) {
    const nav = useNavigate();
    const OK: boolean = data.status === "OK";
    var mySafeHTML = "<b>Something went wrong!</b>"
    if (data.detail?.html!==undefined) {mySafeHTML = DOMPurify.sanitize(data.detail?.html)}

    return (
        <>
            <div className="hcContentContainer">
                <div className="hcBasicSideMargin">
                    <div className="justify hcMarginBottom1">
                        {OK ? (<div className="detailArea">
                            <div dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                            </div>
                        ) : (
                            <h1>Place not found!</h1>
                        )}
                        <div className="hcClickable" onClick={() => {nav(-1)}}>Back </div>
                    </div>
                </div>
            </div>
        </>
    )
}