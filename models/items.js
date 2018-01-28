import YAML from 'yamljs';
const items = YAML.load('data/items.yml');
import * as skillData from './skills';
import Log from '../utilities/logger';

const defaults = {
    name : '<unnamed>',
    description: '',
    img : '',
    rarity : 0,
    baseValue : 0,
    skills : {}
};

const getNormalizeItemData = id => items[id] ? { id, ...defaults, ...items[id]} : false;

const getSkill = id => skillData[id];

const Item = ( id ) => {

    const item = getNormalizeItemData(id);

    if(!item)
        Log.w(`Couldn't find name with id '${id}'`);

    const use = () => {

        const { skills } = item;

        const skillNames = Object.keys( skills );

        const effect = skillNames
                         .map( getSkill )
                         .reduce( (effectAccumulator, skill, index ) => {
                             return [ ...effectAccumulator, ...skill( skills[skillNames[index]]) ];
                         }, []);

        return effect;

    };

    return { ...item, use };

}

export default Item;
