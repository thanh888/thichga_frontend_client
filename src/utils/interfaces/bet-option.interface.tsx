import { TeamEnum } from "../enum/team.enum";

// Interface for the BettingOption document
export interface BettingOptionInterface {
  _id: string;
  // ID of the betting session associated with this option
  betSessionID?: string;

  // ID of the user who created the bet option
  makerID?: string;

  // Unique code for the bet option
  code?: string;

  // Selected team for the bet (e.g., RED, BLUE)
  selectedTeam?: TeamEnum;

  // Odds for the red team
  win?: number;

  // Odds for the blue team
  lost?: number;

  // Timestamp when the bet option was created
  createdAt?: Date;

  // Timestamp when the bet option was last updated
  updatedAt?: Date;
}
