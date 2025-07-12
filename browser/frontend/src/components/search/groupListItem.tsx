import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IGroupResult} from '../../misc/interfaces';


export default function GroupListItem({item}: { item: IGroupResult }) {
    function noNull(str: string) {
        if (str === null) {
            return "";
        } else {
            return str;
        }
    }

    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/group_detail/' + item.group_id}>{item.authorisedForm}</Link></h2>
            <div>{item.history}</div>
    </div>
);
}