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

export default DamageType;
