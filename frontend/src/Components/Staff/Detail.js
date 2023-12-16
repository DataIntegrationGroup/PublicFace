import {useParams} from "react-router-dom";

import Markdown from "react-markdown";
import jakerossmd from './markdown/jake_ross.md';
import juliariccimd from './markdown/julia_ricci.md';

import {useEffect, useState} from "react";
import jakeross from "../../img/staff/jake_ross.png";
import juliaricci from "../../img/staff/julia_ricci.png";
import {getAPI} from "../../api";


const STAFF = {jake_ross:
        {name: 'Dr. Jake Ross',
            description: 'Data Integration Manager',
            markdown: jakerossmd,
            image: jakeross},
    julia_ricci: {name: 'Julia Ricci',
        description: 'Argon Geochronologist',
        markdown: juliariccimd,
        image: juliaricci},
}

export default function StaffDetail(){
    const {slug} = useParams();
    const [p, setP] = useState({name:'',
        description: '',
        image: '',
        bio: ''});

    useEffect(() => {
        // fetch user info via api
        console.log('key', slug, STAFF, STAFF[slug])

        getAPI(`staff/${slug}`).then(
            (data) => {
                setP(data)
            }
        )
    }, []);

    return (
        <div>
            <h1>{p.name} - {p.description}</h1>
            <img src={p.image} alt={p.name} />
            <Markdown>{p.bio}</Markdown>
        </div>
    )
}