import {constants} from '../constants'

export default function fuelratesReducer(state = {}, {type,payload}){
    
    switch(type){
        case constants.FETCH_ALL_FUELRATES:
            return  {...state, fuel: payload}
        default:
            return state
    }
}

