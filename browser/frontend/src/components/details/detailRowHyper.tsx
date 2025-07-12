import React from "react";
import {useNavigate} from "react-router-dom";

export default function DetailRowHyper({label, value, id, entity, uncertain}: {label: string, value: string | undefined, id: string | undefined, entity: string, uncertain: string | undefined})
{
    const notEmpty: boolean = value !== "" && value !== undefined && value !== null;
    const setLink: boolean = id !== '';
    const nav = useNavigate();
    let unc: string = "";
    if (uncertain as unknown as number === 1) {
        unc = " (?)";
    }

    function goToPage(entity: string, id: string | undefined) {
        let adress = "";

        if (id !== "" && id !== null) {
            switch (entity) {
                case "Per":
                    adress = "/person_detail/" + id;
                    break;
                case "Let":
                    adress = "/letter_detail/" + id;
                    break;
                case "Loc":
                    adress = "/location_detail/" + id;
                    break;
                default:
                    adress = "/";
            }
            nav(adress);
        }
    }


    return (
        <>
            {notEmpty && <div>
                <div className="detailItemLabel">{label}</div>
                {setLink ? (
                    <div className="detailItemValue hcClickable" onClick={() => {goToPage(entity, id)}}>{value} <span>{unc}</span></div>
                ) : (
                    <div className="detailItemValue">{value}</div>
                )}

            </div>}
        </>
    );
}