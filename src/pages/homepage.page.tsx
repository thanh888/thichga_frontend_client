import FlowbiteCarousel from "@/components/banner/banner";
import { Box, Container } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
export default function Homepage() {
  return (
    <Container maxWidth="lg">
      Hello Homepage
      <Box sx={{ width: "100%", height: "700px", overflow: "hidden" }}>
        {/* <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          showStatus={false}
        >
          <div>
            <img src="/images/banner_1.jpg" alt="Banner 1" />
            <p className="legend">Banner 1</p>
          </div>
          <div>
            <img src="/images/banner_2.jpg" alt="Banner 2" />
            <p className="legend">Banner 2</p>
          </div>
          <div>
            <img src="/images/banner_3.jpg" alt="Banner 3" />
            <p className="legend">Banner 3</p>
          </div>
        </Carousel> */}
        <FlowbiteCarousel />
        <div className="banner flex justify-center items-center">
          <img alt="banner_1" src="/images/banner_1.jpg" className="" />
          <img alt="banner_1" src="/images/banner_2.jpg" className="" />
        </div>
      </Box>
    </Container>
  );
}
