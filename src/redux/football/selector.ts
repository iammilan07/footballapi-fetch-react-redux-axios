import { RootState } from "../Store";

export const selectFootballList: any = (state: RootState) => state.footballDataList.footballData;

export const selectLoading = (state: RootState) => state.footballDataList.loading;


export const selectMappedList = (state: RootState) => {

    const data: any = state.footballDataList.footballData;

    const { matches } = data;
    const info: any = {};
    if (matches && matches.length > 0) {
        matches.forEach((item: any) => {
            const { team1, team2, score } = item;
            if (!info[team1]) {
                info[team1] = {
                    wins: 0,
                    lose: 0,
                    games: 0,
                    lastGames: [],
                    goalAgainst: 0,
                    goalConcede: 0,

                };
            }
            if (!info[team2]) {
                info[team2] = {
                    wins: 0,
                    games: 0,
                    lose: 0,
                    lastGames: [],
                    goalAgainst: 0,
                    goalConcede: 0,
                };
            }
            if (!score) {
                return;
            }
            const { ft } = score;

            info[team1].games++;
            info[team2].games++;
            info[team1].goalAgainst = info[team1].goalAgainst + ft[0];
            info[team2].goalAgainst = info[team2].goalAgainst + ft[1];
            info[team1].goalConcede = info[team1].goalConcede + ft[1];
            info[team2].goalConcede = info[team2].goalConcede + ft[0];

            if (ft[0] === ft[1]) {
                info[team1].lastGames = ["d", ...info[team1].lastGames];
                info[team2].lastGames = ["d", ...info[team2].lastGames];
            } else if (ft[0] > ft[1]) {
                info[team1].wins++;
                info[team2].lose++;
                info[team1].lastGames = ["w", ...info[team1].lastGames];
                info[team2].lastGames = ["l", ...info[team2].lastGames];
            } else {
                info[team2].wins++;
                info[team1].lose++;
                info[team1].lastGames = ["l", ...info[team1].lastGames];
                info[team2].lastGames = ["w", ...info[team2].lastGames];
            }
        });
    }

    const arrayinfo: any = [];
    Object.entries(info).forEach(([key, value]) => {
        arrayinfo.push({
            name: key,
            ...info[key]
        })
    })

    arrayinfo.sort((a: any, b: any) => {
        const gda = a.goalAgainst - a.goalConcede;
        const gdb = b.goalAgainst - b.goalConcede;
        const scorea = (a.wins * 3) + a.games - a.wins - a.lose
        const scoreb = (b.wins * 3) + b.games - b.wins - b.lose
        if (scoreb === scorea) {
            return gdb - gda;
        }
        return scoreb - scorea;
    });
    return arrayinfo
}


//Rough
 // for (const key in info) {
    //     arrayinfo.push({
    //         name: key,
    //         ...info[key],
    //     });
    // }