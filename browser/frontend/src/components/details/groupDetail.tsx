import React from "react";
import {IGroupDetailResult, IResource} from "../../misc/interfaces";
import {useNavigate} from 'react-router-dom';
import DetailRow from "./detailRow";
import DetailResources from "./detailResources";
import {fullPerson} from "../../misc/functions";
import LocationMap from "./locationMap";
import {get_gender, get_entity} from "../../misc/functions";
import DOMPurify from "dompurify";

export default function GroupDetail({data}: {data: IGroupDetailResult}) {
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
                            <h1>Organisation not found!</h1>
                        )}
                        <div className="hcClickable" onClick={() => {nav(-1)}}>Back </div>
                    </div>
                </div>
            </div>
        </>
    )
}