import { StatusGame } from "../enum/status-game.enum";
import { TypGameEnum } from "../enum/type-game.enum";

// Interface for the BankInteface document
export interface GameInterface {
  _id: string;
  name: string;
  image: string;
  status: StatusGame | string;
  description: string;
  typeGame: TypGameEnum;
}
