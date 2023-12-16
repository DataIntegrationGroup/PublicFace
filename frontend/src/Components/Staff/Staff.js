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
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import React, {useState} from "react";
import {Rating} from "primereact/rating";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

import './Staff.css'

import jakeross from "../../img/staff/jake_ross.png";
import julia_ricci from "../../img/staff/julia_ricci.png";
import {Dropdown} from "primereact/dropdown";
import {OrganizationChart} from "primereact/organizationchart";
import Organization from "./Organization";
// import jakeross_markdown from './markdown/jake_ross.md';

export default function Staff(){
    const [layout, setLayout] = useState('grid');

    const staff = [{image: jakeross,
        key: 'jake_ross',
        name: 'Dr. Jake Ross',
        description: 'Data Integration Manager',
        email: 'jake.ross@nmt.edu',
        phone: '575-835-5081',
        // staff_markdown: jakeross_markdown
        },
        {image: julia_ricci,
            key: 'julia_ricci',
            name: 'Dr. Julia Ricci',
            description: 'Argon Geochronologist',
            email: 'julia.ricci@nmt.edu',
            phone: '575-835-5081',
            // staff_markdown: jakeross_markdown
        },

    ];

    const renderListItem = (data) => {
        return (
            <div className="col-12">
                <div className="list-item">
                    <img src={data.image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="list-detail">
                        <div className="name"><a href={`/staff/${data.key}`}>{data.name}</a></div>
                        <div className="description">{data.description}</div>
                        {/*<Rating value={data.rating} readOnly cancel={false}></Rating>*/}
                        {/*<i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>*/}
                    </div>
                    <div className="list-action">
                        {/*<span className="product-price">${data.price}</span>*/}
                        {/*<Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>*/}
                        {/*<span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>*/}
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="grid-item card">
                    <div className="grid-item-top">
                        <div>
                            <span className="category">{data.category}</span>
                        </div>
                        {/*<span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>*/}
                    </div>
                    <div className="grid-item-content">
                        <img src={data.image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="name"><a href={`/staff/${data.key}`}>{data.name}</a></div>
                        <div className="description">{data.description}</div>
                    </div>
                </div>
            </div>
        );
    }


    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    {/*<Dropdown*/}
                    {/*    // options={sortOptions}*/}
                    {/*    //       value={sortKey}*/}
                    {/*    optionLabel="label" placeholder="Sort By Price"*/}
                    {/*    // onChange={onSortChange}*/}
                    {/*/>*/}
                    <h4>Staff List</h4>
                </div>
                <div className="col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout}
                                           onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="staff">
            <Card>
                <DataView value={staff}
                          layout={layout}
                          header={header}
                          itemTemplate={itemTemplate}/>
            </Card>
            <Card>
                <Organization/>
            </Card>
        </div>
    )
}
// ============= EOF =============================================