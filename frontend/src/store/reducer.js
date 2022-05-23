import { combineReducers } from "redux";
import { loginReducer } from "./auth/reducer";
import { addInstractorReducer, fetchInstractorsReducer, fetchSingleInstractor } from "./instractor/reducer";
import { addCoachReducer, fetchCoachesReducer, fetchSingleCoachReducer } from "./coach/reducer";

export default combineReducers({
  login: loginReducer,
  addInstactor: addInstractorReducer,
  addCoach: addCoachReducer,
  fetchCoaches: fetchCoachesReducer,
  fetchCoach: fetchSingleCoachReducer,
  fetchInstractors: fetchInstractorsReducer,
  fetchInstractor: fetchSingleInstractor
});
