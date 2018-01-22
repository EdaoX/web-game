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

const Item = ( id ) => {

    const item = items[id];
    if(!item)
    {
        Log.w(`Couldn't find name with id '${id}'`);
        return false;
    }

    return Object.assign({ id }, defaults, item);

}

export default Item;
