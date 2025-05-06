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
  ListItem,
  List,
  Divider,
  ListItemText,
  Avatar,
} from "@mui/material";
import { DefaultMoney, rates } from "@/utils/constans";

interface GameHeaderProps {
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const slideVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export default function BetControls({
  isCommentOpen,
  setIsCommentOpen,
}: Readonly<GameHeaderProps>) {
  const [formData, setFormData] = useState({
    win: "10",
    lost: "10",
    money: "100",
  });

  const handleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Removed duplicate state declaration for isCommentOpen and setIsCommentOpen

  return (
    <Box sx={{ backgroundColor: "#101828" }}>
      <CardContent sx={{ backgroundColor: "#212121", borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl fullWidth>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ccc",
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  id="lable_ratio"
                  sx={{ color: "black" }}
                  textAlign={"center"}
                  width={"100%"}
                >
                  Đặt
                </Typography>
                <Select
                  id="lost"
                  value={formData.lost}
                  name="lost"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    "& .MuiSelect-select": {
                      py: 1, // padding top-bottom nhỏ lại
                    },
                  }}
                  onChange={handleSelect}
                >
                  {rates.map((item, index) => (
                    <MenuItem key={+index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ccc",
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  id="lable_ratio"
                  sx={{ color: "black" }}
                  textAlign={"center"}
                  width={"100%"}
                >
                  Ăn
                </Typography>
                <Select
                  id="win"
                  name="win"
                  value={formData.win}
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    "& .MuiSelect-select": {
                      py: 1, // padding top-bottom nhỏ lại
                    },
                  }}
                  onChange={handleSelect}
                >
                  {rates.map((item, index) => (
                    <MenuItem key={+index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #ccc",
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  id="lable_money"
                  sx={{ color: "black" }}
                  textAlign={"center"}
                  width={"auto"}
                  whiteSpace={"nowrap"}
                  px={1}
                >
                  Số tiền
                </Typography>
                <TextField
                  id="money"
                  name="money"
                  type="number"
                  value={formData.money}
                  onChange={(e) =>
                    setFormData({ ...formData, money: e.target.value })
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    border: "none",
                    outline: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:focus .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& input": {
                      textAlign: "center", // Căn giữa văn bản trong input
                      border: "none",
                      outline: "none",
                      "&:focus": {
                        outline: "none", // Loại bỏ outline khi focus
                      },
                    },
                    "& .MuiInputBase-root": {
                      border: "none", // Loại bỏ border
                    },
                  }}
                  InputProps={{
                    sx: {
                      "& input": {
                        textAlign: "center", // Căn giữa văn bản trong input
                      },
                    },
                  }}
                />
                <Select
                  id="money"
                  name="money"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    m: 0,
                    p: 0,
                    "& .MuiSelect-select": {
                      py: 1, // padding top-bottom nhỏ lại
                    },
                  }}
                  onChange={handleSelect}
                  value={" "}
                >
                  {DefaultMoney.map((item, index) => (
                    <MenuItem key={+index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                border: "1px solid #ccc",
                bgcolor: "white",
                px: 1,
                py: 2,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                id="lable_ratio"
                textAlign={"left"}
                width={"100%"}
                color="#ff4242"
                fontWeight={500}
              >
                Gà đỏ
              </Typography>
              <Typography
                variant="body2"
                id="lable_ratio"
                sx={{ color: "black" }}
                textAlign={"center"}
                width={"100%"}
                fontSize={14}
              >
                {formData?.win} : {formData?.lost}
              </Typography>
              <Typography
                variant="body2"
                id="lable_ratio"
                textAlign={"right"}
                width={"100%"}
                fontWeight={500}
                color="#0265ff"
              >
                Gà xanh
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={12}
            sx={{ display: "flex", justifyContent: "center", gap: 1 }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "100%", py: 1, fontWeight: 500 }}
            >
              Name Red
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", py: 1, fontWeight: 500 }}
            >
              Name Blue
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          my: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: "60%",
            textAlign: "center",
            mx: "auto",
            borderRadius: 2,
            backgroundColor: "#ffeb3b",
            fontWeight: 600,
            color: "black",
            "&:hover": {
              backgroundColor: "#ffeb3b",
              color: "black",
            },
            animation: "beat .25s infinite alternate",
            transformOrigin: "center",
            "@keyframes beat": {
              "0%": {
                transform: "scale(1)",
              },
              "100%": {
                transform: "scale(1.05)",
              },
            },
          }}
        >
          Đặt cược
        </Button>
      </Box>

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
                height: "400px",
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
                }}
              >
                Bình luận trực tuyến
              </Typography>
              <Box
                sx={{
                  overflowY: "auto",
                  height: "100%",
                }}
              >
                <List sx={{ paddingTop: "54px" }}>
                  {fakeComments.map((cmt) => (
                    <React.Fragment key={cmt.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{ alignItems: "center" }}
                      >
                        <Avatar sx={{ mr: 2 }}>{cmt.name[0]}</Avatar>
                        <ListItemText
                          color="white"
                          primary={cmt.name}
                          sx={{ color: "white" }}
                          secondary={
                            <Typography variant="body2" color="white">
                              {cmt.comment}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider sx={{ bgcolor: "#444" }} />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

const fakeComments = [
  { id: 1, name: "Tuấn", comment: "Trận này căng lắm nha anh em!" },
  { id: 2, name: "Linh", comment: "Tôi đặt cửa trên!" },
  { id: 3, name: "Hùng", comment: "Xem kèo hơi rén đấy 😅" },
  { id: 4, name: "Mai", comment: "Có ai hóng highlight không?" },
  { id: 5, name: "Long", comment: "Đặt 500k cửa dưới luôn!" },
  { id: 6, name: "Duy", comment: "Ngon, win rồi ae!" },
  { id: 7, name: "Thảo", comment: "Bắt kèo phút 80 vẫn kịp!" },
  { id: 8, name: "Nam", comment: "Vãi cả plot twist 😮" },
  { id: 9, name: "Bình", comment: "GG anh em, mai chơi tiếp!" },
];
