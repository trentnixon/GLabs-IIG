
import store from "../../../../store/store";

export function SetUIActive(id){
        // console.log(id)
        store.dispatch({ type:"UI_SET_ACTIVE_FACE", payload:id });
}

export function SelectCategory(value){
       // console.log(value);
        store.dispatch({ type:"UI_SELECT_CATEGORY", payload:value });
}