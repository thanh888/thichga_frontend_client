"use client";

import React, { useContext, useEffect, useState } from "react";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { TeamEnum } from "@/utils/enum/team.enum";
import { TypeBetRoomEnum } from "@/utils/enum/type-bet-room.enum";
import {
  convertDateTime,
  ConvertMoneyVND,
} from "@/utils/function-convert.util";
import {
  Box,
  Button,
  Card,
  Divider,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Tabs,
  Tab,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { paginateBetHistoryByUserIDApi } from "@/services/bet-history.api";
import { BetResultEnum } from "@/utils/enum/bet-result.enum";
import { UserContext } from "@/contexts/user-context";

const listResultHistory = [
  { value: BetResultEnum.WIN, label: "Thắng" },
  { value: BetResultEnum.LOSE, label: "Thua" },
  { value: BetResultEnum.DRAW, label: "Hòa" },
  { value: BetResultEnum.CANCEL, label: "Hủy" },
];

// Define interface for table columns
interface Column {
  id: keyof BettingHistoryInterface | "odds" | "roomName";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number | undefined) => string;
}

const columns: Column[] = [
  { id: "code", label: "Mã cược", minWidth: 80, align: "left" },
  { id: "roomName", label: "Trận đấu", minWidth: 100, align: "left" },
  {
    id: "money",
    label: "Số tiền (VND)",
    minWidth: 120,
    align: "right",
    format: (value: number | undefined) =>
      value != null ? value.toLocaleString("vi-VN") : "N/A",
  },
  { id: "odds", label: "Tỷ lệ cược", minWidth: 100, align: "right" },
  { id: "selectedTeam", label: "Đội chọn", minWidth: 150, align: "left" },
  {
    id: "userProfit",
    label: "Lợi nhuận",
    minWidth: 120,
    align: "left",
  },
  { id: "userResult", label: "Kết quả", minWidth: 150, align: "left" },
  { id: "status", label: "Trạng thái", minWidth: 150, align: "left" },
  { id: "createdAt", label: "Thời gian", minWidth: 120, align: "center" },
];

export default function UserBetHistories({
  betHistoryDialogOpen,
  setBetHistoryDialogOpen,
}: Readonly<{
  betHistoryDialogOpen: boolean;
  setBetHistoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const [bets, setBets] = useState<{
    docs: BettingHistoryInterface[];
    totalDocs: number;
  }>({
    docs: [],
    totalDocs: 0,
  });
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<{ roomName: string; status: string }>({
    roomName: "",
    status: "",
  });
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof BettingHistoryInterface>("createdAt");
  const [tabValue, setTabValue] = useState<TypeBetRoomEnum>(
    TypeBetRoomEnum.OTHER
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchBets = async () => {
    if (!user?._id) {
      setError("Vui lòng đăng nhập để xem lịch sử cược.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const sortQuery =
        order === "asc" ? String(orderBy) : `-${String(orderBy)}`;
      const query = `limit=${rowsPerPage}&skip=${page * rowsPerPage}&search=${
        filter.roomName
      }&status=${filter.status}&sort=${sortQuery}`;
      const response = await paginateBetHistoryByUserIDApi(user._id, query);
      if (response.status === 200 || response.status === 201) {
        setBets(response.data);
      } else {
        setError("Không thể tải lịch sử cược, vui lòng thử lại.");
      }
    } catch (err: any) {
      console.error("Failed to fetch bet history:", err);
      setError(
        err.response?.data?.message ||
          "Không thể tải lịch sử cược, vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (betHistoryDialogOpen) {
      fetchBets();
    }
  }, [betHistoryDialogOpen, filter, page, rowsPerPage, order, orderBy]);

  const handleRequestSort = (property: keyof BettingHistoryInterface) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseBetHistoryDialog = () => {
    setBetHistoryDialogOpen(false);
    setFilter({ roomName: "", status: "" });
    setTabValue(TypeBetRoomEnum.SOLO);
    setPage(0);
    setBets({ docs: [], totalDocs: 0 });
  };

  // Filter bets by typeRoom and roomName on the frontend
  const filteredBets = bets.docs.filter((bet) => {
    const matchesTypeRoom = bet.betSessionID?.betRoomID?.typeRoom === tabValue;
    const matchesRoomName =
      filter.roomName === "" ||
      bet.betSessionID?.betRoomID?.roomName
        ?.toLowerCase()
        .includes(filter.roomName.toLowerCase());
    return matchesTypeRoom && matchesRoomName;
  });

  return (
    <Dialog
      open={betHistoryDialogOpen}
      onClose={handleCloseBetHistoryDialog}
      fullScreen={isMobile}
      maxWidth="xl"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "white",
          color: "black",
          borderRadius: { xs: 0, sm: "8px" },
          maxWidth: "100%",
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h6"
          fontWeight={500}
          mb={{ xs: 1, sm: 2 }}
          fontSize={{ xs: "1rem", sm: "1.25rem" }}
          textAlign="center"
        >
          Lịch sử cược
        </Typography>

        <Card sx={{ bgcolor: "white" }}>
          <Box
            sx={{ p: 2, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <TextField
              label="Tìm theo tên phòng"
              name="roomName"
              value={filter.roomName}
              onChange={handleFilterChange}
              size="small"
              sx={{
                width: "50%",
                "& .MuiInputBase-input": { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
            />
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={+index}
                      align={column.align}
                      sx={{ minWidth: column.minWidth, color: "black" }}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() =>
                          handleRequestSort(
                            column.id as keyof BettingHistoryInterface
                          )
                        }
                        sx={{
                          color: "black",
                          "&.Mui-active": { color: "black" },
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBets.length > 0 ? (
                  filteredBets.map((row: BettingHistoryInterface) => (
                    <TableRow hover key={row._id}>
                      <TableCell sx={{ color: "black" }}>
                        <Stack
                          sx={{ alignItems: "center" }}
                          direction="row"
                          spacing={2}
                        >
                          <Typography variant="subtitle2">
                            {row?.code}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>
                        {row?.betSessionID?.betRoomID?.roomName ?? "NaN"}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black" }}>
                        {columns
                          .find((col) => col.id === "money")
                          ?.format?.(row?.money) || row?.money}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black" }}>
                        {row?.win}:{row?.lost}
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>
                        <Typography
                          variant="caption"
                          bgcolor={
                            row?.selectedTeam === TeamEnum.BLUE
                              ? "#33bfff"
                              : "#e57373"
                          }
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {row?.selectedTeam === TeamEnum.BLUE
                            ? "Gà xanh"
                            : "Gà đỏ"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>
                        <Typography
                          variant="caption"
                          bgcolor={
                            (row?.userProfit ?? 0) >= 0 ? "#1de9b6" : "#e57373"
                          }
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {ConvertMoneyVND(row?.userProfit ?? 0)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {listResultHistory.find(
                            (item: any) => item.value === row?.userResult
                          )?.label || "Đang chờ"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {row?.status === BetHistoryStatusEnum.MATCHED
                            ? "Đã khớp"
                            : "Chưa khớp"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>
                        {convertDateTime(row?.createdAt?.toString() || "")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      Không có cược nào để hiển thị
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
          <Divider sx={{ borderColor: "black" }} />
          <TablePagination
            component="div"
            count={filteredBets.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              color: "black",
              "& .MuiTablePagination-selectLabel": { color: "#black" },
              "& .MuiTablePagination-displayedRows": { color: "black" },
              "& .MuiTablePagination-actions button": { color: "#black" },
            }}
          />
        </Card>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: { xs: 2, sm: 3 } }}>
        <Button
          onClick={handleCloseBetHistoryDialog}
          variant="outlined"
          sx={{
            color: "black",
            borderColor: "black",
            fontSize: { xs: "12px", sm: "14px" },
            px: { xs: 2, sm: 3 },
            "&:hover": { borderColor: "#black", color: "#black" },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
