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
import OptionMenu from "./BookingOptionMenu";
import NoRecord from "../../components/NoRecord";
import Filter from "./BookingFilter";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import NotificationContext from "../../context/Context";
import { getAllBooking } from "../../redux/actions/booking";
import { INTEGER } from "../../constants";
import { formatDate } from "../../utils/date";
import { formatNumber } from "../../utils/number";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "number", label: "Mã đặt phòng", minWidth: 100 },
  { id: "user", label: "Khách hàng", minWidth: 150 },
  { id: "phone", label: "Số điện thoại", minWidth: 150 },
  { id: "hotel", label: "Khách sạn", minWidth: 100 },
  { id: "amount", label: "Tổng tiền (VNĐ)", minWidth: 150 },
  { id: "effective_from", label: "Nhận phòng", minWidth: 130 },
  { id: "effective_to", label: "Trả phòng", minWidth: 120 },
  { id: "status", label: "Trạng thái", minWidth: 100 },
];

function createData(
  id,
  number,
  hotel,
  user,
  phone,
  preAmount,
  pre_effective_from,
  pre_effective_to,
  preStatus
) {
  const status = (
    <>
      {(preStatus === INTEGER.BOOKING_IN_PROGRESS && (
        <Chip label="Sắp tới" color="warning" variant="outlined" />
      )) ||
        (preStatus === INTEGER.BOOKING_CHECK_IN && (
          <Chip label="Đã nhận phòng" color="success" variant="outlined" />
        )) ||
        (preStatus === INTEGER.BOOKING_CHECK_OUT && (
          <Chip label="Hoàn tất" color="success" variant="outlined" />
        )) ||
        (preStatus === INTEGER.BOOKING_CANCELED && (
          <Chip label="Đã hủy" color="error" variant="outlined" />
        ))}
    </>
  );
  const amount = formatNumber(preAmount);
  const effective_from = formatDate(pre_effective_from);
  const effective_to = formatDate(pre_effective_to);
  return {
    id,
    number,
    hotel,
    user,
    phone,
    amount,
    effective_from,
    effective_to,
    status,
    preStatus,
  };
}

const BookingList = ({
  setEditedId,
  setOpenEditDialog,
  setOpenDeleteDialog,
  setDialogContent,
  setOpenBookingDialog,
}) => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // FILTER STATES
  const [filterBookingCode, setFilterBookingCode] = useState("");
  const [filterBookingStatus, setFilterBookingStatus] = useState(0);
  // END FILTER STATES

  const bookingList = useSelector((state) => {
    if (filterBookingCode === "" && filterBookingStatus === 0)
      return state.booking;

    return state.booking.filter(
      (item) =>
        (filterBookingCode === "" ||
          item.number === Number(filterBookingCode)) &&
        (filterBookingStatus === 0 || item.status === filterBookingStatus)
    );
  });

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
      getAllBooking(
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
    bookingList.length > 0
      ? bookingList.map((booking) =>
          createData(
            booking._id,
            booking.number,
            booking.hotel.name,
            booking.user.full_name,
            booking.user.phone,
            booking.amount,
            booking.effective_from,
            booking.effective_to,
            booking.status
          )
        )
      : [];

  return (
    <>
      <Filter
        filterBookingCode={filterBookingCode}
        setFilterBookingCode={setFilterBookingCode}
        filterBookingStatus={filterBookingStatus}
        setFilterBookingStatus={setFilterBookingStatus}
      />
      <Box boxShadow={3} style={{ borderRadius: 8, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ minWidth: 1000 }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="action"
                  style={{
                    minWidth: 100,
                    backgroundColor: "#D9D9D9",
                  }}
                ></TableCell>
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
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index}>
                        <Skeleton variant="text" />
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : bookingList.length > 0 ? (
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
                            status={row.preStatus}
                            setOpenEditDialog={setOpenEditDialog}
                            setOpenDeleteDialog={setOpenDeleteDialog}
                            setEditedId={setEditedId}
                            id={row.id}
                            setDialogContent={setDialogContent}
                            setOpenBookingDialog={setOpenBookingDialog}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <NoRecord col={9} />
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
    </>
  );
};

export default BookingList;
