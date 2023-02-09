import * as fromSlice from "./slice"
import axios from 'axios'
import { Api } from "../../page/data/Api";



export const fetchFootballData = (): any => async (dispatch: any) => {
    dispatch(fromSlice.request());
    const response: any = await axios.get(Api);
    if (response) {
        const { data } = response;
        dispatch(fromSlice.success(data))

    }
}
