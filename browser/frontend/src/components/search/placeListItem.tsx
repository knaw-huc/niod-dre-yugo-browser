import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IPlaceResult} from '../../misc/interfaces';


export default function PlaceListItem({item}: { item: IPlaceResult }) {

    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/place_detail/' + item.place_id}>{item.authorisedForm}</Link></h2>
            <div>{item.descr}</div>
        </div>
    );
}