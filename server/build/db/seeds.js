"use strict";
const { Crew, Client, Package, Contract, Job } = require('./schema');
const mongoose = require('mongoose');
const cr1 = new Crew({
    foreman_name: 'Andy Bandy',
    crew_size: 2,
    avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale'"
});
cr1.save().then(console.log('crew1 created'));
const cr2 = new Crew({
    foreman_name: 'Heddy Ready',
    crew_size: 4,
    avatar: "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2"
});
cr2.save().then(console.log('crew2 created'));
const cli1 = new Client({
    name: 'Gregory Peck',
    phone: '403-552-9094',
    email: 'regreg@peck.com'
});
cli1.save().then(console.log('client1 created'));
const pack1 = new Package({
    title: 'Lawn Care Silver',
    description: '3 Month, Biweekly: Mow, edge trim, blow off pathways',
    cost: 5000,
    contract_length_days: 90,
    visit_interval_days: 14,
    man_hrs_per_visit: 4
});
pack1.save().then(console.log('package1 created'));
const pack2 = new Package({
    title: 'Lawn Care Gold',
    description: 'Two week, Daily: Mow, edge trim, blow off pathways',
    cost: 5000,
    contract_length_days: 14,
    visit_interval_days: 1,
    man_hrs_per_visit: 5
});
pack2.save().then(console.log('package2 created'));
