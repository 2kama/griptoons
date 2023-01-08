import { IS_AUTHENTICATED } from '../../Helpers/statics'


export default function user (state = {isLoading : true}, action) {
    const { type, payload } = action

    switch (type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                ...payload,
                isLoading : false
            };
        default:
            return state
    }
}