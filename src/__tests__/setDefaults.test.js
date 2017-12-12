import action from '../app/actions/setDefaults';

describe('actions', () => {
    it('should create an action to add a todo', () => {
        const expectedAction = {
            type: 'SET_DEFAULTS',
            payload: []
        }
        expect(action.setDefaults()).toEqual(expectedAction)
    })
})


// export function setDefaults() {
//     return {
//         type: 'SET_DEFAULTS',
//         payload: []
//     }
// }
//


