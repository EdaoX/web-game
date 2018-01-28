import DamageType from './damage-type';

const doNothing = () => {};

const defaults = {
    onApply     : doNothing,
    onTurnStart : doNothing,
    onTurnEnd   : doNothing,
    onEnd       : doNothing, // Whenever status ends for whatever reason
    onRemove    : doNothing, // Whenever status is removed by abilites
}

const Status = actions => Object.assign({}, defaults, actions);

export const poison = ( { damage, duration } ) => {

    const onApply = target => {
        console.log(`${target.name} is poisoned!`);
        return {...target};
    };

    const onEnd = target => {
        const modTarget = {...target};
        console.log(`${modTarget.name} is not poisoned anymore!`);
        delete modTarget.statusEffects['poiso '];
        return modTarget;
    };

    const onTurnEnd = target => {
        const modTarget = {...target};

        // TODO - Delegate this to an engine for damageType calculations and more

        // Use DamageType
        const damageType = DamageType.POISON;
        modTarget.hp -= Math.abs(damage);

        if(duration <= 0)
            return onEnd(modTarget);

        console.log(`${target.name} lost ${damage} HP, ${target.hp} HP left. Will be poisoned for ${duration} more turns`)
        duration -= 1;
        return modTarget;
    };

    return Status({ onApply, onTurnEnd, onEnd });
};

export const regen = ({ healing, duration, overheal }) => {

    const onApply = target => {
        console.log(`${target.name} is regenerating!`);
        return {...target};
    };

    const onEnd = target => {
        const modTarget = {...target};
        console.log(`${modTarget.name} is not regenerating anymore!`);
        delete modTarget.statusEffects['regen'];
        return modTarget;
    };

    const onTurnStart = target => {

        const modTarget = {...modTarget};

        let actualHealing = Math.abs(healing);

        if(!overheal)
            actualHealing = Math.min(actualHealing, modTarget.maxHP - modTarget.hp);

        modTarget.hp += actualHealing;

        if(duration <= 0)
            return onEnd(modTarget);

        console.log(`${target.name} gained ${healing} HP, now having ${target.hp} HP. Will keep regenerating for ${duration} more turns`)
        duration -= 1;

        return modTarget;
    };

    return Status({ onApply , onTurnStart , onEnd });
};
