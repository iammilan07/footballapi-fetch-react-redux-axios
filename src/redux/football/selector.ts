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
                info[team2].lastgames = [1, ...info[team2].lastgames];//0 = win, 2=lost
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
        const scorea = (a.wins * 3) + a.games - a.wins - a.lose
        const scoreb = (b.wins * 3) + b.games - b.wins - b.lose
        if (scoreb === scorea) {
            return gdb - gda;
        }
        return scoreb - scorea;
    });
    return arrayinfo
}



