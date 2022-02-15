/**
 *
 * @param model
 * @param effects Function
 * @returns {string}
 */
export function dispatchType(model: any, effects: any): string {
  return `${model.namespace}/${effects.name}`;
}
