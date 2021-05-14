import { GET_PLANS_BENEFITS, GET_BENEFITS, GET_STATES, GET_LOCALITIES } from '../actions/constants.actions';
import {
    SET_NP_BEN_SEL,
    ADD_NP_BEN,
    SEND_NP_FORM,
} from '../actions/plans.actions';

const initialState = {
    allPlans: [],
    allBenefits: [],
    //---------New plan---
    npbensel: [],
    addedbenefs: [],
    sended: false,
    allStates:[],
    allLocalities:[]
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLANS_BENEFITS:
            return {
                ...state,
                allPlans: action.payload,
            };
        case GET_BENEFITS:
            return {
                ...state,
                allBenefits: action.payload,
            };
        case GET_STATES:
            return {
                ...state,
                allStates: action.payload,
            };
        case GET_LOCALITIES:
            return {
                ...state,
                allLocalities: action.payload,
            };
        case SET_NP_BEN_SEL:
            return {
                ...state,
                npbensel: action.payload,
            };
        case ADD_NP_BEN:
            return {
                ...state,
                addedbenefs: action.payload,
            };
        case SEND_NP_FORM:
            return {
                ...state,
                sended: action.payload,
            };
        default:
            return state;
    }
}

export default rootReducer;
