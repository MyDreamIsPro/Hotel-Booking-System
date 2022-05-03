import { useState, useEffect, useContext } from "react";
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
import OptionMenu from "./HotelOptionMenu";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import NotificationContext from "../../context/Context";
import { getAllHotel } from "../../redux/actions/hotel";
import { formatNumber } from "../../utils";
import { city } from "../../__MOCK__";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "name", label: "Tên", minWidth: 150 },
  { id: "city", label: "Thành phố", minWidth: 120 },
  { id: "size", label: "Diện tích (m\u00b2)", minWidth: 150 },
  { id: "numberOfRooms", label: "Số phòng", minWidth: 120 },
  { id: "phone", label: "Số điện thoại", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 120 },
  { id: "action", label: "", minWidth: 50 },
];

function createData(id, name, city, size, numberOfRooms, phone, email) {
  return { id, name, city, size, numberOfRooms, phone, email };
}

const HotelList = ({ setEditedId, setOpenEditDialog, setOpenDeleteDialog }) => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const hotelList = useSelector((state) => state.hotel);
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
      getAllHotel(
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
    hotelList.length > 0
      ? hotelList.map((hotel) =>
          createData(
            hotel._id,
            hotel.name,
            city[hotel.city].name,
            formatNumber(hotel.size),
            formatNumber(hotel.numberOfRooms),
            hotel.phone,
            hotel.email
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

export default HotelList;
