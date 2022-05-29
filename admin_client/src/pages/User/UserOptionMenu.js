import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import Iconify from "../../components/Iconify";

const UserOptionMenu = ({
  status,
  id,
  setEditedId,
  setTypeDialog,
  setOpenDialog,
}) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef();
  const handleCloseMenu = () => {
    if (open) setOpen(false);
  };

  const handleBan = () => {
    setEditedId(id);
    setTypeDialog("BAN");
    setOpenDialog(true);
    setOpen(false);
  };

  const handleActive = () => {
    setEditedId(id);
    setTypeDialog("ACTIVE");
    setOpenDialog(true);
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };
  return (
    <>
      <Tooltip title="Tùy chọn" placement="top">
        <IconButton ref={anchor} onClick={handleOpenMenu}>
          <Iconify icon="bx:dots-vertical-rounded" />
        </IconButton>
      </Tooltip>

      <Menu
        open={open}
        anchorEl={anchor.current}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{ sx: { width: 200, maxWidth: "100%" } }}
      >
        {status ? (
          <MenuItem sx={{ color: "text.secondary" }} onClick={handleActive}>
            <ListItemIcon>
              <Iconify
                icon="bxs:user-check"
                width={30}
                height={30}
                sx={{ color: "success.main" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Mở tài khoản"
              sx={{ color: "success.main" }}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        ) : (
          <MenuItem sx={{ color: "text.secondary" }} onClick={handleBan}>
            <ListItemIcon>
              <Iconify
                icon="bxs:user-x"
                width={30}
                height={30}
                sx={{ color: "error.main" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Khóa tài khoản"
              sx={{ color: "error.main" }}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserOptionMenu;
