export default ( type = false ) => {
    let items = {};

    const getType = () => type;

    const getItems = () => items;

    const add = ( item ) => {
        if(type)
            item = { ...item, type };
        items = { ...items, [ item.id ] : item };
    };

    const get = id => items[id];

    return { add, getItems, getType, get };
}
