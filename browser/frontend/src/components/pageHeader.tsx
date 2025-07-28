import React from 'react';
import {useNavigate, Link} from "react-router-dom";
import logo from '../assets/img/logo-homepage-intro.svg';
import "../assets/css/style.css";

export function Header() {
    const nav = useNavigate();
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom5">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <img src={logo} className="logo"/>
                        </div>
                    </div>
                    <div className="hcSiteTitle" onClick={() => {nav('/')}}>
                        NIOD Yugoslavia Browser
                    </div>
                    <div className="navi">
                        <div onClick={() => {nav('/institutions')}}>Institutions</div>
                        <div onClick={() => {nav('/collections')}}>Collections</div>
                        <div onClick={() => {nav('/persons')}}>Persons</div>
                        <div onClick={() => {nav('/groups')}}>Organisations</div>
                        <div onClick={() => {nav('/places')}}>Places</div>
                        <div onClick={() => {nav('/events')}}>Events</div>
                        <div onClick={() => {nav('/about')}}>About</div>
                        <div><Link to='mailto:structured-data@di.huc.knaw.nl'>Contact</Link></div>
                    </div>
                </header>
            </div>
        </div>)
}
