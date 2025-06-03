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
import React, { useContext, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import { getGameNewApi } from "@/services/game.api";
import { GameInterface } from "@/utils/interfaces/game.interface";
import { StatusGame } from "@/utils/enum/status-game.enum";
import { TypGameEnum } from "@/utils/enum/type-game.enum";

export default function Homepage() {
  const router = useRouter();
  const settingContext = React.useContext(SettingContext);
  const setting = settingContext?.setting;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRedirectGame = async (typegame: string) => {
    try {
      if (typegame === TypGameEnum.GA_CUA) {
        const respone = await getRoomIsOpenedApi();
        if (
          (respone.status === 200 || respone.status === 201) &&
          respone.data._id
        ) {
          router.push(`/game/${respone.data._id}`);
        } else {
          toast.warning("Không có trận đấu nào được mở");
        }
      }
      if (typegame === TypGameEnum.GA_DON) {
        const respone = await getRoomIsOpenedApi();
        if (
          (respone.status === 200 || respone.status === 201) &&
          respone.data._id
        ) {
          router.push(`/ex-game`);
        } else {
          toast.warning("Không có trận đấu nào được mở");
        }
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

  const [games, setGames] = useState<GameInterface[]>([]);

  const getGamesNew = async () => {
    try {
      const response = await getGameNewApi();
      if (response.status === 200 || response.status === 201) {
        setGames(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGamesNew();
  }, []);

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
          {games?.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={+index}>
              <Link
                href={"#"}
                onClick={
                  item.status === StatusGame.COMING_SOON
                    ? (e) => e.preventDefault()
                    : () => handleRedirectGame(item?.typeGame)
                }
                passHref
                style={{
                  textDecoration: "none",
                  color: "black",
                  pointerEvents:
                    item.status === StatusGame.COMING_SOON ? "none" : "auto", // Disable pointer events for coming soon
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: 3,
                    position: "relative",
                    borderRadius: { xs: 1, sm: 2 },
                    overflow: "hidden",
                    cursor:
                      item.status === StatusGame.COMING_SOON
                        ? "default"
                        : "pointer",
                    width: "100%",
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
                      opacity:
                        item.status === StatusGame.COMING_SOON ? 0.5 : 0.3, // Slightly higher opacity for coming soon
                      transition: "opacity 0.3s",
                      zIndex: 0,
                    },
                    "&:hover::before": {
                      opacity:
                        item.status === StatusGame.COMING_SOON ? 0.5 : 0.5, // Maintain opacity on hover for coming soon
                    },
                  }}
                >
                  {/* Coming Soon Badge */}
                  {item.status === StatusGame.COMING_SOON && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "#ff9800", // Orange for visibility
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                        fontWeight: 600,
                        zIndex: 2,
                      }}
                    >
                      Sắp ra mắt
                    </Box>
                  )}
                  <Stack
                    direction={{ xs: "row", sm: "column" }}
                    spacing={2}
                    alignItems="center"
                    justifyContent={{ xs: "start", sm: "center" }}
                    sx={{
                      flexGrow: 1,
                      position: "relative",
                      zIndex: 1,
                      textAlign: "center",
                      px: 2,
                      py: 2,
                      // Dim content for coming soon to emphasize it's not active
                      opacity: item.status === StatusGame.COMING_SOON ? 0.7 : 1,
                    }}
                  >
                    <img
                      alt={item.name}
                      src={
                        item.image
                          ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/${item.image}`
                          : "/images/game.png"
                      }
                      style={{
                        objectFit: "cover",
                        width: isMobile ? "48px" : "200px",
                        height: isMobile ? "48px" : "200px",
                      }}
                    />
                    <Stack
                      direction="column"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      justifyContent="center"
                      spacing={{ xs: 0, sm: 1 }}
                    >
                      <Stack
                        direction="row"
                        spacing={{ xs: 0, sm: 1 }}
                        alignItems="center"
                      >
                        {!isMobile && (
                          <img
                            alt="logo"
                            src={
                              item.image
                                ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/${item.image}`
                                : "/images/game.png"
                            }
                            width={isMobile ? 20 : 28}
                            height={isMobile ? 20 : 28}
                          />
                        )}
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                            color: "#1a5899",
                          }}
                        >
                          {item?.name}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        color="#515155"
                        fontWeight={600}
                        sx={{ fontSize: { xs: "0.8rem", sm: "0.8rem" } }}
                      >
                        {item?.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Link>
            </Grid>
          ))}
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
