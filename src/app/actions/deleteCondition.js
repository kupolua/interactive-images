export function deleteCondition(condition) {
    return {
        type: 'DELETE_CONDITION',
        payload: condition
    }
}

