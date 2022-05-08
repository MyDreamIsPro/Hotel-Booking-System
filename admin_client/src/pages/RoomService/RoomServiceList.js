import { useState, useContext, useEffect } from "react";
// UI lib
import {
  Box,
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
import OptionMenu from "./RoomServiceOptionMenu";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllRoomService } from "../../redux/actions/room_service";
import NotificationContext from "../../context/Context";
import { Icon } from "@iconify/react";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "icon", label: "Biểu tượng", minWidth: 50 },
  { id: "name", label: "Tên dịch vụ", minWidth: 150 },
  { id: "action", label: "", minWidth: 150 },
];

function createData(id, name, icon) {
  return { id, name, icon };
}

const RoomServiceList = ({
  setEditedId,
  setOpenEditDialog,
  setOpenDeleteDialog,
}) => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const roomServiceList = useSelector((state) => state.room_service);
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
      getAllRoomService(
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
    roomServiceList.length > 0
      ? roomServiceList.map((roomService) =>
          createData(roomService._id, roomService.name, roomService.icon)
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
                      <TableCell>
                        <Icon fontSize={25} icon={row["icon"]} />
                      </TableCell>
                      <TableCell>{row["name"]}</TableCell>
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

export default RoomServiceList;
