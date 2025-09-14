import { Box } from "@mui/material";

import { Colors } from "@config/styles";

interface Props {
  Icon: React.ReactNode;
}

export default function IconBox({ Icon }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        backgroundColor: Colors.secondaryGreen,
        borderRadius: 1,
      }}
    >
      {Icon}
    </Box>
  );
}
