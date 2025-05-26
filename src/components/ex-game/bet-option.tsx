import React, { useEffect, useState } from "react";
import { Paper, Stack } from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import { BettingOptionInterface } from "@/utils/interfaces/bet-option.interface";
import { getOptionsExGameBySession } from "@/services/bet-option.api";
import { numberThousand } from "@/utils/function-convert.util";
import { TeamEnum } from "@/utils/enum/team.enum";
interface Props {
  isReloadOption: boolean;
  setIsreloadOption: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenBetting: React.Dispatch<any>;
  sessionID: string;
}

const BetOptionTable = ({
  isReloadOption,
  setIsreloadOption,
  sessionID,
  setOpenBetting,
}: Readonly<Props>) => {
  const [options, setOptions] = useState<BettingOptionInterface[]>([]);

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

  useEffect(() => {
    if (isReloadOption) {
      getBetOptions();
      setIsreloadOption(false);
    }
  }, [isReloadOption]);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        // border: "4px solid #d7b500",
        borderRadius: 2,
        position: "relative",
        bgcolor: "#222222",
        overflowY: "auto",
        overflowX: "auto",
        maxHeight: {
          xs: "calc(100vh - 200px)",
          sm: "calc(100vh - 150px)",
          lg: "calc(100vh - 100px)",
        }, // Adjust height based on screen size
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
      {options?.map((item, idx) => (
        <BetOptionItem key={+idx} bet={item} setOpenBetting={setOpenBetting} />
      ))}
    </Paper>
  );
};

export default BetOptionTable;

interface BetOptionItemProps {
  bet: any;
  setOpenBetting: React.Dispatch<any>;
}

const BetOptionItem: React.FC<BetOptionItemProps> = ({
  bet,
  setOpenBetting,
}) => {
  return (
    <Box
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
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography color="#0D85D8" fontWeight={700} fontSize={24}>
            {bet?.lost}
          </Typography>
          <Typography fontWeight={700} fontSize={24}>
            :
          </Typography>
          <Typography color="#B6080D" fontWeight={700} fontSize={24}>
            {bet?.win}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "60%",
            textAlign: "center",
            border: "2px solid white",
            // mx: "auto",
            borderRadius: 8,
            backgroundColor:
              bet?.teamMissing === TeamEnum.RED ? "#B6080D" : "#0E3B8A",
          }}
        >
          <Typography variant="h6" fontWeight={600} fontSize={18} color="white">
            {numberThousand(bet?.profitMissing) ?? 0}
          </Typography>
        </Box>
      </Box>

      {/* Tổng / Khớp / Chờ */}
      <Box sx={{ display: "flex", overflow: "hidden", alignItems: "center" }}>
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
            onClick={() => setOpenBetting(bet)}
          >
            Cược
          </Button>
          <Button
            sx={{
              border: "2px solid white",
              borderRadius: "20px",
              color: "white",
              fontWeight: 600,
              fontSize: 10,
              height: "32px",
            }}
          >
            Hủy
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection={"column"}
          flexGrow={1}
        >
          <Box display="flex" justifyContent="center" overflow={"hidden"}>
            <Typography fontWeight={600} color={"white"} fontSize={12}>
              Tổng
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} color={"white"} fontSize={12}>
              Chờ
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} color={"white"} fontSize={12}>
              Khớp
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" overflow={"hidden"}>
            <Typography fontWeight={600} color={"white"} fontSize={14}>
              {numberThousand(bet?.totalMoney) ?? 0}
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} color={"white"} fontSize={14}>
              {numberThousand(bet?.moneyMissing) ?? 0}
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} color={"white"} fontSize={14}>
              {numberThousand(bet?.moneyMatched) ?? 0}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
