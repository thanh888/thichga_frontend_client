import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      // minHeight: { xs: "200px", sm: "300px" },
      bgcolor: "#212529",
      // borderRadius: 2,
    }}
  >
    <CircularProgress size={24} sx={{ color: "#ffeb3b" }} />
  </Box>
);
