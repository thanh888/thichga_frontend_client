"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useUser } from "@/hooks/use-user";
import { convertDateTime, numberThousand } from "@/utils/function-convert.util";
import { DepositStatusEnum } from "@/utils/enum/deposit-status.enum";
import { paginateDepositApi } from "@/services/deposit.api";
import { paginateWithdrawApi } from "@/services/withdraw.api";

// Define interface for transaction data
interface Transaction {
  code: string;
  money: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  transferContent: string;
  status: string;
  createdAt: string;
}

// Define interface for table columns
interface Column {
  id: keyof Transaction | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: string) => string;
}

const statusLabels: Record<DepositStatusEnum, string> = {
  [DepositStatusEnum.PENDING]: "Chờ xử lý",
  [DepositStatusEnum.SUCCESS]: "Thành công",
  [DepositStatusEnum.REJECT]: "Đã từ chối",
};

const columns: Column[] = [
  { id: "code", label: "Mã giao dịch", minWidth: 100, align: "left" },
  {
    id: "money",
    label: "Số tiền (VND)",
    minWidth: 120,
    align: "right",
    format: (value: string) => numberThousand(value),
  },
  { id: "bankName", label: "Tên NH", minWidth: 100, align: "left" },
  { id: "accountName", label: "Tên TK", minWidth: 100, align: "left" },
  { id: "accountNumber", label: "Số TK", minWidth: 100, align: "left" },
  { id: "transferContent", label: "Chi tiết", minWidth: 150, align: "left" },
  { id: "status", label: "Trạng thái", minWidth: 150, align: "left" },
  {
    id: "createdAt",
    label: "Thời gian",
    minWidth: 150,
    align: "left",
    format: (value: string) => convertDateTime(value),
  },
];

interface Props {
  isReload: boolean;
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
  type: "deposit" | "withdraw";
}

export default function HistoryTableComponent({
  isReload,
  setIsReload,
  type,
}: Readonly<Props>): React.JSX.Element {
  const [transactions, setTransactions] = React.useState<any>(null);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [filter, setFilter] = React.useState({ code: "", status: "" });
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Transaction>("createdAt");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const { user } = useUser();
  const router = useRouter();

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (!user._id) {
        setError("Không tìm thấy thông tin người dùng");
        alert("Không tìm thấy thông tin người dùng");
        return;
      }
      const sortQuery = order === "asc" ? orderBy : `-${orderBy}`;
      const query = `limit=${rowsPerPage}&skip=${page * rowsPerPage}&search=${
        filter.code
      }&status=${filter.status}&sort=${sortQuery}&user_id=${user._id}`;
      const api = type === "deposit" ? paginateDepositApi : paginateWithdrawApi;
      const response = (await api(query)) as any;
      if (response.status === 200 || response.status === 201) {
        setTransactions(response.data);
        setIsReload(false);
      }
    } catch (err: any) {
      console.error(`Failed to fetch ${type} transactions:`, err);
      setError(
        err.response?.data?.message ||
          `Không thể tải lịch sử ${
            type === "deposit" ? "nạp tiền" : "rút tiền"
          }, vui lòng thử lại`
      );
      alert(
        err.response?.data?.message ||
          `Không thể tải lịch sử ${
            type === "deposit" ? "nạp tiền" : "rút tiền"
          }, vui lòng thử lại`
      );
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isReload) {
      fetchTransactions();
    }
  }, [isReload]);

  React.useEffect(() => {
    fetchTransactions();
  }, [page, rowsPerPage, filter, order, orderBy, user._id, type]);

  const handleRequestSort = (property: keyof Transaction) => {
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
    setPage(0); // Reset to first page when filtering
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleViewDetail = (code: string) => {
    router.push(`/transactions/${code}`); // Navigate to transaction detail page
  };

  if (isLoading) {
    return (
      <Card sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 2, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="contained"
          onClick={() => fetchTransactions()}
          sx={{ mt: 2 }}
        >
          Thử lại
        </Button>
      </Card>
    );
  }

  if (!transactions?.docs?.length) {
    return (
      <Card sx={{ p: 2, textAlign: "center" }}>
        <Typography>Không có giao dịch nào để hiển thị</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.docs?.map((row: any, index: number) => (
              <TableRow hover key={+index}>
                <TableCell>
                  <Typography variant="subtitle2">{row.code}</Typography>
                </TableCell>
                <TableCell align="right">
                  {columns
                    .find((col) => col.id === "money")
                    ?.format?.(row?.money?.toString() ?? "0") ||
                    numberThousand(row?.money?.toString())}
                </TableCell>
                <TableCell>{row?.bank?.bankName || "N/A"}</TableCell>
                <TableCell>{row?.bank?.accountName || "N/A"}</TableCell>
                <TableCell>{row?.bank?.accountNumber || "N/A"}</TableCell>
                <TableCell>
                  {row?.bank?.transferContent || row.transferContent}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    bgcolor={
                      row.status === DepositStatusEnum.SUCCESS
                        ? "#1de9b6"
                        : row.status === DepositStatusEnum.PENDING
                        ? "#ffb300"
                        : "#e57373"
                    }
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {statusLabels[row.status as DepositStatusEnum] ??
                      row.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {columns
                    .find((col) => col.id === "createdAt")
                    ?.format?.(row?.createdAt?.toString() ?? "") ||
                    convertDateTime(row?.createdAt?.toString() ?? "")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={transactions?.totalDocs || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
