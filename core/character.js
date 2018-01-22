import Log from '../utilities/logger';

let id = 0;

const Character = ( name ) => {
    if(!name) throw new Error('Name needs to be defined');

    const inventory = [];
    const equipment = [];

    const equip = ( itemToEquip ) => {

        const itemId = itemToEquip.id || id;

        if(!inventory.find( item => item.id === id)){
            Log.w(`Couldn't find item id ${itemId} in ${name}'s inventory!`);
            return false;
        }

        // TODO Remove item from inventory and add, if size is ok, to equipment

        return true;
    };

    // TODO Name could be a serialized Character
    id += 1;

    return {
        id : id,
        name : name,
        money : 0,
        level : 1,
        wins : 0,
        losses : 0,
        fights : 0,
        missions : 0,
        inventory : inventory, // List of ids
        equipment : equipment, // List of ids
        equip : equip
     };
};

export { Character };
