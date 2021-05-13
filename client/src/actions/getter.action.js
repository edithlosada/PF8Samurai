import { GET_PLANS_BENEFITS, GET_BENEFITS } from "./constants.actions";
import supabase from "../supabase.config";

function getPlans() {
  return async (dispatch) => {
    try {
      const { data: plans } = await supabase
        .from("plans")
        .select("id, price, name, benefits (title)");
      dispatch({ type: GET_PLANS_BENEFITS, payload: plans });
    } catch (err) {
      console.error(err);
    }
  };
}

function getBenefits() {
  return async (dispatch) => {
    try {
      const { data: benefits } = await supabase
        .from("benefits")
        .select("id", "title", "description");
      dispatch({ type: GET_BENEFITS, payload: benefits });
    } catch (err) {
      console.error(err);
    }
  };
}

export { getPlans, getBenefits };
