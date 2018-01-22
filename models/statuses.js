import DamageType from './damage-type';

const doNothing = () => {};

const defaults = {
    onApply     : doNothing,
    onTurnStart : doNothing,
    onTurnEnd   : doNothing,
    onEnd       : doNothing, // Whenever status ends for whatever reason
    onRemove    : doNothing, // Whenever status is removed by abilites
}

const Status = ( actions ) => {
    return Object.assign({}, defaults, actions);
}

export const poison = ( context, parameters ) => {
    const { damage, target } = parameters;
    let { duration } = parameters;
    const entity = context.getTarget(target);
    return Status({
        onApply : () => {
            console.log(`${entity.name} is poisoned!`);
        },
        onTurnEnd : () => {
            entity.damage(damage, DamageType.POISON);
            // TODO - Redo: Stub

            if(duration <= 0){
                // TODO - Refactor
                entity.statusEffects.poison.onEnd();
                delete entity.statusEffects.poison;
                return;
            }
            console.log(`${entity.name} lost ${damage} HP, ${entity.hp} HP left. Will be poisoned for ${duration} more turns`)
            duration -= 1;
        },
        onEnd : () => {
            console.log(`${entity.name} is not poisoned anymore!`)
        }
    });
};

export const regen = ( context, parameters ) => {
    const { healing, target } = parameters;
    let { duration } = parameters;
    const entity = context.getTarget(target);
    return Status({
        onApply : () => {
            console.log(`${entity.name} is regenerating!`);
        },
        onTurnStart : () => {
            entity.heal(healing);
            // TODO - Redo: Stub
            if(duration <= 0){
                // TODO - Refactor
                entity.statusEffects.regen.onEnd();
                delete entity.statusEffects.regen;
                return;
            }
            console.log(`${entity.name} gained ${healing} HP, now having ${entity.hp} HP. Will keep regenerating for ${duration} more turns`)
            duration -= 1;
        },
        onEnd : () => {
            console.log(`${entity.name} is not regenerating anymore!`);
        }
    });
};
