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
import UserBetHistories from "@/components/ex-game/user-bet-history.ex-game";
import { useSocket } from "@/socket";
import { UserContext } from "@/contexts/user-context";

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

  const [isReloadBetting, setIsReloadBetting] = useState<boolean>(true);

  const [isReloadRoom, setIsReloadRoom] = useState<boolean>(true);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const getBetRoomInfo = async (room_id: string) => {
    try {
      const response = await getRoomById(room_id);
      if (response.status === 200 || response.status === 201) {
        setBetRoom(response.data);
        setIsReloadBetting(!isReloadBetting);
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
      setIsReloadBetting(!isReloadBetting);
    });

    socket.on("bet-history", (msg) => {
      if (msg.roomID === roomID) {
        setIsReloadBetting(!isReloadBetting);
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
          maxHeight: "calc(100vh - 64px)", // Subtract header height
          overflowY: "auto", // Enable vertical scrolling if needed
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 8, xl: 9 }}
            sx={{ height: "100%" }}
          >
            <LiveStreamContainer
              betRoom={betRoom}
              onWagerClick={() => setWagerModalOpen(true)}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
            sx={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
          >
            {betRoom.latestSessionID && roomID && (
              <BetOptionTable
                setOpenBetting={setPlaceBetModalOpen}
                isReloadOption={isReloadOption}
                setIsReloadOption={setIsReloadOption}
                sessionID={betRoom.latestSessionID}
                betRoomID={roomID}
                isReloadBetting={isReloadBetting}
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
        <UserBetHistories
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
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#d7b500",
            pt: 3,
          }}
        >
          Phòng cược đã đóng
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 4, py: 2 }}>
          <Typography sx={{ color: "#E0E0E0", fontSize: "1rem" }}>
            Phòng cược hiện tại đã đóng. Vui lòng rời khỏi và quay lại sau
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={() => {
              handleCloseDialog();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "8px",
              px: 4,
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
