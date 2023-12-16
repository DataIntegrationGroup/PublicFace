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

import {OrganizationChart} from "primereact/organizationchart";
import {useState} from "react";


const cfo = {
    label: 'CFO',
    type: 'person',
    className: 'p-person',
    expanded: true,
    data: { name: 'Kate White', 'avatar': 'kate.png' },
}
const cto = {
    label: 'CTO',
    type: 'person',
    className: 'p-person',
    expanded: true,
    data: { name: 'Saul Goodman', 'avatar': 'saul.png' },
}
const data =[
    {
        label: 'CEO',
        type: 'person',
        className: 'p-person',
        expanded: true,
        data: { name: 'Walter White', 'avatar': 'walter.jpg' },
        children: [
            cfo, cto
        ]
    }
]
export default function Organization(){
    const [selection, setSelection] = useState([]);

    const nodeTemplate = (node) => {
        if (node.type === "person") {
            return (
                <div>
                    <div className="node-header">{node.label}</div>
                    <div className="node-content">
                        <img alt={node.data.avatar} src={`images/organization/${node.data.avatar}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} style={{ width: '32px' }} />
                        <div>{node.data.name}</div>
                    </div>
                </div>
            );
        }

        return node.label;
    }

    return (
        <div>
            <h1>Organization</h1>
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} selection={selection} selectionMode="multiple"
                               onSelectionChange={event => setSelection(event.data)} className="company"></OrganizationChart>
        </div>
    )
}
// ============= EOF =============================================