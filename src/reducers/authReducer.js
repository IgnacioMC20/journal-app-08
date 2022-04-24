import { types } from "../type/types";

/*
    {
        uuid: 'ashdfkjahi3ohfn3i4o',
        name: 'Ignacio
    }
*/

export const authReducer = (state = {}, action) => {
  switch (action.type) {
      case types.login:
            return {
                uuid: action.payload.uuid,
                name: action.payload.name,
            }
        case types.logout:
            return {}
      default:
          return state;
  }

}