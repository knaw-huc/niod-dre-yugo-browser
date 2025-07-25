export interface IResource {
    name: string,
    details: string,
    url: string
}

export interface IInstitutionResult {
    institution_id: string,
    type: string,
    name: string,
    authorisedForm: string,
    history: string
}

export interface IInstitutionDetails {
    institution_id: string, 
    title: string,
    html: string
}

export interface IInstitutionDetailResult {
    status:string,
    detail?: IInstitutionDetails
}

export interface ICollectionResult {
    collection_id: string,
    name: string,
    authorisedForm: string,
    scope: string
}

export interface ICollectionDetails {
    collection_id: string, 
    title: string,
    html: string
}

export interface ICollectionDetailResult {
    status:string,
    detail?: ICollectionDetails
}

export interface IPersonDetails {
    person_id: string,
    title: string,
    html: string
}

export interface IPersonDetailResult {
    status: string,
    detail?: IPersonDetails
}

export interface IPersonResult {
    person_id: string,
    name: string,
    authorisedForm: string,
    history: string
}

export interface IGroupDetails {
    group_id: string,
    title: string,
    html: string
}

export interface IGroupDetailResult {
    status: string,
    detail?: IGroupDetails
}

export interface IGroupResult {
    group_id: string,
    type: string,
    name: string,
    authorisedForm: string,
    history: string
}

export interface IPlaceResult{
    place_id: string,
    name: string,
    authorisedForm: string,
    descr: string
}

export interface IPlaceDetailResult {
    status: string,
    detail?: IPlaceDetails
}

export interface IPlaceDetails {
    place_id: string,
    title: string,
    html: string
}

export interface IEventResult{
    event_id: string,
    type: string,
    name: string,
    authorisedForm: string,
    history: string
}

export interface IEventDetailResult {
    status: string,
    detail?: IEventDetails
}

export interface IEventDetails {
    event_id: string,
    title: string,
    html: string
}
