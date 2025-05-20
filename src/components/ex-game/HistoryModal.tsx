import React, { useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  gameId: string;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  open,
  onClose,
  gameId,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          width: "90%",
          maxWidth: 720,
          maxHeight: "80vh",
          overflow: "auto",
          animation: open ? "modalOpening 0.2s" : "modalClosing 0.2s",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">LỊCH SỬ GIAO DỊCH</Typography>
          <Button onClick={onClose}>×</Button>
        </Box>
        <Box>
          <table
            id="datatable"
            className="table is-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Mã cược #</th>
                <th>Phiên</th>
                <th>Tỉ lệ</th>
                <th>Cược</th>
                <th>Số tiền</th>
                <th>Kết quả</th>
                <th>Trạng thái</th>
                <th>Tiền thắng</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody id="lscTbody"></tbody>
          </table>
        </Box>
      </Box>
    </Modal>
  );
};

export default HistoryModal;
