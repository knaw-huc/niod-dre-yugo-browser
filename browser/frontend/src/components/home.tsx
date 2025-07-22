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
                    The Yugoslav Wars (1991-2001), one of the deadliest and most violent conflicts of the modern era, have been well documented in millions of objects, photos, videos, judicial records, letters, photos, videos, audio recordings, diaries, announcements, newspapers and much more. However, sources are scattered over dozens of organisations and communities and have not been made easily accessible for research purposes. It is not clear what is digitised, there are language barriers, metadata is missing and catalogues and finding aids exist only partly. These limitations severely restrict historical and legal research. It is difficult to enable new research avenues for a broader group of academics, media professionals, NGOs, victims, legal professionals and the interested public.
                </p>
            </div>
            <br/>
            <img src={dayton}/>
        </div>
    )
}