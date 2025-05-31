"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import HeaderExGame from "@/components/ex-game/header.ex-game";
import LiveStreamContainer from "@/components/ex-game/live-stream.ex-game";
import BetOptionTable from "@/components/ex-game/bet-option";
import WagerModal from "@/components/ex-game/WagerModal";
import PlaceBetModal from "@/components/ex-game/PlaceBetModal";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { getListOtherRoomsOpening, getRoomById } from "@/services/room.api";
import { useParams } from "next/navigation";
import { useSocket } from "@/socket";
import { UserContext } from "@/contexts/user-context";
import UserBetExGameHistories from "@/components/ex-game/user-bet-history.ex-game";

export default function ExGameDetailPage(): React.JSX.Element {
  const [isReloadOption, setIsReloadOption] = useState<boolean>(true);

  const [isWagerModalOpen, setWagerModalOpen] = useState<boolean>(false);

  const [isPlaceBetModalOpen, setPlaceBetModalOpen] = useState<any>(null);

  const [isHistoryModalOpen, setHistoryModalOpen] = useState<boolean>(false);

  const param = useParams();
  const checkSession = useContext(UserContext)?.checkSession;
  const roomID = param?.id?.toString();
  const [betRoom, setBetRoom] = useState<BettingRoomInterface>(
    {} as BettingRoomInterface
  );

  const [bettingVersion, setBettingVerion] = useState<number>(0);

  const [isReloadRoom, setIsReloadRoom] = useState<boolean>(true);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const getBetRoomInfo = async (room_id: string) => {
    try {
      const response = await getRoomById(room_id);
      if (response.status === 200 || response.status === 201) {
        setBetRoom(response.data);
        setBettingVerion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomID && isReloadRoom) {
      getBetRoomInfo(roomID);
      setIsReloadRoom(false);
    }
  }, [roomID, isReloadRoom]);

  const socket = useSocket();

  const checkRoomClosed = async () => {
    try {
      const response = await getListOtherRoomsOpening();
      if (response.status === 200 || response.status === 201) {
        let checkIsClosed = true;
        response?.data?.find((item: BettingRoomInterface) => {
          if (item._id === roomID) {
            checkIsClosed = false;
          }
          return false;
        });
        setIsClosed(checkIsClosed);
        if (checkSession) {
          await checkSession(); // Update user session if needed
        }
        setIsReloadRoom(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    if (!roomID) return;

    socket.on("update-room", async (msg) => {
      await checkRoomClosed();
      setIsReloadOption(true);
      setBettingVerion((prev) => prev + 1);
    });

    socket.on("bet-history", (msg) => {
      console.log("room: ", msg.roomID === roomID);

      if (msg.roomID === roomID) {
        setBettingVerion((prev) => prev + 1);
      }
    });

    return () => {
      socket.off("update-room");
      socket.off("bet-history");
    };
  }, [socket, roomID]);

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (isClosed) {
      const timer = setTimeout(() => {
        setIsClosed(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isClosed]);

  return (
    <Box sx={{ bgcolor: "black", minHeight: "100vh", overflow: "hidden" }}>
      <HeaderExGame
        onHistoryClick={() => setHistoryModalOpen(true)}
        roomName={betRoom.roomName}
      />
      <Box
        component="main"
        sx={{
          p: 1,
          mx: "auto",
          maxWidth: "xl",
          maxHeight: "calc(100vh)", // Subtract header height
          overflow: "hidden", // Enable vertical scrolling if needed
          pt: "64px",
          position: "fixed",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 8, xl: 9 }}
            sx={{
              height: {
                // xs: "calc(100vh - 50vh)",
                sm: "calc(100vh - 40vh)",
                md: "100%",
              },
            }}
          >
            <LiveStreamContainer
              betRoom={betRoom}
              onWagerClick={() => setWagerModalOpen(true)}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
            sx={{ overflowY: "auto" }}
          >
            {betRoom.latestSessionID && roomID && (
              <BetOptionTable
                setOpenBetting={setPlaceBetModalOpen}
                isReloadOption={isReloadOption}
                setIsReloadOption={setIsReloadOption}
                sessionID={betRoom.latestSessionID}
                betRoomID={roomID}
                bettingVersion={bettingVersion}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      {betRoom.latestSessionID && roomID && (
        <WagerModal
          open={isWagerModalOpen}
          onClose={() => setWagerModalOpen(false)}
          sessionID={betRoom.latestSessionID}
          setIsReloadOption={setIsReloadOption}
          betRoomID={roomID}
        />
      )}
      {betRoom.latestSessionID && roomID && (
        <PlaceBetModal
          open={isPlaceBetModalOpen}
          onClose={() => setPlaceBetModalOpen(false)}
          sessionID={betRoom.latestSessionID}
          setIsReloadOption={setIsReloadOption}
          betRoomID={roomID}
        />
      )}
      {betRoom.latestSessionID && (
        <UserBetExGameHistories
          betHistoryDialogOpen={isHistoryModalOpen}
          setBetHistoryDialogOpen={setHistoryModalOpen}
        />
      )}

      <Dialog
        open={isClosed}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            backgroundColor: "#1E2A44",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "#d7b500",
            py: 3,
          }}
        >
          Kết thúc
        </DialogTitle>
      </Dialog>
    </Box>
  );
}
