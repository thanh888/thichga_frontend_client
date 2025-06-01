"use client";
import BannerComponent from "@/components/banner/banner";
import { SettingContext } from "@/contexts/setting-context";
import { getRoomIsOpenedApi } from "@/services/room.api";
import { CampaignOutlined } from "@mui/icons-material";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import { UserContext } from "@/contexts/user-context";

export default function Homepage() {
  const router = useRouter();
  const settingContext = React.useContext(SettingContext);
  const setting = settingContext?.setting;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRedirectGame = async () => {
    try {
      const respone = await getRoomIsOpenedApi();
      if (
        (respone.status === 200 || respone.status === 201) &&
        respone.data._id
      ) {
        router.push(`/game/${respone.data._id}`);
      } else {
        toast.warning("Không có trận đấu nào được mở");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  const handleRedirectOtherGame = async () => {
    try {
      const respone = await getRoomIsOpenedApi();
      if (
        (respone.status === 200 || respone.status === 201) &&
        respone.data._id
      ) {
        router.push(`/ex-game`);
      } else {
        toast.warning("Không có trận đấu nào được mở");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, bgcolor: "white" }}
    >
      <BannerComponent />
      <Stack
        direction="row"
        useFlexGap
        alignItems="center"
        sx={{ marginBottom: { xs: 1, sm: 2 } }}
      >
        <CampaignOutlined
          sx={{ fontSize: { xs: 16, sm: 20 }, color: "#ff3601" }}
        />
        <Marquee style={{ whiteSpace: "nowrap", flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              color: "text.primary",
            }}
          >
            {setting?.slogan}
          </Typography>
        </Marquee>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Link href="#" onClick={handleRedirectGame} passHref>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "200px", sm: "300px", md: "300px" },
                  position: "relative",
                  borderRadius: { xs: 1, sm: 2 },
                  overflow: "hidden",
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url('/images/bg-home-menu.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
                    transition: "opacity 0.3s",
                    zIndex: 0,
                  },
                  "&:hover::before": {
                    opacity: 0.5,
                  },
                  cursor: "pointer",
                }}
              >
                <Stack
                  direction="column"
                  spacing={{ xs: 1, sm: 2 }}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img
                    alt="logo"
                    src="/images/game.png"
                    width={isMobile ? 150 : 200}
                    height={isMobile ? 150 : 200}
                  />
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight={600}
                    align="center"
                    display="flex"
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    <img
                      alt="logo"
                      src="/images/game.png"
                      width={isMobile ? 20 : 28}
                      height={isMobile ? 20 : 28}
                      style={{ objectFit: "cover" }}
                    />
                    Đá Gà
                  </Typography>
                </Stack>
              </Box>
            </Link>
          </Grid>
          <Grid size={6}>
            <Link href="#" onClick={handleRedirectOtherGame} passHref>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "200px", sm: "300px", md: "300px" },
                  position: "relative",
                  borderRadius: { xs: 1, sm: 2 },
                  overflow: "hidden",
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url('/images/bg-home-menu.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
                    transition: "opacity 0.3s",
                    zIndex: 0,
                  },
                  "&:hover::before": {
                    opacity: 0.5,
                  },
                  cursor: "pointer",
                }}
              >
                <Stack
                  direction="column"
                  spacing={{ xs: 1, sm: 2 }}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img
                    alt="logo"
                    src="/images/game.png"
                    width={isMobile ? 150 : 200}
                    height={isMobile ? 150 : 200}
                  />
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight={600}
                    align="center"
                    display="flex"
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                  >
                    <img
                      alt="logo"
                      src="/images/game.png"
                      width={isMobile ? 20 : 28}
                      height={isMobile ? 20 : 28}
                      style={{ objectFit: "cover" }}
                    />
                    Gà đòn
                  </Typography>
                </Stack>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          mt: { xs: 1, sm: 2 },
          mb: 4,
          p: { xs: 1, sm: 3 },
          "& > div": {
            fontSize: { xs: "0.875rem", sm: "1rem" },
            lineHeight: 1.5,
            overflowWrap: "break-word",
          },
          color: "black",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: setting?.post?.content || "" }}
        ></div>
      </Box>
    </Container>
  );
}
