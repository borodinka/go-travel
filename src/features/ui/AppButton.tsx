import LoadingButton from "@mui/lab/LoadingButton";
import {
  type SxProps,
  type Theme,
  Typography,
  type TypographyProps,
} from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  LinkComponent?: React.ElementType;
  disabled?: boolean;
  href?: string;
  isSmall?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  textVariant?: TypographyProps["variant"];
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type = "button",
  variant = "contained",
  fullWidth,
  loading,
  LinkComponent,
  href,
  children,
  startIcon,
  disabled,
  endIcon,
  isSmall,
  color,
  textVariant,
  sx,
  onClick,
}: Props) {
  return (
    <LoadingButton
      loading={loading}
      LinkComponent={LinkComponent}
      href={href}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      color={color}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === "text" || isSmall ? 42 : 48,
          md: variant === "text" || isSmall ? 48 : 56,
        },
        textTransform: "none",
        width: fullWidth ? "100%" : "fit-content",
        ...sx,
      }}
    >
      <Typography component="span" variant={textVariant ?? "body2"}>
        {children}
      </Typography>
    </LoadingButton>
  );
}
