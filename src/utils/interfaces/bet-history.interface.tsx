// src/interfaces/bet-history.interface.ts

import { BetHistoryStatusEnum } from "../enum/bet-history-status.enum";
import { BetResultEnum } from "../enum/bet-result.enum";
import { TeamEnum } from "../enum/team.enum";

export interface BettingHistoryInterface {
  _id: string;

  betSessionID: any;

  betRoomID: string;

  creatorID?: any;

  money?: number;

  revenue?: number;

  selectedTeam?: TeamEnum;

  status?: BetHistoryStatusEnum;

  red_odds?: number;

  blue_odds?: number;

  win?: number;

  lost?: number;

  matchedUserId?: any;

  code?: string;

  betOptionID?: any;

  userResult?: BetResultEnum;

  systemProfit?: number;

  userProfit?: number;

  systemRevenue?: number;

  userRevenue?: number;

  moneyWin?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
