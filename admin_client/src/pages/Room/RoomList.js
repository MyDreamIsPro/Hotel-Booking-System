import { useState, useEffect, useContext } from "react";
// UI lib
import {
  Box,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
// UI custom
import OptionMenu from "./RoomOptionMenu";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import NotificationContext from "../../context/Context";
import { getAllRoom } from "../../redux/actions/room";
import { INTEGER } from "../../constants";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "number", label: "Số phòng", minWidth: 100 },
  { id: "hotel", label: "Khách sạn", minWidth: 100 },
  { id: "room_type", label: "Loại phòng", minWidth: 150 },
  { id: "status", label: "Trạng thái", minWidth: 100 },
  { id: "action", label: "", minWidth: 50 },
];

function createData(id, number, hotel, room_type, preStatus, lastHoldingTime) {
  const isExpired = lastHoldingTime < Date.now();
  const status = (
    <>
      {(preStatus === INTEGER.ROOM_EMPTY && (
        <Chip label="Trống" color="success" variant="outlined" />
      )) ||
        (preStatus === INTEGER.ROOM_PENDING &&
          (isExpired ? (
            <Chip label="Trống" color="success" variant="outlined" />
          ) : (
            <Chip label="Đang giữ" color="warning" variant="outlined" />
          ))) ||
        (preStatus === INTEGER.ROOM_RENTED && (
          <Chip label="Đã thuê" color="error" variant="outlined" />
        ))}
    </>
  );
  return { id, number, hotel, room_type, status };
}

const RoomList = ({ setEditedId, setOpenEditDialog, setOpenDeleteDialog }) => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const roomList = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let isMounted = true;
    dispatch(
      getAllRoom(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            context.setNotification({ type: "error", content: message });
            context.setOpen(true);
            setLoading(false);
            if (needLogin) navigate("/login", { replace: true });
          }
        }
      )
    );
    return () => {
      isMounted = false;
    };
  }, [context, dispatch, navigate]);

  const rows =
    roomList.length > 0
      ? roomList.map((room) =>
          createData(
            room._id,
            room.number,
            room.hotel.name,
            room.room_type.name,
            room.status,
            room.last_holding_time
          )
        )
      : [];

  return (
    <Box boxShadow={3} style={{ borderRadius: 8 }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
        <Table stickyHeader aria-label="sticky table" style={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#F4F6F8",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                {columns.map((column, index) => {
                  return (
                    <TableCell key={index}>
                      <Skeleton variant="text" />
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                {columns.map((column, index) => {
                  return (
                    <TableCell key={index}>
                      <Skeleton variant="text" />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        <OptionMenu
                          setOpenEditDialog={setOpenEditDialog}
                          setOpenDeleteDialog={setOpenDeleteDialog}
                          setEditedId={setEditedId}
                          id={row.id}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Số hàng"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default RoomList;
