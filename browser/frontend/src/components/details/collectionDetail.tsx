import React from "react";
import {ICollectionDetailResult, IResource} from "../../misc/interfaces";
import DetailRow from "./detailRow";
import DetailRowHyper from "./detailRowHyper";
import DetailResources from "./detailResources";
import {fullPerson} from "../../misc/functions";
import {useNavigate} from "react-router-dom";
import {fd} from "../../misc/functions";
import DOMPurify from "dompurify";

export default function CollectionDetail({data}: {data: ICollectionDetailResult}) {
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
                            <h1>Collection not found!</h1>
                        )}
                        <div className="hcClickable" onClick={() => {nav(-1)}}>Back </div>
                    </div>
                </div>
            </div>
        </>
    )
}