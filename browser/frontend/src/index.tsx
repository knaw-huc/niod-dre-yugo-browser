import React, {createElement} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import {
    App,
    PageHeader,
    Search,
    Detail as BrowserDetail,
    createSearchLoader,
    createDetailLoader,
    searchUtils,
    SearchParams
} from '@knaw-huc/browser-base-react';
import {createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import InstitutionFacets from "./components/facets/institutionFacets";
import CollectionFacets from "./components/facets/collectionFacets";
import PersonFacets from "./components/facets/personfacets";
import GroupFacets from "./components/facets/groupFacets";
import PlaceFacets from "./components/facets/placeFacets";
import EventFacets from "./components/facets/eventFacets";
import InstitutionListItem from "./components/search/institutionListItem";
import CollectionListItem from "./components/search/collectionListItem";
import PersonListItem from "./components/search/personListItem";
import GroupListItem from "./components/search/groupListItem";
import PlaceListItem from "./components/search/placeListItem";
import EventListItem from "./components/search/eventListItem";
import InstitutionDetail from "./components/details/institutionDetail";
import CollectionDetail from "./components/details/collectionDetail";
import PersonDetail from "./components/details/personDetail";
import GroupDetail from "./components/details/groupDetail";
import PlaceDetail from "./components/details/placeDetail";
import EventDetail from "./components/details/eventDetail";
import {Header} from "./components/pageHeader";
import {Home} from "./components/home";
import About from "./components/about";
import {BASE_URL} from "./misc/config";

const header = <Header/>
const institutionSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, BASE_URL + '/browse_institution', 20);
const collectionSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, BASE_URL + '/browse_collection', 20);
const personSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, BASE_URL + '/browse_person', 20);
const groupSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, BASE_URL + '/browse_group', 20);
const placeSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, BASE_URL + '/browse_place', 20);
const eventSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, BASE_URL + '/browse_event', 20);
const title = 'NIOD Yugoslavia Browser';
const institutionDetailLoader = createDetailLoader(id => BASE_URL + `/get_institution_detail/${id}`);
const collectionDetailLoader = createDetailLoader(id => BASE_URL + `/get_collection_detail/${id}`);
const personDetailLoader = createDetailLoader(id => BASE_URL + `/get_person_detail/${id}`);
const groupDetailLoader = createDetailLoader(id => BASE_URL + `/get_group_detail/${id}`);
const placeDetailLoader = createDetailLoader(id => BASE_URL + `/get_place_detail/${id}`);
const eventDetailLoader = createDetailLoader(id => BASE_URL + `/get_event_detail/${id}`);
const routeObject: RouteObject = {
    path: '/',
    element: <App header={header}/>,
    children: [
        {index: true, element: <Home/>},
        {
            path: "/institutions",
            loader: async ({request}) => institutionSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={InstitutionFacets}
                             ResultItemComponent={InstitutionListItem}/>
        }, {
            path: '/institution_detail/:id',
            loader: async ({params}) => institutionDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={InstitutionDetail}/>
        }, {
            path: "/collections",
            loader: async ({request}) => collectionSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={CollectionFacets}
                             ResultItemComponent={CollectionListItem}/>
        }, {
            path: '/collection_detail/:id',
            loader: async ({params}) => collectionDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={CollectionDetail}/>
        }, {
            path: "/persons",
            loader: async ({request}) => personSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={PersonFacets}
                             ResultItemComponent={PersonListItem}/>
        }, {
            path: '/person_detail/:id',
            loader: async ({params}) => personDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={PersonDetail}/>
        }, {
            path: "/groups",
            loader: async ({request}) => groupSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={GroupFacets}
                             ResultItemComponent={GroupListItem}/>
        }, {
            path: '/group_detail/:id',
            loader: async ({params}) => groupDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={GroupDetail}/>
        }, {
            path: "/places",
            loader: async ({request}) => placeSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={PlaceFacets}
                             ResultItemComponent={PlaceListItem}/>
        }, {
            path: '/place_detail/:id',
            loader: async ({params}) => placeDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={PlaceDetail}/>
        }, {
            path: "/events",
            loader: async ({request}) => eventSearchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={EventFacets}
                             ResultItemComponent={EventListItem}/>
        }, {
            path: '/event_detail/:id',
            loader: async ({params}) => eventDetailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={EventDetail}/>
        }, {
            path: '/about',
            element: <About/>
        }]
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

        <RouterProvider router={createBrowserRouter([routeObject])}/>
);
