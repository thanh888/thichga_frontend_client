"use client";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { BettingRoomInterface } from "@/utils/interfaces/bet-room.interface";

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

  // 💻 Desktop layout
  const DesktopComment = (
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
                  title="Live Comments"
                />
              </Box>
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // 📱 Mobile dialog layout
  const MobileComment = (
    <Dialog
      open={isCommentOpen}
      onClose={() => {}}
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: 0,
          m: 0,
          bgcolor: "#212121",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          maxHeight: "50vh",
          width: "100%",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
      BackdropProps={{
        sx: { backgroundColor: "transparent" },
      }}
      sx={{
        pointerEvents: "none",
        "& .MuiDialog-paper": {
          pointerEvents: "auto",
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 1, sm: 2 }, position: "relative" }}>
        <IconButton
          onClick={() => setIsCommentOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            bgcolor: "rgba(255,255,255,0.2)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            height: "54px",
            zIndex: 1,
            color: "white",
            fontSize: "1rem",
            mb: 1,
          }}
        >
          Bình luận trực tuyến
        </Typography>
        {betRoom?.chattingJframe && (
          <Box
            sx={{
              height: "246px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={betRoom.chattingJframe}
              width="100%"
              height="100%"
              allow="autoplay"
              title="Live Comments"
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <Box sx={{ backgroundColor: "#101828" }}>
      {isMobile ? MobileComment : DesktopComment}
    </Box>
  );
}
