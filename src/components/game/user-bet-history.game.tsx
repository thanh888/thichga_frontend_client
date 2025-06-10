"use client";

import React, { useContext, useEffect, useState, useCallback } from "react";
import { BetHistoryStatusEnum } from "@/utils/enum/bet-history-status.enum";
import { TeamEnum } from "@/utils/enum/team.enum";
import { TypeBetRoomEnum } from "@/utils/enum/type-bet-room.enum";
import {
  convertDateTime,
  numberThousandFload,
} from "@/utils/function-convert.util";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Tabs,
  Tab,
  TablePagination,
  Alert,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { BettingHistoryInterface } from "@/utils/interfaces/bet-history.interface";
import { paginateBetHistoryByUserIDApi } from "@/services/bet-history.api";
import { BetResultEnum } from "@/utils/enum/bet-result.enum";
import { UserContext } from "@/contexts/user-context";
import { StatusSessionEnum } from "@/utils/enum/status-session.enum";

const listResultHistory = [
  { value: BetResultEnum.WIN, label: "Thắng" },
  { value: BetResultEnum.LOSE, label: "Thua" },
  { value: BetResultEnum.DRAW, label: "Hòa" },
  { value: BetResultEnum.CANCEL, label: "Hủy" },
  { value: BetResultEnum.REFUDNED, label: "Hoàn tiền" },
];

interface Column {
  id: keyof BettingHistoryInterface | "odds" | "roomName";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number | undefined) => string;
}

const columns: Column[] = [
  { id: "code", label: "Mã cược", minWidth: 80, align: "left" },
  { id: "roomName", label: "Trận đấu", minWidth: 150, align: "left" },
  {
    id: "money",
    label: "Số tiền (VND)",
    minWidth: 120,
    align: "right",
    format: (value: number | undefined) =>
      value != null ? value.toLocaleString("vi-VN") : "N/A",
  },
  { id: "odds", label: "Tỷ lệ cược", minWidth: 100, align: "right" },
  { id: "selectedTeam", label: "Đội chọn", minWidth: 120, align: "left" },
  {
    id: "userProfit",
    label: "Tiền thắng",
    minWidth: 120,
    align: "left",
  },
  { id: "userResult", label: "Kết quả", minWidth: 120, align: "left" },
  { id: "status", label: "Trạng thái", minWidth: 120, align: "left" },
  { id: "createdAt", label: "Thời gian", minWidth: 150, align: "center" },
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
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] =
    useState<keyof BettingHistoryInterface>("createdAt");
  const [tabValue, setTabValue] = useState<TypeBetRoomEnum>(
    TypeBetRoomEnum.SOLO
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchBets = useCallback(async () => {
    if (!user?._id) {
      setError("Vui lòng đăng nhập để xem lịch sử cược.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const sortQuery =
        order === "asc" ? String(orderBy) : `-${String(orderBy)}`;
      const query = `limit=${rowsPerPage}&skip=${page + 1}&user_id=${
        user._id
      }&search=${encodeURIComponent(filter.roomName)}&status=${
        filter.status
      }&type=${tabValue}&sort=${sortQuery}`;
      const response = await paginateBetHistoryByUserIDApi(user._id, query);
      if (response.status === 200 || response.status === 201) {
        setBets(response.data);
      } else {
        setError("Không thể tải lịch sử cược, vui lòng thử lại.");
      }
    } catch (err: any) {
      console.log("Failed to fetch bet history:", err);
      setError(
        err.response?.data?.message ||
          "Không thể tải lịch sử cược, vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, filter, page, rowsPerPage, order, orderBy, tabValue]);

  // Debounce fetchBets to avoid excessive API calls

  useEffect(() => {
    if (betHistoryDialogOpen && user) {
      fetchBets();
    }
  }, [betHistoryDialogOpen, page, rowsPerPage, order, orderBy, tabValue, user]);

  const handleRequestSort = (property: keyof BettingHistoryInterface) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0); // Reset to first page on sort
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

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: TypeBetRoomEnum
  ) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleCloseBetHistoryDialog = () => {
    setBetHistoryDialogOpen(false);
    setFilter({ roomName: "", status: "" });
    setTabValue(TypeBetRoomEnum.SOLO);
    setPage(0);
    setBets({ docs: [], totalDocs: 0 });
  };

  if (error) {
    return (
      <Card
        sx={{
          p: 2,
          textAlign: "center",
          bgcolor: "#2D3748",
          borderRadius: "12px",
        }}
      >
        <Alert
          severity="error"
          sx={{ m: 2, bgcolor: "#4A5568", color: "#FFFFFF" }}
        >
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => fetchBets()}
          sx={{
            bgcolor: "#d7b500",
            color: "#1E2A44",
            "&:hover": { bgcolor: "#ECC94B" },
          }}
        >
          Thử lại
        </Button>
      </Card>
    );
  }

  return (
    <Dialog
      open={betHistoryDialogOpen}
      onClose={handleCloseBetHistoryDialog}
      fullScreen={isMobile}
      maxWidth="xl"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "#1E2A44",
          color: "#FFFFFF",
          borderRadius: { xs: 0, sm: "12px" },
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          fontWeight={600}
          mb={{ xs: 2, sm: 3 }}
          textAlign="center"
          sx={{ color: "#d7b500" }}
        >
          Lịch Sử Cược
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              color: "#A0AEC0",
              fontWeight: 500,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#d7b500",
              fontWeight: 600,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#d7b500",
              height: "3px",
            },
          }}
        >
          <Tab label="Đối kháng" value={TypeBetRoomEnum.SOLO} />
          <Tab label="Truyền thống" value={TypeBetRoomEnum.NORMAL} />
        </Tabs>

        <Card
          sx={{
            bgcolor: "#2D3748",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TextField
              label="Tìm kiếm trận đấu"
              name="roomName"
              value={filter.roomName}
              onChange={handleFilterChange}
              size="small"
              sx={{
                width: { xs: "100%", sm: "300px" },
                "& .MuiInputBase-root": {
                  bgcolor: "#4A5568",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                },
                "& .MuiInputLabel-root": {
                  color: "#A0AEC0",
                  "&.Mui-focused": { color: "#d7b500" },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#4A5568" },
                  "&:hover fieldset": { borderColor: "#d7b500" },
                  "&.Mui-focused fieldset": { borderColor: "#d7b500" },
                },
              }}
            />
          </Box>

          {bets.docs.length === 0 && !isLoading && !error && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography sx={{ color: "#FFFFFF" }}>
                Không có cược nào để hiển thị
              </Typography>
            </Box>
          )}

          {isLoading && (
            <Card
              sx={{
                p: 4,
                display: "flex",
                justifyContent: "center",
                bgcolor: "#2D3748",
                borderRadius: "12px",
              }}
            >
              <CircularProgress sx={{ color: "#d7b500" }} />
            </Card>
          )}

          {bets.docs.length > 0 && (
            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        sx={{
                          minWidth: column.minWidth,
                          color: "#d7b500",
                          fontWeight: 600,
                          bgcolor: "#1E2A44",
                        }}
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
                            color: "#d7b500",
                            "&.Mui-active": { color: "#d7b500" },
                            "&:hover": { color: "#FFFFFF" },
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bets.docs.map((row: BettingHistoryInterface) => (
                    <TableRow
                      hover
                      key={row._id}
                      sx={{
                        "&:hover": {
                          bgcolor: "#3B4A68",
                          transition: "background-color 0.2s",
                        },
                      }}
                    >
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        <Typography variant="subtitle2">{row?.code}</Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        {row?.betSessionID?.betRoomID?.roomName ?? "N/A"}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                        {columns
                          .find((col) => col.id === "money")
                          ?.format?.(row?.money) || "N/A"}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                        {row?.win}:{row?.lost}
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        <Typography
                          variant="caption"
                          bgcolor={
                            row?.selectedTeam === TeamEnum.BLUE
                              ? "#2B6CB0"
                              : "#C53030"
                          }
                          sx={{
                            p: 1,
                            borderRadius: "6px",
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {row?.selectedTeam === TeamEnum.BLUE
                            ? "Wala"
                            : "Meron"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        <Typography
                          variant="caption"
                          bgcolor={
                            row.userResult &&
                            [
                              BetResultEnum.WIN,
                              BetResultEnum.DRAW,
                              BetResultEnum.CANCEL,
                              BetResultEnum.REFUDNED,
                            ].includes(row.userResult)
                              ? "#38A169"
                              : row.userResult === BetResultEnum.LOSE
                              ? "#C53030"
                              : "#A0AEC0"
                          }
                          sx={{
                            p: 1,
                            borderRadius: "6px",
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {row.userResult &&
                          [
                            BetResultEnum.WIN,
                            BetResultEnum.DRAW,
                            BetResultEnum.CANCEL,
                            BetResultEnum.REFUDNED,
                          ].includes(row.userResult)
                            ? "+" + numberThousandFload(row?.userProfit ?? 0)
                            : row.userResult &&
                              [BetResultEnum.LOSE].includes(row.userResult)
                            ? "-" + numberThousandFload(row?.money ?? 0)
                            : "Đang chờ"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            p: 1,
                            borderRadius: "6px",
                            fontWeight: 500,
                            fontSize: 14,
                            bgcolor:
                              row?.userResult === BetResultEnum.WIN
                                ? "#38A169"
                                : row?.userResult === BetResultEnum.LOSE
                                ? "#C53030"
                                : row?.userResult === BetResultEnum.DRAW
                                ? "#718096"
                                : "#A0AEC0",
                          }}
                        >
                          {row.userResult
                            ? listResultHistory.find(
                                (item: any) => item.value === row?.userResult
                              )?.label
                            : "Đang chờ"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            p: 1,
                            borderRadius: "6px",
                            fontWeight: 500,
                            fontSize: 14,
                            textWrap: "nowrap",
                            bgcolor:
                              row?.status === BetHistoryStatusEnum.MATCHED ||
                              row.statusSession === StatusSessionEnum.SETTLED ||
                              row.userResult
                                ? "#3182CE"
                                : "#A0AEC0",
                          }}
                        >
                          {row.statusSession === StatusSessionEnum.SETTLED ||
                          row.userResult
                            ? "Đã kết toán"
                            : row?.status === BetHistoryStatusEnum.MATCHED
                            ? "Đã khớp"
                            : "Chưa khớp"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF" }}>
                        {convertDateTime(row?.createdAt?.toString() || "")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
          <Divider sx={{ borderColor: "#4A5568" }} />
          <TablePagination
            component="div"
            count={bets.totalDocs || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              color: "#FFFFFF",
              "& .MuiTablePagination-selectLabel": { color: "#FFFFFF" },
              "& .MuiTablePagination-displayedRows": { color: "#FFFFFF" },
              "& .MuiTablePagination-actions button": { color: "#FFFFFF" },
              "& .MuiTablePagination-select": { color: "#FFFFFF" },
              "& .MuiSvgIcon-root": { color: "#FFFFFF" },
            }}
          />
        </Card>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: { xs: 2, sm: 3 } }}>
        <Button
          onClick={handleCloseBetHistoryDialog}
          variant="contained"
          sx={{
            bgcolor: "#d7b500",
            color: "#1E2A44",
            fontWeight: 600,
            borderRadius: "8px",
            px: { xs: 3, sm: 4 },
            "&:hover": {
              bgcolor: "#ECC94B",
            },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
