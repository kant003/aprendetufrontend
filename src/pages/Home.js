import React, {useState, useEffect} from "react";

import ritualSpell from './aplicaciones.jpeg';
import Select from 'react-select';

function setRaceImages(race) {
    if (race === 'Aqua') return ritualSpell;
    else if (race === 'Beast-Warrior') return ritualSpell;
    else if (race === 'Beast') return ritualSpell;
    else if (race === 'Creator-God') return ritualSpell;
    else if (race === 'Cyberse') return ritualSpell;
    else if (race === 'Dinosaur') return ritualSpell;
    else if (race === 'Divine-Beast') return ritualSpell;
    else if (race === 'Dragon') return ritualSpell;
    else if (race === 'Fairy') return ritualSpell;
    else if (race === 'Fiend') return ritualSpell;
    else if (race === 'Fish') return ritualSpell;
    else if (race === 'Insect') return ritualSpell;
    else if (race === 'Machine') return ritualSpell;
    else if (race === 'Plant') return ritualSpell;
    else if (race === 'Psychic') return ritualSpell;
    else if (race === 'Pyro') return ritualSpell;
    else if (race === 'Reptile') return ritualSpell;
    else if (race === 'Rock') return ritualSpell;
    else if (race === 'Sea Serpent') return ritualSpell;
    else if (race === 'Spellcaster') return ritualSpell;
    else if (race === 'Thunder') return ritualSpell;
    else if (race === 'Warrior') return ritualSpell;
    else if (race === 'Winged Beast') return ritualSpell;
    else if (race === 'Wyrm') return ritualSpell;
    else if (race === 'Zombie') return ritualSpell;
    else if (race === 'Normal') return ritualSpell;
    else if (race === 'Field') return ritualSpell;
    else if (race === 'Equip') return ritualSpell;
    else if (race === 'Continuous') return ritualSpell;
    else if (race === 'Quick-Play') return ritualSpell;
    else if (race === 'Ritual') return ritualSpell;
    else if (race === 'Normal') return ritualSpell;
    else if (race === 'Continuous') return ritualSpell;
    else if (race === 'Counter') return ritualSpell;

}

function setAttributes(attribute) {
    if (attribute === 'Spell Card') return ritualSpell;
    else if (attribute === 'Trap Card') return ritualSpell;
    else if (attribute === 'FIRE') return ritualSpell;
    else if (attribute === 'WATER') return ritualSpell;
    else if (attribute === 'LIGHT') return ritualSpell;
    else if (attribute === 'DARK') return ritualSpell;
    else if (attribute === 'WIND') return ritualSpell;
    else if (attribute === 'EARTH') return ritualSpell;
    else if (attribute === 'DIVINE') return ritualSpell;

}


export default function Home() {
    const [name, setName] = useState('');
    const [found, setFound] = useState(false);
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [attribute, setAttribute] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(0);
    const [race, setRace] = useState('');
    const [atk, setAtk] = useState('');
    const [def, setDef] = useState('');
    const [cardSets, setCardsets] = useState([]);
    const [cardPrices, setCardPrices] = useState([]);
    const [isMagicTrap, setIsMagicTrap] = useState(false);
    const [promiseArray, setTypeArray] = useState([]);
    const [levelArray, setLevelArray] = useState([]);
    const [attributeArray, setAttributeArray] = useState([]);
    const [raceArray, setRaceArray] = useState([]);
    const [nameIntroduced, setNameIntroduced] = useState(false);
    const [multipleResults, setMultipleResults] = useState(false);
    const [completeArrayCards, setCompleteArrayCards] = useState([]);
    const [cardFoundIndividual, setCardFoundIndividual] = useState([]);

    useEffect(() => {
        async function apiCall() {
            const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
            const req = await fetch(url);
            const data = await req.json();

            /*get all cards*/
            let getAllCards = () => data.data.map(e => {
                return {
                    name:e.name,
                    type: e.type,
                    desc:e.desc,
                    atk:e.atk,
                    def:e.def,
                    level:e.level,
                    race:e.race,
                    attribute:e.attribute,
                    archetype:e.archetype,
                    card_sets:e.card_sets,
                    image:e.card_images[0],
                    card_prices:e.card_prices[0]
                }
            });
            setCompleteArrayCards(getAllCards);

            /*get types*/
            let arrayAux = [];
            let getAllTypes = () => data.data.map(e => {
                return {
                    type: e.type
                }
            });
            getAllTypes().filter((e) => {
                if (!arrayAux.includes(e.type)) arrayAux.push(e.type);
                return arrayAux;
            });
            setTypeArray(arrayAux.map(e => {
                return {
                    value: e, label: e
                }

            }).sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)));

            /*get attributes*/
            let arrayAuxAttributes = [];
            let getAllAttributes = () => data.data.map(e => {
                return {
                    attribute: e.attribute
                };
            });
            getAllAttributes().filter((e) => {
                if (!arrayAuxAttributes.includes(e.attribute)) arrayAuxAttributes.push(e.attribute);
                return arrayAuxAttributes;
            });
            setAttributeArray(arrayAuxAttributes.map(e => {
                return {
                    value: e, label: e
                }
            }).sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)));

            /*get levels*/
            let arrayLvlsAux = [];
            let getAllLevels = () => data.data.map(e => {
                return {
                    level: e.level
                };
            });
            getAllLevels().filter((e) => {
                if (!arrayLvlsAux.includes(e.level)) arrayLvlsAux.push(e.level);
                return arrayLvlsAux;
            });
            setLevelArray(arrayLvlsAux.map(e => {
                return {
                    value: e, label: e
                }
            }).sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)));

            /*get races*/
            let arrayRacesAux = [];
            let getAllRaces = () => data.data.map(e => {
                return {
                    race: e.race
                };
            });

            /*let arrayCorrectRaces = [ 'Continuous', 'Zombie', 'Fiend', 'Normal', 'Quick-Play', 'rock', 'warrior',
                'winged beast', 'spellcaster', 'beast', 'fairy', 'equip', 'field', 'fish', 'beast-warrior', 'thunder',
                'machine', 'sea serpent', 'aqua', 'plant', 'dragon', 'reptile', 'counter', 'psychic', 'insect', 'pyro',
                'dinosaur', 'wyrm', 'cyberse', 'ritual', 'divine-beast', 'creator-god', 'cyverse', 'mai', 'pegasus',
                'ishizu', 'joey', 'kaiba' ,'yugi' ]*/

            getAllRaces().filter((e) => {
                if (!arrayRacesAux.includes(e.race) ) arrayRacesAux.push(e.race);
                return arrayRacesAux;
            });
            setRaceArray(arrayRacesAux.map(e => {
                return {
                    value: e, label: e
                }
            }).sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)));


        }

        apiCall().then();
    }, []);

    let handleChange = e => {
        const {name, value} = e.target;
        name === 'name' ? setName(value) : alert('error');
    }

     let handleSelectTypeChange =  async ({value}) => {
        setType(value);
        console.log('value: ' + value);
        console.log('value: ' + type);

        async function getByType() {
            const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${value}`;
            const req = await fetch(url);
            const data = await req.json();

            let getAllByType = () => data.data.map(e => {
                return {
                    name: e.name,
                    type: e.type,
                    image: e.card_images[0].image_url
                };
            });

            console.log(getAllByType());

        }


        getByType();

    }

    let handleSubmit = async e => {
        e.preventDefault();

        if (name != null || name !== '') {
            try {
                let cardFound = completeArrayCards.filter( (e) => e.name.toLowerCase()===name.toLowerCase());
                setCardFoundIndividual(cardFound);
                /*console.log('Card Found: ' + cardFound[0].name);
                console.log('Card Found Individual: ' + cardFoundIndividual[0].name);*/

                //console.log(cardFound[0].name + '\n' + cardFound[0].type+ '\n' + cardFound[0].image.image_url);


                let arrayImages = Object.keys(cardFound[0].image)
                    .map(function(key) {
                        return cardFound[0].image[key];
                    });

                if (cardFound[0].name !== null) {
                    setFound(true);
                    setName(cardFound[0].name);
                    setType(cardFound[0].type);
                    setImage(arrayImages[1]);
                    setAttribute(cardFound[0].attribute || cardFound[0].type);
                    setDescription(cardFound[0].desc);
                    setLevel(cardFound[0].level);
                    setRace(cardFound[0].race);
                    setAtk(cardFound[0].atk);
                    setDef(cardFound[0].def);
                    setCardsets(cardFound[0].card_sets);
                    setCardPrices(Object.keys(cardFound[0].card_prices)
                        .map(function(key) {
                            return cardFound[0].card_prices[key];
                        }));

                    if (type === 'Spell Card' || type === 'Trap Card') setIsMagicTrap(true)
                    else setIsMagicTrap(false);
                    setNameIntroduced(true);
                } else {
                    setMultipleResults(true);
                }


            } catch (err) {
                console.log(err);
                setFound(false);
            }
        }else if ( name==null && type!=null){
            try{

                let cardsFound = completeArrayCards.filter( (e) => e.type===type );
                console.log(cardsFound);
                console.log(cardsFound[0].name + '\n' + cardsFound[0].type+ '\n' + cardsFound[0].image.image_url);

                /*let getAllByType = () => data.data.map(e => {
                    return {
                        name: e.name,
                        type: e.type,
                        image: e.card_images[0].image_url
                    };
                    console.log(getAllByType());
                });*/




            }catch (err){
                console.log(err);
                setFound(false);
            }
        }
    }


    return (
        <>
            <div id={'main-container'}>
                <div id={'main-container-searcher'}>

                    <form onSubmit={handleSubmit}>
                        <div id={'container-input-name-search'}>
                            <p className={'text-labels'}> name:</p>
                            <input id={'input-name-search'} type={'text'} placeholder={'card name...'} name={'name'}
                                   onChange={handleChange}/>
                        </div>

                        <div id={'container-input-type-search'}>
                            <p className={'text-labels'}> type:</p>

                            <Select placeholder={'select type...'} options={promiseArray}
                                    onChange={handleSelectTypeChange}
                            />

                        </div>

                        <div id={'container-race-level-search'}>
                            <p className={'text-labels'}> race:</p>
                            <Select placeholder={'select race...'} options={raceArray}/>

                        </div>

                        <div id={'container-input-level-search'}>
                            <p className={'text-labels'}> level:</p>
                            <Select placeholder={'select level...'} options={levelArray}/>
                        </div>

                        <div id={'container-input-attribute-search'}>
                            <p className={'text-labels'}> attribute:</p>
                            <Select placeholder={'select attribute...'} options={attributeArray}/>

                        </div>

                        <div id={'container-atk-def'}>
                            <div id={'container-input-atk-search'}>
                                <p className={'text-labels'}> atk :</p>
                                <input id={'input-atk-search'} className={'atk-def'} type={'text'}
                                       placeholder={'min atk'}/>
                            </div>

                            <div id={'container-input-def-search'}>
                                <p className={'text-labels'}> def :</p>
                                <input id={'input-def-search'} className={'atk-def'} type={'text'}
                                       placeholder={'min def'}/>
                            </div>
                        </div>

                        <div id={'container-button-search'}>
                            <input id={'button-search-formulary'} className={'links'} type={'submit'} value={'search'}/>
                        </div>

                    </form>

                </div>

                <div id={'main-container-search-results'}>
                    {found && multipleResults && nameIntroduced === false && <div id={'multiple-results-container'}>

                        <div id={'multiple-results'}>
                            <div id={'multiple-cards'}>
                                {<img src={image} alt={'multiple-images'}/>}
                            </div>
                        </div>

                    </div>}
                    <div id={'result-container'}>
                        {found && <img id={'image-card'} src={image} alt={'card received'}/>}
                    </div>
                    <div id={'result-data-container'}>
                        {found && nameIntroduced && <div id={'result-data'}>
                            <p id={'name-result-card'}> {cardFoundIndividual[0].name}  </p>
                            <p> {cardFoundIndividual[0].type}  </p>
                            <div id={'lvl-atr'}>
                                <div id={'stars'}><img id={'levels'} src={ritualSpell} alt={'level'}/> <span>x</span> {cardFoundIndividual[0].level}
                                </div>
                                <div id={'atr'}><img id={'attribute-image'} src={setAttributes(attribute)}
                                                     alt={'type-attribute'}/></div>
                                <div id={'race'}><img id={'race-img'} alt={'race'} src={setRaceImages(race)}/>
                                    <span>[{cardFoundIndividual[0].race}</span><span>{type === 'Normal Monster' ? '' : '/' + cardFoundIndividual[0].type}]</span>
                                </div>
                            </div>
                            <div id={'description-card'}>
                                <blockquote>
                                    {description}
                                </blockquote>
                            </div>

                            <br/>

                            <div id={'atk-def-results'}>
                                {!isMagicTrap && <span id={'atk-results'}> ATK/ {atk} DEF/ {def}</span>}
                                <br/>
                                <br/>
                                <br/>

                            </div>

                        </div>}

                    </div>


                </div>

            </div>


            {found && nameIntroduced && <div id={'card-sets-prices-container'}>
                <div id={'card-sets-results'}>
                    <h3>Card sets:</h3>
                    {cardSets.map(function (d, idx) {
                        return (<div key={idx} id={'card-sets-list'}>
                            <li>{d.set_name}</li>
                            <p>code: {d.set_code}</p>
                            <p>rarity: {d.set_rarity} </p>
                            <p>price: {d.set_price}</p>
                        </div>)
                    })}
                </div>


                <div id={'card-prices-results'}>
                    <h3>Card prices:</h3>
                    {cardPrices.map(function (d, idx) {
                        return (<div key={idx} id={'card-prices-list'}>
                            <li><a href={`https://www.cardmarket.com/es/YuGiOh/Products/Search?searchString=${name}`}
                                   target={'_blank'}> <span>CardMarket</span></a> : {d.cardmarket_price} </li>
                            <li><a href={`https://www.tcgplayer.com/search/all/product?q=${name}&view=grid`}
                                   target={'_blank'}> <span>TCG</span></a> : {d.tcgplayer_price} </li>
                            <li><a
                                href={`https://www.amazon.es/s?k=${name}+card&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2ITV8PVFC3948&sprefix=${name}+card%2Caps%2C68&ref=nb_sb_noss`}
                                target={'_blank'}> <span>Amazon</span></a> : {d.amazon_price}  </li>
                            <li><a
                                href={`https://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=${name}`}
                                target={'_blank'}> <span>CoolStuffInc</span></a> : {d.coolstuffinc_price}</li>

                            <br/>

                        </div>)
                    })}
                </div>

            </div>}
        </>
    )

}