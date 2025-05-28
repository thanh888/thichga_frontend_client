import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      minHeight: { xs: "200px", sm: "300px" },
      bgcolor: "#212529",
      borderRadius: 2,
    }}
  >
    <CircularProgress sx={{ color: "#ffeb3b" }} />
  </Box>
);
