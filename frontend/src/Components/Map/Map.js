// ===============================================================================
// Copyright 2023 Jake Ross
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ===============================================================================
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

import {useState} from "react";
import Map, {
    Layer,
    NavigationControl,
    Popup,
    Source,
    useMap,
} from "react-map-gl";
import {Panel} from "primereact/panel";
import {InputSwitch} from "primereact/inputswitch";
import {SourceTree} from "./SourceTree";
import BaseMapControl from "./BaseMapControl";


const sources = [
    { tag: "nmbgmr_groundwater_levels_pressure", color: "#6dcc9f" },
    { tag: "nmbgmr_groundwater_levels_acoustic", color: "#ccc46d" },
    { tag: "nmbgmr_groundwater_levels_manual", color: "#d5633a" },
    { tag: "usgs_groundwater_levels", color: "#cb77c7" },
    { tag: "usgs_stream_flow", color: "#c24850" },
];

const defaultSourceData = Object.fromEntries(sources.map((s) => [s.tag, null]));
const defaultLayerVisibility = Object.fromEntries(
    sources.map((s) => [s.tag, "none"]),
);

export default function MapComponent(){
    const [sourceData, setSourceData] = useState({
        ...defaultSourceData,
        selected_county: null,
    });
    const [osourceData, setOSourceData] = useState(defaultSourceData);
    const [layerVisibility, setLayerVisibility] = useState({
        ...defaultLayerVisibility,
        selected_county: "none",
    });
    const [loading, setLoading] = useState(false);
    const [mapStyle, setMapStyle] = useState(
        "mapbox://styles/mapbox/satellite-streets-v11",
    );

    const handleSourceSelection = (e) => {
        for (const s of sources) {
            // set visiblity of layer
            setLayerVisibility((prev) => {
                return {
                    ...prev,
                    [s.tag]: e[s.tag]?.checked === true ? "visible" : "none",
                };
            });

            // skip if layer is not visible
            if (e[s.tag] === undefined || e[s.tag].checked === false) {
                continue;
            }

            // lazy load source data
            if (sourceData[s.tag] === null) {
                if (s.tag.startsWith("nmbgmr")) {
                    let name;
                    let maxNum = 10000;
                    switch (s.tag) {
                        case "nmbgmr_groundwater_levels_pressure":
                            name = "Groundwater Levels(Pressure)";
                            break;
                        case "nmbgmr_groundwater_levels_acoustic":
                            name = "Groundwater Levels(Acoustic)";
                            break;
                        case "nmbgmr_groundwater_levels_manual":
                            name = "Groundwater Levels";
                            break;
                        default:
                            break;
                    }

                    let url = ```https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations
                        ?$filter=Things/Datastreams/name eq ${name}
                        &$expand=Things/Datastreams```;
                    setLoading(true);
                    // retrieveItems(url, [], maxNum).then((data) => {
                    //     setSourceData((prev) => {
                    //         return {
                    //             ...prev,
                    //             [s.tag]: make_feature_collection(data),
                    //         };
                    //     });
                    //     setOSourceData((prev) => {
                    //         return {
                    //             ...prev,
                    //             [s.tag]: make_feature_collection(data),
                    //         };
                    //     });
                    //     setLoading(false);
                    // });
                } else {
                    // switch (s.tag) {
                    //     case "usgs_groundwater_levels":
                    //         setLoading(true);
                    //         fetch(make_usgs_url("72019"))
                    //             .then((res) => res.json())
                    //             .then((usgs_gwl_locations) => {
                    //                 setSourceData((prev) => {
                    //                     return {
                    //                         ...prev,
                    //                         usgs_groundwater_levels:
                    //                             make_usgs_feature_collection(usgs_gwl_locations),
                    //                     };
                    //                 });
                    //                 setOSourceData((prev) => {
                    //                     return {
                    //                         ...prev,
                    //                         usgs_groundwater_levels:
                    //                             make_usgs_feature_collection(usgs_gwl_locations),
                    //                     };
                    //                 });
                    //                 setLoading(false);
                    //             });
                    //         break;
                    //     case "usgs_stream_flow":
                    //         setLoading(true);
                    //         fetch(make_usgs_url("00065"))
                    //             .then((res) => res.json())
                    //             .then((usgs_stream_locations) => {
                    //                 setSourceData((prev) => {
                    //                     return {
                    //                         ...prev,
                    //                         usgs_stream_flow: make_usgs_feature_collection(
                    //                             usgs_stream_locations,
                    //                         ),
                    //                     };
                    //                 });
                    //                 setOSourceData((prev) => {
                    //                     return {
                    //                         ...prev,
                    //                         usgs_stream_flow: make_usgs_feature_collection(
                    //                             usgs_stream_locations,
                    //                         ),
                    //                     };
                    //                 });
                    //
                    //                 setLoading(false);
                    //             });
                    //         break;
                    //     default:
                    //         break;
                    // }
                }
            }
        }
    };

    return (
        <div className={'grid'}>
            <div className={'col-4'}>
            <Panel
                header={
                    <div>
                        <span className={"panelicon pi pi-clone"} />
                        Layer
                    </div>
                }
                toggleable
            >
                {/*<div className="flex align-items-center">*/}
                {/*    <InputSwitch*/}
                {/*        inputId={"heatmap"}*/}
                {/*        checked={heatmapEnabled}*/}
                {/*        onChange={(e) => setHeatmapEnabled(e.value)}*/}
                {/*    />*/}
                {/*    <label htmlFor="heatmap" className="ml-2">*/}
                {/*        HeatMap*/}
                {/*    </label>*/}
                {/*</div>*/}
                <SourceTree handleSourceSelection={handleSourceSelection} />
            </Panel>
            <Panel
                header={
                    <div>
                        <span className={"panelicon pi pi-globe"} />
                        BaseMap
                    </div>
                }
                collapsed
                toggleable
            >
                <BaseMapControl style={mapStyle} setStyle={setMapStyle} />
            </Panel>
        </div>
            <div className={'col-8'}>
                <Map
                    mapboxAccessToken={
                        "pk.eyJ1IjoiamFrZXJvc3N3ZGkiLCJhIjoiY2s3M3ZneGl4MGhkMDNrcjlocmNuNWg4bCJ9.4r1DRDQ_ja0fV2nnmlVT0A"
                    }
                    initialViewState={{
                        longitude: -106.4,
                        latitude: 34.5,
                        zoom: 6,
                    }}
                    // onClick={(e) => (
                    //     console.log('map click', e)
                    // )}
                    fog={{
                        range: [0.8, 8],
                        // "color": "#f3dddd",
                        "horizon-blend": 0.05,
                        "high-color": "#245bde",
                        "space-color": "#000000",
                        "star-intensity": 0.95,
                    }}
                    terrain={{ source: "mapbox-dem", exaggeration: 3 }}
                    projection={"globe"}
                    style={{ width: "100%", height: "650px" }}
                    mapStyle={mapStyle}>
                    <Source
                        id={"mapbox-dem"}
                        type="raster-dem"
                        url="mapbox://mapbox.mapbox-terrain-dem-v1"
                        tileSize={512}
                        maxzoom={14}
                    ></Source>
                    {sources.map((s) => (
                        <Source
                            id={s.tag}
                            key={s.tag}
                            type="geojson"
                            data={sourceData[s.tag]}
                        >
                            <Layer
                                id={s.tag}
                                type="circle"
                                paint={{
                                    "circle-radius": 4,
                                    "circle-color": s.color,
                                    "circle-stroke-color": "black",
                                    "circle-stroke-width": 1,
                                }}
                                layout={{ visibility: layerVisibility[s.tag] }}
                            />
                        </Source>
                    ))}
                    <NavigationControl />
                </Map>
            </div>
        </div>
    )
}
// ============= EOF =============================================