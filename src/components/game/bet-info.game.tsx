"use client";
import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";

interface Bet {
  user: string;
  ratio: string;
  amount: number;
  status: string;
}

const bets: Bet[] = [
  { user: "thanhtest", ratio: "10:10", amount: 100, status: "Đã khớp" },
  { user: "thanhtest1", ratio: "10:10", amount: 100, status: "Đã khớp" },
  // ... (add more as needed)
];

const ScrollContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      height: "300px",
      overflowY: "auto",
      "&::-webkit-scrollbar": { bgcolor: "black", width: "8px" },
      "&::-webkit-scrollbar-thumb": { bgcolor: "#888", borderRadius: "4px" },
      "&::-webkit-scrollbar-thumb:hover": { bgcolor: "#555" },
      "&::-webkit-scrollbar-track": { bgcolor: "#333" },
      "&::-webkit-scrollbar-track-piece": { backgroundColor: "#212529" },
      "&::-webkit-scrollbar-corner": { backgroundColor: "#212529" },
      "&::-webkit-scrollbar-button": { backgroundColor: "#212529" },
      "&::-webkit-scrollbar-thumb:horizontal": { display: "none" },
    }}
  >
    {children}
  </Box>
);

const BetRow: React.FC<{
  bet: Bet;
  onCancel?: () => void;
}> = ({ bet, onCancel }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "0.5px solid #ccc",
      py: 0.5,
    }}
  >
    <Typography
      sx={{ fontSize: 11, width: "100%", color: "#fff", textAlign: "left" }}
    >
      {bet.user}
    </Typography>
    <Typography
      sx={{ fontSize: 11, width: "100%", color: "#fff", textAlign: "center" }}
    >
      {bet.ratio}
    </Typography>
    <Typography
      sx={{ fontSize: 11, width: "100%", color: "#fff", textAlign: "center" }}
    >
      {bet.ratio}
    </Typography>
    <Typography
      sx={{ fontSize: 11, width: "100%", color: "#fff", textAlign: "center" }}
    >
      {bet.amount}
    </Typography>
    <Button
      variant="contained"
      size="small"
      onClick={onCancel}
      sx={{
        fontSize: 10,
        width: "50px",
        px: 0,
        py: 0.1,
        fontWeight: 600,
        backgroundColor: "#ff4242",
      }}
    >
      Huỷ
    </Button>
    {/* Bạn có thể mở lại phần status hoặc thêm button khác ở đây sau */}
  </Box>
);

const BetList: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => (
  <Paper elevation={3} sx={{ p: 1, backgroundColor: "#212529" }}>
    <Typography
      variant="body2"
      gutterBottom
      borderBottom={"1px solid #ccc"}
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        color: "#fff",
      }}
    >
      {title} --{" "}
      <Typography variant="caption" color={color} fontWeight={600}>
        100,00
      </Typography>
    </Typography>
    <ScrollContainer>
      {bets.map((bet, index) => (
        <BetRow
          key={+index}
          bet={bet}
          onCancel={() => console.log("Huỷ", bet)}
        />
      ))}
    </ScrollContainer>
  </Paper>
);

interface BetInfoProps {
  isBetOpen: boolean;
  setIsBetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const slideVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

const BetInfo: React.FC<BetInfoProps> = ({ isBetOpen, setIsBetOpen }) => {
  return (
    <AnimatePresence initial={false}>
      {isBetOpen && (
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#212529",
              position: "relative",
              // overflow: "hidden", // quan trọng để không bị tràn
            }}
          >
            <CloseIcon
              sx={{
                fontSize: 24,
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "white",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setIsBetOpen(false)}
            />
            <BetList title="Số lượt cược đang chờ: 1 (Gà đỏ)" color="#ff4242" />
            <Box sx={{ height: "5px", mx: 2 }} />
            <BetList
              title="Số lượt cược đang chờ: 1 (Gà Xanh)"
              color="#0265ff"
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetInfo;
