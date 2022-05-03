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
import OptionMenu from "./HotelServicesOptionMenu";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import NotificationContext from "../../context/Context";
import { Icon } from "@iconify/react";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "icon", label: "Icon", minWidth: 100 },
  { id: "name", label: "Tên dịch vụ", minWidth: 150 },
  { id: "action", label: "", minWidth: 150 },
];

function createData(id, name, icon) {
  return { id, name, icon };
}

const HotelServicesList = ({
  setEditedId,
  setOpenEditDialog,
  setOpenDeleteDialog,
}) => {
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

    setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 3000);

    return () => {
      isMounted = false;
    };
  });

  const rows = [
    createData("1", "Trang chủ", "ant-design:home-filled"),
    createData("2", "Xe ô tô", "emojione:oncoming-police-car"),
    createData("3", "Máy báy", "clarity:airplane-solid"),
  ];

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

export default HotelServicesList;
