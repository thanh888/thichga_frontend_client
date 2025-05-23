import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  notification: any;
  setNotification: any;
}

export default function NotificationRealtime({
  notification,
  setNotification,
}: Readonly<Props>) {
  const handleCloseDialog = async () => {
    setNotification(null);
  };
  return (
    <Dialog
      open={notification}
      onClose={handleCloseDialog}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          backgroundColor: "#1E2A44",
          color: "#FFFFFF",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#d7b500",
          pt: 3,
        }}
      >
        {notification?.title}
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", px: 4, py: 2 }}>
        <Typography sx={{ color: "#E0E0E0", fontSize: "1rem" }}>
          {notification?.content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={() => {
            handleCloseDialog();
          }}
          variant="contained"
          sx={{
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: "8px",
            px: 4,
            "&:hover": {
              backgroundColor: "#2563EB",
            },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
