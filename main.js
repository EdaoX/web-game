import Item from './models/items';
import * as allSkills from './models/skills';

const capitalize = ( str ) => {
    const [ first, ...rest ] = str;
    return first.toUpperCase() + rest.join('');
}

const applyStatusEffect = ( event, player ) =>
{
    const action = `on${capitalize(event)}`;

    Object.keys(player.statusEffects).forEach( status => {
        if(player.statusEffects[status][action])
            player.statusEffects[status][action]();
        else
            Log.w(`Unidentified status action '${action}' called on status '${status}'`);
    });
}

const createPlayer = ( name, maxHP = 1 ) =>
{
    if(!name) throw new Error('Name must  be defined');

    const player = { name, maxHP };
    player.hp = maxHP;
    player.statusEffects = {};
    player.isDead = false;

    player.toString = () => `${player.name}: ${player.hp} HP`;
    player.damage = ( damage, type ) => {
        // TODO - Use Type
        console.log(`DAMAGE TYPE: ${type}`)

        player.hp -= Math.abs(damage);
        player.isDead = player.hp <= 0;
    };
    player.heal = ( healing, canResurrect = false ) => {
        if( !player.isDead || canResurrect )
            player.hp += Math.abs(healing);

        player.isDead = player.hp <= 0;
    }

    return player;
}

const context = {
    players : [
        createPlayer('P1', 5),
        createPlayer('P2', 5),
    ],
    currentPlayer : 0,
    nextTurn : () => {
        const [ currentPlayer, nextPlayer ] = context.getOrganizedPlayers();

        applyStatusEffect('turnEnd', currentPlayer);

        context.currentPlayer = context.currentPlayer === 0 ? 1 : 0;

        applyStatusEffect('turnStart', nextPlayer);

    },
    getOrganizedPlayers : () => {
        return ( context.currentPlayer === 0 ) ? [...context.players] : [...context.players].reverse();
    },
    getTarget : target => {
        const [ SELF, ENEMY ] = context.getOrganizedPlayers();
        const targets = { SELF, ENEMY };
        return targets[target];
    }
}

const executeItemAction = ( item, context ) => {
    const { skills } = item;
    const [ player ] = context.getOrganizedPlayers();
    console.log(`${player.name} used ${item.name}`);
    Object.keys(skills).forEach( id => allSkills[id](context, skills[id]));
}

const [ player1, player2 ] = context.players;

console.log('### Start');
console.log(player1.toString());
console.log(player2.toString());

const availableItems = [
    Item('poison_dart'),
    Item('long_sword'),
    Item('drain_wand'),
    Item('healing_circlet')
]

while(!player1.isDead && !player2.isDead)
{
    const usedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    executeItemAction(usedItem, context);
    context.nextTurn();
}

if(player1.isDead && player2.isDead)
    console.log("Draw!");
else if(player1.isDead)
    console.log(`${player2.name} won!`);
else
    console.log(`${player1.name} won!`);

// import YAML from 'yamljs';
// const types = YAML.load('data/damage-types.yml');
import DamageType from './models/damage-type'
