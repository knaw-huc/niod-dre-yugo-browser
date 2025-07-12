import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IEventResult} from '../../misc/interfaces';


export default function EventListItem({item}: { item: IEventResult }) {

    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/event_detail/' + item.event_id}>{item.authorisedForm}</Link></h2>
            <div>{item.history}</div>
        </div>
    );
}