import React, {useEffect, useState} from "react";
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import {useGeographic} from "ol/proj";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Point from 'ol/geom/Point';
import {RegularShape} from "ol/style";
import {Stroke} from "ol/style";
import {Fill} from "ol/style";

export default function LocationMap({lat, lon}: {lat: number, lon: number}) {
    const [mapSet, setMapSet] = useState(false);


    const osmLayer = new TileLayer({
        source: new OSM(),
    })

    const iconFeature = new Feature({
        geometry: new Point([lon, lat])
    });

    const stroke = new Stroke({color: 'black', width: 2});
    const fill = new Fill({color: 'red'});
    // @ts-ignore
    const square = new Style({
        image: new RegularShape({
            fill: fill,
            stroke: stroke,
            points: 4,
            radius: 10,
            angle: Math.PI / 4
        })});

    const vectorSource = new VectorSource({
        features: [iconFeature]
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: square
    })

    useGeographic();

    useEffect(() => {
        if (!mapSet) {
        const map = new Map({
            target: "map",
            layers: [osmLayer, vectorLayer],
            view: new View({
                center: [lon, lat],
                zoom: 10,
            }),
        });
        setMapSet(true);
        return () => map.setTarget("map")}
    }, []);

    return ( <div style={{height:'600px',width:'800px', marginTop:'20px', border:'1px solid #999999'}} id="map" className="map-container" />)
}