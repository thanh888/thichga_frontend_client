"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import {
  CardContent,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  SelectChangeEvent,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DefaultMoney, rates } from "@/utils/constans";
import { useUser } from "@/hooks/use-user";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { TeamEnum } from "@/utils/enum/team.enum";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";
import { toast } from "react-toastify";
import { createBetHistoryApi } from "@/services/auth/bet-history.api";
import { useSocket } from "@/socket";
import { sampleMoneys } from "@/utils/function-convert.util";

interface Props {
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  betRoom?: BettingRoomInterface;
}

const slideVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export default function CommentComponent({
  isCommentOpen,
  setIsCommentOpen,
  betRoom,
}: Readonly<Props>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ backgroundColor: "#101828" }}>
      <AnimatePresence initial={false}>
        {isCommentOpen && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Box
              sx={{
                backgroundColor: "#212121",
                borderRadius: 2,
                height: { xs: "300px", sm: "400px" },
                position: "relative",
              }}
            >
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  cursor: "pointer",
                  color: "black",
                  fontSize: 24,
                  zIndex: 2,
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                onClick={() => setIsCommentOpen(false)}
                fontSize="large"
              />
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  height: "54px",
                  zIndex: 1,
                  bgcolor: "#212121",
                  width: "100%",
                  px: 2,
                  py: 1,
                  color: "white",
                  borderBottom: "1px solid white",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Bình luận trực tuyến
              </Typography>
              {betRoom?.chattingJframe && (
                <Box
                  sx={{
                    paddingTop: "54px",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={betRoom.chattingJframe}
                    width="100%"
                    height={isMobile ? "246px" : "346px"}
                    allow="autoplay"
                    frameBorder="0"
                    scrolling="auto"
                    title="Live Comments"
                  />
                </Box>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
