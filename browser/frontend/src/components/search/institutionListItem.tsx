import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IInstitutionResult} from '../../misc/interfaces';
import {fd} from '../../misc/functions';


export default function InstitutionListItem({item}: { item: IInstitutionResult }) {


    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/institution_detail/' + item.institution_id}>{item.authorisedForm}</Link></h2>
            <div>{item.history}</div>
        </div>
    );
}