"use client";
import { useContext, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useMediaQuery, useTheme } from "@mui/material";
import { SettingContext } from "@/contexts/setting-context";

const items = ["images/banner5.png", "images/banner3.png"];

export default function BannerComponent() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const settingContext = useContext(SettingContext);

  const setting = settingContext?.setting;

  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="w-full overflow-hidden"
      style={{
        borderRadius: isMobile ? "8px" : "10px",
        boxShadow: isMobile
          ? "0 0 5px rgba(0, 0, 0, 0.3)"
          : "0 0 10px rgba(0, 0, 0, 0.5)",
        margin: isMobile ? "10px 0" : isTablet ? "15px 0" : "20px 0",
      }}
    >
      {(setting?.banner ?? items).map((item, index) => (
        <Carousel.Item key={+index} interval={4000}>
          <div
            style={{
              width: "100%",
              height: isMobile ? "140px" : isTablet ? "300px" : "500px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={
                setting?.banner
                  ? process.env.NEXT_PUBLIC_BASE_API_URL + "/" + item
                  : item
              }
              alt={item + index}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                objectPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
