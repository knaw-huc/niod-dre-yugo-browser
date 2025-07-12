import React from "react";
import {FreeTextFacet, ListFacet, SliderFacet, FacetsParams} from '@knaw-huc/browser-base-react';
import {FACET_URL} from "../../misc/config";

export default function PersonFacets({registerFacet, unregisterFacet, setFacet, searchValues}: FacetsParams) {
    return <>
        <h2>Persons</h2>
        <FreeTextFacet registerFacet={registerFacet} unregisterFacet={unregisterFacet} setFacet={setFacet}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Name"
                   field="name"
                   url={FACET_URL + "person_facet"}
                   flex={true}
                   addFilter={true}
                   usePost={true}
                   searchValues={searchValues}/>
    </>;
}
