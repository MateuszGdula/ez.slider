export function mixin(...mixins) {

    const mixed = function() {};

    Object.assign(mixed.prototype, ...mixins);

    return mixed;
}
