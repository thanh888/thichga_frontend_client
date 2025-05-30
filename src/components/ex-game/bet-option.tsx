import React, { useEffect, useState } from "react";
import { Paper, Stack, Box, Typography, Button } from "@mui/material";
import { getOptionsExGameBySession } from "@/services/bet-option.api";
import {
  numberThousand,
  numberThousandFload,
} from "@/utils/function-convert.util";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { UpdateCancelBetExGameHistoryApi } from "@/services/bet-history.api";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/use-user";
import { useSocket } from "@/socket";

interface Props {
  isReloadOption: boolean;
  setIsReloadOption: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenBetting: React.Dispatch<any>;
  sessionID: string;
  betRoomID: string;
  bettingVersion: number;
}

const BetOptionTable = ({
  isReloadOption,
  setIsReloadOption,
  sessionID,
  setOpenBetting,
  betRoomID,
  bettingVersion,
}: Readonly<Props>) => {
  const [options, setOptions] = useState<any[]>([]);
  const { user, checkSession } = useUser();
  const currentUserID = user?._id;
  const socket = useSocket();

  const getBetOptions = async () => {
    try {
      const response = await getOptionsExGameBySession(sessionID);
      if (response.status === 200 || response.status === 201) {
        setOptions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancleBetExGame = async (betHistory: BettingHistoryInterface) => {
    try {
      const response = await UpdateCancelBetExGameHistoryApi(
        betHistory._id,
        betHistory
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Hủy cược thành công");
        setIsReloadOption(true);
        checkSession?.();
        socket?.emit("bet-history", { roomID: betRoomID });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isReloadOption) {
      getBetOptions();
      setIsReloadOption(false);
    }
  }, [isReloadOption]);

  useEffect(() => {
    getBetOptions();
  }, [bettingVersion]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 2,
        position: "relative",
        bgcolor: "#222222",
        overflowY: "auto",
        overflowX: "auto",
        maxHeight: {
          xs: "calc(100vh - 50vh)",
          sm: "calc(100vh - 70vh)",
          md: "calc(100vh - 100px)",
        },
        "&::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d7b500",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#333",
        },
      }}
    >
      {options.length === 0 && (
        <Box
          sx={{
            color: "#d7b500",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            p: 1,
            mb: 1,
            height: "100%",
          }}
        >
          <Typography variant="body1">Không có kèo nào được tạo</Typography>
        </Box>
      )}
      {options?.map((option, idx) => {
        const hasUnmatchedOfCurrentUser = option?.unmatchedBets?.find(
          (item: any) => item.creatorID === currentUserID
        );

        return (
          <Box
            key={+idx}
            sx={{
              bgcolor: "#000",
              color: "#d7b500",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              p: 1,
              mb: 1,
              height: "100%",
              border: "2px solid #d7b500",
            }}
          >
            {/* Tỉ lệ cược */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography color="#0D85D8" fontWeight={700} fontSize={24}>
                  {option?.lost}
                </Typography>
                <Typography fontWeight={700} fontSize={24}>
                  :
                </Typography>
                <Typography color="#B6080D" fontWeight={700} fontSize={24}>
                  {option?.win}
                </Typography>
              </Stack>

              <Box
                sx={{
                  width: "60%",
                  textAlign: "center",
                  border: "2px solid white",
                  borderRadius: 8,
                  backgroundColor:
                    option?.teamMissing === TeamEnum.RED
                      ? "#B6080D"
                      : "#0E3B8A",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={18}
                  color="white"
                >
                  {numberThousand(option?.profitMissing) ?? 0}
                </Typography>
              </Box>
            </Box>

            {/* Tổng / Chờ / Khớp */}
            <Box
              sx={{ display: "flex", overflow: "hidden", alignItems: "center" }}
            >
              <Box display="flex" gap={0.5}>
                <Button
                  sx={{
                    border: "2px solid white",
                    borderRadius: "20px",
                    color: "white",
                    fontWeight: 600,
                    fontSize: 10,
                    height: "32px",
                  }}
                  onClick={() => setOpenBetting(option)}
                >
                  Cược
                </Button>

                {hasUnmatchedOfCurrentUser && (
                  <Button
                    sx={{
                      border: "2px solid white",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: 600,
                      fontSize: 10,
                      height: "32px",
                    }}
                    onClick={() =>
                      handleCancleBetExGame(hasUnmatchedOfCurrentUser)
                    }
                  >
                    Hủy
                  </Button>
                )}
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                flexGrow={1}
              >
                <Box display="flex" justifyContent="center" overflow="hidden">
                  <Typography fontWeight={600} color={"white"} fontSize={12}>
                    Tổng
                  </Typography>
                  <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }} />
                  <Typography fontWeight={600} color={"white"} fontSize={12}>
                    Chờ
                  </Typography>
                  <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }} />
                  <Typography fontWeight={600} color={"white"} fontSize={12}>
                    Khớp
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" overflow="hidden">
                  <Typography fontWeight={600} color={"white"} fontSize={14}>
                    {numberThousandFload(option?.totalMoney) ?? 0}
                  </Typography>
                  <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }} />
                  <Typography fontWeight={600} color={"white"} fontSize={14}>
                    {numberThousandFload(option?.moneyMissing) ?? 0}
                  </Typography>
                  <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }} />
                  <Typography fontWeight={600} color={"white"} fontSize={14}>
                    {numberThousandFload(option?.moneyMatched) ?? 0}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};

export default BetOptionTable;
