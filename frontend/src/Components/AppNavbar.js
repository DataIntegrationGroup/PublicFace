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

import {Button} from "primereact/button";
import {useFiefAuth, useFiefIsAuthenticated, useFiefUserinfo} from "@fief/fief/react";
import {useCallback} from "react";
import {Menubar} from "primereact/menubar";
import nmbgmr_logo from "../img/nmbgmr_logo.png";

function AppNavbar() {
    const fiefAuth = useFiefAuth();
    const isAuthenticated = useFiefIsAuthenticated();
    const userinfo = useFiefUserinfo();

    const login = useCallback(() => {
        fiefAuth.redirectToLogin(`${window.location.protocol}//${window.location.host}/callback`);
    }, [fiefAuth]);

    const logout = useCallback(() => {
        fiefAuth.logout(`${window.location.protocol}//${window.location.host}`);
    }, [fiefAuth]);
    // return (<Button  onClick={()=> setHelpVisible(true)} severity="help" label={"Help"}/>)
    const brand = <img src={nmbgmr_logo}  height='80px'/>
    const home= {label: 'Home', icon: 'pi pi-fw pi-home', command: () => {window.location.href = '/'}}
    const labs= {label: 'Labs', icon: 'pi pi-fw pi-bolt',
        items: [
                {label: 'New Mexico Geochronology Research Laboratory', icon: 'pi pi-fw pi-bolt',
                    command: () => {window.location.href = '/labs/nmgrl'}},
                {label: 'Analytical Chemistry', icon: 'pi pi-fw pi-bolt',
                    command: () => {window.location.href = '/labs/analyticalchemistry'}},
        ],
        // command: () => {window.location.href = '/labs'}
    }
    const staff= {label: 'Staff', icon: 'pi pi-fw pi-user', command: () => {window.location.href = '/staff'}}
    const store = {label: 'Store', icon: 'pi pi-fw pi-shopping-cart', command: () => {window.location.href = '/store'}}
    const data = {label: 'Data', icon: 'pi pi-fw pi-database', command: () => {window.location.href = '/data'}}
    const map= {label: 'Map', icon: 'pi pi-fw pi-map', command: () => {window.location.href = '/map'}}
    // const documentation= {label: 'Docs', icon: 'pi pi-fw pi-question-circle', command: () => {window.location.href = '/docs'}}

    var loginout;
    if (isAuthenticated && userinfo){
        loginout = <Button label={"Logout"} onClick={() => logout()}/>
    }else{
        loginout = <div>
            {/*<Button label={"Help"} onClick={() => setHelpVisible(true)} severity={'help'} icon={'pi pi-fw' +*/}
            {/*    ' pi-question'}/>*/}
            <Button label={"Login"} onClick={() => login()} icon={'pi pi-fw pi-user'}/>
        </div>
    }
    const items = [
        home,
        labs,
        staff,
        store,
        map,
        data

    ]
    console.log('items', items)
    return (
        <Menubar model={items} start={brand} end={loginout}/>
    )

    // return (
    //     <div>
    //
    //
    //     <Navbar  className="beaver-navbar">
    //
    //         {/*<Container>*/}
    //         {/*    <Nav>*/}
    //         {/*        <Nav.Link href="dashboard">Dashboard</Nav.Link>*/}
    //         {/*        <Nav.Link href="documentation">Documentation</Nav.Link>*/}
    //
    //         {/*    /!*<Navbar.Brand href="/">*!/*/}
    //         {/*    /!*    <img src={nmwdi_logo}/>*!/*/}
    //         {/*    /!*    FantasyWaterLeague</Navbar.Brand>*!/*/}
    //         {/*    /!*<Navbar.Collapse id="basic-navbar-nav">*!/*/}
    //         {/*    /!*    <Navbar.Toggle aria-controls="basic-navbar-nav" />*!/*/}
    //         {/*    /!*    <Nav className="me-auto">*!/*/}
    //         {/*    /!*        <Nav.Link href="dashboard">Dashboard</Nav.Link>*!/*/}
    //         {/*    /!*        <Nav.Link href="documentation">Documentation</Nav.Link>*!/*/}
    //         {/*    /!*        <Nav.Link href="#link">Link</Nav.Link>*!/*/}
    //         {/*    /!*        <NavDropdown title="Dropdown" id="basic-nav-dropdown">*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.2">*!/*/}
    //         {/*    /!*                Another action*!/*/}
    //         {/*    /!*            </NavDropdown.Item>*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*!/*/}
    //         {/*    /!*            <NavDropdown.Divider />*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.4">*!/*/}
    //         {/*    /!*                Separated link*!/*/}
    //         {/*    /!*            </NavDropdown.Item>*!/*/}
    //         {/*    /!*        </NavDropdown>*!/*/}
    //         {/*        </Nav>*/}
    //         {/*    /!*</Navbar.Collapse>*!/*/}
    //         {/*</Container>*/}
    //         <Nav>
    //             <Navbar.Brand href='https://newmexicowaterdata.org' >
    //                 <img src={nmwdi_logo} height='60px'/>
    //             </Navbar.Brand>
    //         </Nav>
    //         <Container>
    //             <Nav>
    //                 <Navbar.Brand href="/">Beaver</Navbar.Brand>
    //                 <Nav.Link href="dashboard">Dashboard</Nav.Link>
    //                 {/*<Nav.Link href="documentation">Documentation</Nav.Link>*/}
    //                 {/*<Nav.Link href="analytics">Analytics</Nav.Link>*/}
    //                 {/*<Nav.Link href="discovery">Discovery</Nav.Link>*/}
    //                 {/*<Nav.Link href="match">Matches</Nav.Link>*/}
    //             </Nav>
    //         </Container>
    //         <Container style={{"justifyContent": "right"}}>
    //             <Button  rounded onClick={()=> setHelpVisible(true)} severity="help" label={"Help"}/>
    //             {!isAuthenticated && <Button onClick={() => login()} label={"Login"}/>}
    //             {isAuthenticated && userinfo && (
    //                 <div>
    //                     <img src={user_logo} style={{"width": "50px", "height": "50px"}}/>
    //                     <span style={{"padding": "10px"}}>{userinfo.email}</span>
    //                     <Button onClick={() => logout()} label={"Logout"}/>
    //                 </div>
    //             )}
    //         </Container>
    //     </Navbar>
    //     </div>
    // );
}

export default AppNavbar;
// ============= EOF =============================================