import * as statuses from './statuses';
import Log from '../utilities/logger';

export const damage = ( context, parameters ) => {
    const { damage, target } = parameters;
    const entity = context.getTarget(target);
    entity.damage(damage);
    console.log(`${entity.name} lost ${damage} HP, ${entity.hp} HP left`);
};

export const heal = ( context, parameters ) => {
    const { healing, target } = parameters;
    const entity = context.getTarget(target);
    entity.heal(healing);
    console.log(`${entity.name} recovered ${healing} HP and now has ${entity.hp} HP`);
};

export const status = ( context, appliedStatuses ) => {
    Object.keys(appliedStatuses).forEach( statusId => {

        const parameters = appliedStatuses[statusId];
        const { target } = parameters;
        const statusFactory = statuses[statusId];
        if(!statusFactory){
            Log.w(`Couldn't find status '${statusId}'`);
            return false;
        }
        const status = statusFactory( context, parameters );
        const entity = context.getTarget(target);

        // TODO - Check: placeholder
        entity.statusEffects = { ...entity.statusEffects, [statusId] : status };
        status.onApply();

    });
}
