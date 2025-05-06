"use client";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useMediaQuery, useTheme } from "@mui/material";

const items = [
  {
    id: 1,
    title: "Photography",
    body: "Bootstrap Carousel Example",
    imageUrl:
      "https://thichga.com/public-static-file-uploaded/images/09a2bfc6-2d59-4542-9ad1-6353f8b711ad.png",
  },
  {
    id: 2,
    title: "City Views",
    body: "Bootstrap Carousel Example",
    imageUrl:
      "https://thichga.com/public-static-file-uploaded/images/949a53c5-9957-41c0-a764-baf39148c1e9.png",
  },
];

export default function BannerComponent() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
      {items.map((item) => (
        <Carousel.Item key={item.id} interval={4000}>
          <div
            style={{
              width: "100%",
              height: isMobile ? "124px" : isTablet ? "300px" : "500px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
