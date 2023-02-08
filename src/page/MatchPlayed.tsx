import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFootballData, selectFootballList } from "../redux/football";
import "../components/table.css";
const MatchPlayed = (props: any) => {
  const dispatch = useDispatch();
  const footballData: any = useSelector(selectFootballList); // whole data name and matches

  //   console.log(footballData);
  // const solved = data1.map((item: any) => item.team1);
  // const round = data1.map((item: any) => item.round);
  // const clubName = solved.sort().filter((item: any, pos: any, ary: any) => {
  //   return !pos || item != ary[pos - 1];
  // });
  // const roundno = round.sort().filter((item: any, pos: any, ary: any) => {
  //   return !pos || item != ary[pos - 1];
  // });
  // let clubScore = [];
  // data1.map((data: any, index: any) => {
  //   const score = {
  //     name: clubName[index],
  //     score: data.score ? data.score.ft[0] : 0,
  //   };
  //   clubScore.push(score);
  // });
  // let win = 3,
  //   draw = 1,
  //   loss = 0;

  // clubName.map((name: any, index: any) => {
  //   const standing = {
  //     posiion: index,
  //     name: name,
  //     played: roundno.length,
  //     win: win,
  //     draw: draw,
  //     loss: loss,
  //     gf: 3,
  //     ga: 2,
  //     gd: 1,
  //     points: 3,
  //   };
  //   selectLeagueStanding.push(standing);
  // });

  useEffect(() => {
    dispatch(fetchFootballData());
  }, []);

  let match = footballData.matches;
  //   console.log(match);

  return (
    <>
      <p>{props.played}</p>
    </>
  );
};

export default MatchPlayed;
