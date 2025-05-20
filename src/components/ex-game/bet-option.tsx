import React from "react";
import { Paper } from "@mui/material";
import { Box, Typography, Button, Grid } from "@mui/material";

const BetOptionTable = () => {
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
      {[...Array(16)].map((_, idx) => (
        <BetOptionItem key={idx} />
      ))}
    </Paper>
  );
};

export default BetOptionTable;

interface BetOptionItemProps {
  odds?: string;
  total?: string;
  matched?: string;
  pending?: string;
}

const BetOptionItem: React.FC<BetOptionItemProps> = ({
  odds = "6.6:6.6",
  total = "700.000",
  matched = "700.000",
  pending = "700.000",
}) => {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "#d7b500",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: "4px",
        mb: 1,
        height: "100%",
        border: "2px solid #d7b500",
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          align="center"
          sx={{ fontSize: 24, textWrap: "nowrap" }}
        >
          {odds}
        </Typography>

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "blue",
            border: "2px solid white",
            mt: "2px",
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" fontWeight={600} fontSize={18}>
            {total}
          </Typography>
        </Box>
      </Box>

      {/* Tổng / Khớp / Chờ */}
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <Box display="flex" gap={1}>
          <Button
            sx={{
              border: "2px solid white",
              borderRadius: "20px",
              color: "white",
              fontWeight: 600,
              fontSize: 12,
              m: 0,
              p: 0,
              height: "40px",
            }}
          >
            Cược
          </Button>
          <Button
            sx={{
              border: "2px solid white",
              borderRadius: "20px",
              color: "white",
              fontWeight: 600,
              fontSize: 12,
              height: "40px",
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
            <Typography fontWeight={600} fontSize={12}>
              Tổng
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} fontSize={12}>
              Chờ
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} fontSize={12}>
              Khớp
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            mt={0.5}
            overflow={"hidden"}
          >
            <Typography fontWeight={600} fontSize={14}>
              {total}
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} fontSize={14}>
              {matched}
            </Typography>
            <Box sx={{ width: "2px", bgcolor: "white", m: "2px" }}></Box>
            <Typography fontWeight={600} fontSize={14}>
              {pending}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
