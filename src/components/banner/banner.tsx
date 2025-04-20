"use client";
import { useState } from "react";
import { Carousel } from "react-bootstrap";

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
  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="w-full overflow-hidden my-8"
      style={{
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        height: "500px",
        margin: "20px 0",
      }}
    >
      {items.map((item) => (
        <Carousel.Item key={item.id} interval={4000}>
          <div
            style={{
              width: "100%",
              height: "500px",
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
