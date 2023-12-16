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


import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";                                  //flex

// import Dashboard from "./components/Dashboard/Dashboard";
// import AppNavbar from "./components/Navbar/Navbar";
// // import useAuth from "./components/App/useAuth";
// import Admin from "./components/Admin/Admin";
// import Documentation from "./components/App/Documentation.js";
// import Analytics from "./components/Analytics/Analytics.js";
// import Matches from "./components/Match/Matches";
// import Home from "./components/Home/Home";

import {FiefAuthProvider} from "@fief/fief/react";
import {Callback, RequireAuth} from "./fief";
import AppNavbar from "./Components/AppNavbar.js";
import Home from "./Components/Home.js";
import Footer from "./Components/Footer.js";
import Store from "./Components/Store/Store";
import Labs from "./Components/Labs/Labs";
import Staff from "./Components/Staff/Staff";
import StaffDetail from "./Components/Staff/Detail";
import NMGRL from "./Components/Labs/NMGRL";
import Data from "./Components/Data/Data";
import MapComponent from "./Components/Map/Map";
import AboutUs from "./Components/AboutUs/AboutUs";

function App() {
    return (
        <FiefAuthProvider
            baseURL="https://fief.newmexicowaterdata.org"
            clientId='u4Zib08CVZ15BfsmO-ytahxtJt0WchLCDYwLAkRvBAE'
        >
        <div className="wrapper">
            <AppNavbar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/callback" element={<Callback />} />
                        <Route path="/staff" element={<Staff />}/>
                        <Route path="/aboutus" element={<AboutUs />}/>
                        <Route path="/store" element={<Store />}/>
                        <Route path="/labs" element={<Labs />}/>
                        <Route path="/data" element={<Data />}/>
                        <Route path="/map" element={<MapComponent />} />
                        <Route path="/staff/:slug" element={<StaffDetail />}/>
                        <Route path="/labs/nmgrl" element={<NMGRL />} />

                        {/*<Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>*/}
                        {/*<Route path="/dashboard" element={<RequireAuth><Admin /></RequireAuth>}/>*/}
                        {/*<Route path="/documentation" element={<Documentation />}/>*/}
                        {/*<Route path="/analytics" element={<Analytics/>}/>*/}
                        {/*<Route path="/matches" element={<Matches />}/>*/}
                    </Routes>
                </BrowserRouter>
            <section>
                <Footer />
                {/*<footer className={'text-center'} style={{'backgroundColor': '#a4c8ec'}}>*/}
                {/*    <div className={'text-center p-3'}>*/}

                {/*    </div>*/}

                {/*    <div className={'text-center p-3'}>*/}
                {/*        <p>© 2023 New Mexico Bureau of Geology and Mineral Resources</p>*/}
                {/*    </div>*/}

                {/*</footer>*/}
            </section>
        </div>
        </FiefAuthProvider>
  );
}

export default App;
// ============= EOF =============================================
