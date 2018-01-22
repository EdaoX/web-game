import YAML from 'yamljs';
const types = YAML.load('data/damage-types.yml');

const DamageType = {};

const normalizedTypes = {};
for(let category in types)
{
    normalizedTypes[category] = types[category].forEach( subcategory => {
        DamageType[subcategory.toUpperCase()] = `${category}/${subcategory}`;
    });
}

DamageType.isValidType = type => type.includes('/');

DamageType.Category = type => {
    if(!DamageType.isValidType(type))
        throw new Error(`Parameter 'type' is not a valid damage type: ${type}`);

    return type.split('/', 2)[0];
};

DamageType.SubCategory = type => {
    if(!DamageType.isValidType(type))
        throw new Error(`Parameter 'type' is not a valid damage type: ${type}`);

    return type.split('/', 2)[1];
}

export default DamageType;
