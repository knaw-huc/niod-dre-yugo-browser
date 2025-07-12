import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {ICollectionResult} from '../../misc/interfaces';

export default function CollectionListItem({item}: { item: ICollectionResult }) {


    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/collection_detail/' + item.collection_id}>{item.authorisedForm}</Link></h2>
            <div>{item.scope}</div>
        </div>
    );
}