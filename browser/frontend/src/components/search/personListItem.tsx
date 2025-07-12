import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IPersonResult} from '../../misc/interfaces';

export default function PersonListItem({item}: { item: IPersonResult }) {
    function noNull(str: string) {
        if (str === null) {
            return "";
        } else {
            return str;
        }
    }

    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/person_detail/' + item.person_id}>{item.authorisedForm}</Link></h2>
            <div>{item.history}</div>
        </div>
);
}