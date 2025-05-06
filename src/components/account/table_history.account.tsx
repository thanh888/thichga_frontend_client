import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface Data {
  code: string;
  money: string;
  bank: string;
  account_name: string;
  account_number: string;
  content: string;
  status: string;
  created_at: string;
}

function createData(
  code: string,
  money: string,
  bank: string,
  account_name: string,
  account_number: string,
  content: string,
  status: string,
  created_at: string
): Data {
  return {
    code,
    money,
    bank,
    account_name,
    account_number,
    content,
    status,
    created_at,
  };
}

const rows = [
  createData(
    "TXN001",
    "1,000,000",
    "Vietcombank",
    "Nguyen Van A",
    "0123456789",
    "Thanh toan don hang #123",
    "Thành công",
    "2025-04-20 10:30:00"
  ),
  createData(
    "TXN002",
    "500,000",
    "Techcombank",
    "Tran Thi B",
    "0987654321",
    "Nap tien vi",
    "Chờ xử lý",
    "2025-04-20 11:15:22"
  ),
  createData(
    "TXN003",
    "2,300,000",
    "BIDV",
    "Le Van C",
    "0911223344",
    "Rút tiền",
    "Thất bại",
    "2025-04-19 09:45:10"
  ),
  createData(
    "TXN004",
    "150,000",
    "ACB",
    "Pham Thi D",
    "0334455667",
    "Thanh toan hoa don",
    "Thành công",
    "2025-04-18 17:20:45"
  ),
  createData(
    "TXN005",
    "3,500,000",
    "Sacombank",
    "Hoang Van E",
    "0778899001",
    "Chuyen tien cho A",
    "Thành công",
    "2025-04-17 08:05:30"
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Mã giao dịch",
  },
  {
    id: "money",
    numeric: true,
    disablePadding: false,
    label: "Số tiền",
  },
  {
    id: "bank",
    numeric: false,
    disablePadding: false,
    label: "Tên NH",
  },
  {
    id: "account_name",
    numeric: false,
    disablePadding: false,
    label: "Tên TK",
  },
  {
    id: "account_number",
    numeric: false,
    disablePadding: false,
    label: "Số TK",
  },
  {
    id: "content",
    numeric: false,
    disablePadding: false,
    label: "Chi tiết",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Thời gian",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: Readonly<EnhancedTableProps>) {
  const { order, orderBy, onRequestSort } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              fontWeight: 600,
              color: "black",
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.875rem" },
                fontWeight: 600,
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function HistoryTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("created_at");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table
          sx={{ minWidth: isMobile ? 600 : 750 }}
          aria-labelledby="tableTitle"
          size={isMobile ? "small" : "medium"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.code}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.code}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.money}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.bank}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.account_name}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.account_number}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.content}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color={
                        row.status === "Thành công"
                          ? "green"
                          : row.status === "Chờ xử lý"
                          ? "orange"
                          : "red"
                      }
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {row.created_at}
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (isMobile ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
            },
          "& .MuiTablePagination-select": {
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
          },
          "& .MuiTablePagination-actions button": {
            p: { xs: 0.5, sm: 1 },
          },
        }}
      />
    </Box>
  );
}
