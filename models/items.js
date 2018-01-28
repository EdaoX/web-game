import YAML from 'yamljs';
const items = YAML.load('data/items.yml');
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

const Item = ( id ) => {

    const item = getNormalizeItemData(id);

    if(!item)
        Log.w(`Couldn't find name with id '${id}'`);

    return item;

}

export default Item;
