import { ref } from "vue";
import axios from "axios";

import type Roll from "@/interfaces/roll";

export const useRoll = () => {
  const error = ref(null);
  const rolls = ref<Roll[]>([]);
  const roll = ref<Roll>();

  const fetchRolls = async () => {
    const response = await axios.get("/rolls");
    rolls.value = response.data;
  };

  const fetchRollFromBet = async (bet: number) => {
    const response = await axios.get(`/bets/${bet}/roll`);
    roll.value = {
      betCount: response.data.bet_count,
      redBetCount: response.data.red_bet_count,
      blackBetCount: response.data.black_bet_count,
      greenBetCount: response.data.green_bet_count,
      ...response.data,
    };
  };

  return { error, fetchRolls, rolls, fetchRollFromBet, roll };
}
