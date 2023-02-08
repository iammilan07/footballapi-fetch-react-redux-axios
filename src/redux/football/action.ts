import * as fromSlice from "./slice"
import axios from 'axios'
import { Api } from "../../page/data/Api";



export const fetchFootballData = (): any => async (dispatch: any) => {
    dispatch(fromSlice.request());
    const response: any = await axios.get(Api);
    console.log(response, 'action')

    if (response) {
        const { data } = response;
        dispatch(fromSlice.success(data))

    }
}

// export const fetchMatches = (footballData: any): any => async (dispatch: any) => {
//     const response: any = await axios.get(Api);
//     const matches = response.matches
//     const onlyMatches = matches.forEach((item: any) => {
//         if (item.score) {
//             return item;
//         }
//     });
//     if (onlyMatches) {
//         const { matches } = onlyMatches;
//         dispatch(fromSlice.fetchFootballData({ ...footballData, matches }))
//     }
// }
// // console.log("milan", fetchMatches)
