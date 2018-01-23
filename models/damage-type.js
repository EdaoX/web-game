import YAML from 'yamljs';
import { curry } from 'lodash';
const types = YAML.load('data/damage-types.yml');

const DamageType = {};

DamageType.decode = ( type ) => {
    if(!DamageType.isValidType(type))
        throw new Error(`Parameter 'type' is not a valid damage type: ${type}`);

    const [ category, subcategory ] = type.split('/', 2);
    return { category, subcategory };
};

DamageType.encode = ( category, subcategory ) => `${category}/${subcategory}`;

DamageType.isValidType = type => type.includes('/');

DamageType.getCategory = type => {
    if(!DamageType.isValidType(type))
        throw new Error(`Parameter 'type' is not a valid damage type: ${type}`);

    const { category } = DamageType.decode(type);

    return category;
};

DamageType.getSubCategory = type => {
    if(!DamageType.isValidType(type))
        throw new Error(`Parameter 'type' is not a valid damage type: ${type}`);

    const { subcategory } = DamageType.decode(type);

    return subcategory;
};

DamageType.isType = (type, test) => {
    const typeObj = DamageType.decode(type);
    const testObj = DamageType.decode(test);

    if(typeObj.category !== testObj.category)
        return false;

    return typeObj.subcategory === '*' || typeObj.subcategory === testObj.subcategory;

};

DamageType.isType = curry(DamageType.isType);

// Initialize Constants
const normalizedTypes = {};
for(let category in types)
{
    DamageType[category.toUpperCase()] = `${category}/*`;

    types[category].forEach( subcategory => {
        DamageType[subcategory.toUpperCase()] = DamageType.encode(category, subcategory);
    });
}

export default DamageType;
