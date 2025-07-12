import React from "react";
import {IResource} from "../../misc/interfaces";

export default function DetailResources({resources}: {resources: IResource[]}) {

    return (
        <>
            {resources.length > 0 && <div>
                <div className="detailItemLabel">Resources</div>
                {resources.map((item, index) => {
                return (
                    <div key={index}>
                    <div className="hcClickable"  onClick={() => {
                        window.open(item.url);
                    }}>{item.name}</div>
                    <div>{item.details}</div>
                    </div>
                )
                })
                }
            </div>}
        </>
    )
}