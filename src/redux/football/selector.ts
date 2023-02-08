import { RootState } from "../Store";

export const selectFootballList: any = (state: RootState) => state.footballDataList.footballData;

export const selectLoading = (state: RootState) => state.footballDataList.loading;

export const selectMappedList = (state: RootState) => {
    const data: any = state.footballDataList.footballData;
    const { matches, name } = data;
    const info: any = {};
    if (matches && matches.length > 0) {
        matches.map((item: any) => {
            const { team1, team2, score } = item;
            if (!info[team1]) {
                info[team1] = {
                    wins: 0,
                    lose: 0,
                    games: 0,
                    lastgames: [],
                    goala: 0,    //goalagainst
                    goalc: 0,   //goalconcede
                };
            }
            if (!info[team2]) {
                info[team2] = {
                    wins: 0,
                    games: 0,
                    lose: 0,
                    lastgames: [],
                    goala: 0,
                    goalc: 0,
                };
            }
            if (!score) {
                return;
            }
            const { ft } = score;
            info[team1].games++;
            info[team2].games++;
            info[team1].goala = info[team1].goala + ft[0];
            info[team2].goala = info[team2].goala + ft[1];
            info[team1].goalc = info[team1].goalc + ft[1];
            info[team2].goalc = info[team2].goalc + ft[0];

            if (ft[0] === ft[1]) {
                info[team1].lastgames = [1, ...info[team1].lastgames]; //1 = draw
                info[team2].lastgames = [1, ...info[team2].lastgames];
            } else if (ft[0] > ft[1]) {
                info[team1].wins++;
                info[team2].lose++;
                info[team1].lastgames = [2, ...info[team1].lastgames];
                info[team2].lastgames = [0, ...info[team2].lastgames];
            } else {
                info[team2].wins++;
                info[team1].lose++;
                info[team1].lastgames = [0, ...info[team1].lastgames];
                info[team2].lastgames = [2, ...info[team2].lastgames];
            }
        });
    }

    const arrayinfo = []; //sort garna lako [] use gareako
    for (const key in info) {
        arrayinfo.push({
            name: key,
            ...info[key],
        });
    }
    arrayinfo.sort((a, b) => {
        const gda = a.goala - a.goalc; //goaldiiferense
        const gdb = b.goala - b.goalc;
        if (a.wins == b.wins) {
            return gdb - gda;
        }
        return b.wins - a.wins;
    });
    return arrayinfo
}


// export const selectListData = (state: RootState) => {
//     let x: any = {}
//     const mapped = state.footballDataList.footballData.matches.map((item: any) => {
//         return {
//             ...item,
//             date: new Date(item.date).toLocaleDateString("en-US"),
//         }
//     })
//     mapped.forEach((item: any) => {
//         if (!x[item.score]) {
//             x[item.round] = [];
//             x[item.round].push(item);
//         }

//     })
//     let f: any = {};
//     Object.keys(x).forEach((key: any) => {
//         const expenseCloned = x[key];
//         const roundno = expenseCloned.sort().filter((item: any, pos: any, ary: any) => {
//             return !pos || item !== ary[pos - 1];
//         });
//         const clubName = expenseCloned.sort().filter((item: any, pos: any, ary: any) => {
//             return !pos || item !== ary[pos - 1];
//         });
//         clubName.map((data: any, index: any) => {
//             const score = {
//                 name: clubName[index],
//                 score: data.score ? data.score.ft[0] : 0,
//             }
//             f.push(score);
//         })
//         let win = 3,
//             draw = 1,
//             loss = 0;
//         clubName.map((name: any, index: any) => {
//             const standing = {
//                 posiion: index,
//                 name: name,
//                 played: roundno.length,
//                 win: win,
//                 draw: draw,
//                 loss: loss,
//                 gf: 3,
//                 ga: 2,
//                 gd: 1,
//                 points: 3,
//             }
//             x.push(standing);
//         })
//         return f
//     })
// }
// export const selectMappedList = () => {
//     const selectLeagueStanding: any = []
//     const result: any = (state: RootState) => state.footballDataList.footballData;
//     const allMatches = result.matches;

//     const solved = allMatches.map((item: any) => item.team1);
//     const round = allMatches.map((item: any) => item.round)
//     const clubName = solved.sort().filter((item: any, pos: any, ary: any) => {
//         return !pos || item != ary[pos - 1];
//     });
//     const roundno = round.sort().filter((item: any, pos: any, ary: any) => {
//         return !pos || item != ary[pos - 1];
//     });
//     let clubScore = [];
//     allMatches.map((data: any, index: any) => {
//         const score = {
//             name: clubName[index],
//             score: data.score ? data.score.ft[0] : 0,
//         }
//         clubScore.push(score);
//     })
//     let win = 3,
//         draw = 1,
//         loss = 0;

//     clubName.map((name: any, index: any) => {
//         const standing = {
//             posiion: index,
//             name: name,
//             played: roundno.length,
//             win: win,
//             draw: draw,
//             loss: loss,
//             gf: 3,
//             ga: 2,
//             gd: 1,
//             points: 3,
//         }
//         selectLeagueStanding.push(standing);
//     })
//     return selectLeagueStanding;
// }
// // export const getTeam = async (teamName: any) => {
// //     const filtered = await selectLeagueStanding.filter(
// //         (item: any) => item.name === teamName
// //     );

// //     return filtered;
// // };
// // const ScoreService = {
// //     selectMappedList,
// //     getTeam,
// // };

// // export default ScoreService;
