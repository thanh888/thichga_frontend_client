import BannerComponent from "@/components/banner/banner";
import { CampaignOutlined, Circle as CircleIcon } from "@mui/icons-material";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Marquee from "react-fast-marquee";

export default function Homepage() {
  const items = [
    {
      title: "Trần Đầu Hấp Dẫn, Nảy Lửa",
      description:
        "Những chiếc kỹ xức sắc nổi sẽ đổi trọng trong những trận chiến kích tính, nội tùng cụ của đầu mang tính quyết định.",
    },
    {
      title: "Giao Diện Hiện Đại, Trải Nghiệm Mượt Mà",
      description:
        "Hệ thống được tìu hóa để nguội chơi có thể theo dõi và tham gia để đang.",
    },
    {
      title: "Kết Quả Minh Bạch – Công Bằng Tuyệt Đối",
      description:
        "Tất cả các trận đầu đểu được ra đối sử giam sát chặt chẽ, đảm bảo tính trung thực và chính xác.",
    },
    {
      title: "Cộng Đồng Đam Mê – Hội Tụ Cao Thủ",
      description:
        "Một sàn chơi chuyên nghiệp không thể thiếu những nguội chơi đẳng cấp, nơi bạn có thể giao lưu, học hỏi và thể hiện bản lĩnh.",
    },
  ];

  return (
    <Container maxWidth="xl">
      Hello Homepage
      <BannerComponent />
      <Stack
        // spacing={{ xs: 1, sm: 1 }}
        direction="row"
        useFlexGap
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <CampaignOutlined sx={{ fontSize: 20, color: "red" }} />
        <Marquee style={{ whiteSpace: "nowrap", flex: 1 }}>
          I can be a React component, multiple React components, or just some
          text.
        </Marquee>
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "400px",
          position: "relative", // enable absolute child
          borderRadius: 2,
          overflow: "hidden", // to clip rounded corners
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/images/backgound_section.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
            transition: "opacity 0.3s",
            zIndex: 0,
          },
          "&:hover::before": {
            opacity: 0.5,
          },
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
            position: "relative",
            zIndex: 1, // make sure it appears above the background
          }}
        >
          <img alt="logo" src="/images/game.png" width={200} height={200} />
          <Typography
            variant="h6"
            color="primary"
            fontWeight={600}
            align="center"
            display="flex"
          >
            <img
              alt="logo"
              src="/images/game.png"
              width={28}
              height={28}
              style={{ objectFit: "cover" }}
            />
            Đá Gà
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            fontWeight={200}
            align="center"
          >
            Tên phòng
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: "100%", mx: "auto", my: 5, p: 3 }}>
        {/* Tiêu đề */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#1E90FF" }}
        >
          SẢN CHƠI CHUYÊN NGHIỆP – ĐẲNG CẤP DÂN CHƠI NGUỘI CHÓI THỨC THỲ
        </Typography>

        {/* Mô tả chính */}
        <Typography
          variant="body1"
          sx={{ mb: 3, textAlign: "justify", color: "text.secondary" }}
        >
          Tại Đầu Trường Gà Đòn, mọi trận đầu đểu được tổ chức một cách chuyên
          nghiệp, minh bạch và công bằng. Với hệ thống hiện đại, chúng tôi cam
          kết mang đến trải nghiệm tốt nhất cho những nguội chơi đam mê gà đòn.
        </Typography>

        {/* Danh sách các mục */}
        <List>
          {items.map((item, index) => (
            <ListItem key={index} sx={{ alignItems: "flex-start" }}>
              <ListItemIcon>
                <CircleIcon sx={{ fontSize: 10, color: "#1E90FF", mt: 1 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
