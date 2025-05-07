import { TypeBetRoomEnum } from "../enum/type-bet-room.enum";
import { UrlTypeEnum } from "../enum/url-type.enum";

// Interface for the BettingRoom document
export interface BettingRoomInterface {
  _id?: string;
  // Name of the betting room
  roomName?: string;

  // Thumbnail image URL or identifier
  thumbnail?: string;

  // URL for live streaming
  urlLive?: string;

  // Type of URL (e.g., JFRAME, OTHER)
  urlType?: UrlTypeEnum | string;

  // Fee percentage (0-100%)
  fee?: number;

  // URL or identifier for chatting iframe
  chattingJframe?: string;

  // Marquee text (e.g., scrolling announcement)
  marquee?: string;

  // Name of the red team or option
  redName?: string;

  // Name of the blue team or option
  blueName?: string;

  // Text displayed in the center
  centerText?: string;

  // Text displayed on the left
  leftText?: string;

  // Text displayed on the right
  rightText?: string;

  redOdds?: number;

  blueOdds?: number;

  typeRoom?: TypeBetRoomEnum;

  // Whether the room is open
  isOpened?: boolean;

  // Whether betting is accepted
  isAcceptBetting?: boolean;

  latestSessionID?: string;

  // Timestamp when the betting room was created
  createdAt?: Date | string;

  // Timestamp when the betting room was last updated
  updatedAt?: Date;
}
