import * as statuses from './statuses';
import Log from '../utilities/logger';
import DamageType from './damage-type';

const createAction = ( target, applyOn ) => {
    return { target, applyOn };
};

const createActionSet = (...actions) => {
    return [...actions];
}

export const damage = ({ damage, target, type }) => {

    const effect = ( target, context ) => {

        const modTarget = {...target};

        // TODO - Delegate this to an engine for damageType calculations and more

        // Use DamageType
        const damageType = DamageType[type.toUpperCase()];
        modTarget.hp -= Math.abs(damage);

        console.log(`${modTarget.name} lost ${damage} HP, ${modTarget.hp} HP left`);

        return modTarget;
    }

    return createActionSet(createAction( target, effect ));
};

export const heal = ({ healing, target, resurrect, overheal }) => {

    const effect = ( target, context ) => {

        // TODO - Delegate this to an engine?

        const modTarget = {...target};

        if(modTarget.isDead() && !resurrect)
            return modTarget;

        let actualHealing = Math.abs(healing);

        if(!overheal)
            actualHealing = Math.min(actualHealing, modTarget.maxHP - modTarget.hp);

        modTarget.hp += actualHealing;

        console.log(`${modTarget.name} recovered ${actualHealing} HP and now has ${modTarget.hp} HP`);
        return modTarget;
    }

    return createActionSet(createAction( target, effect ));

};

export const status = (appliedStatuses) => {

    const actions = [];

    for( const [ statusId, parameters ] of Object.entries(appliedStatuses))
    {
        const { target } = parameters;

        const effect = ( target, context ) => {

            const modTarget = {...target};

            const createStatus = statuses[statusId];
            if(!createStatus){
                Log.w(`Couldn't find status '${statusId}'`);
                return;
            }
            const status = createStatus( parameters );

            modTarget.statusEffects = { ...modTarget.statusEffects, [statusId] : status };
            status.onApply( modTarget );

            return modTarget;

        }

        actions.push(createAction( target, effect ));
    }

    return createActionSet(...actions);
}
