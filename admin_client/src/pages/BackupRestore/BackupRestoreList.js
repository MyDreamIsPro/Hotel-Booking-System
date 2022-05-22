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
import OptionMenu from "./BackupRestoreOptionMenu";
import NoRecord from "../../components/NoRecord";
import Filter from "./BackupRestoreFilter";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import NotificationContext from "../../context/Context";
import { INTEGER } from "../../constants";
import { formatDateWithHour } from "../../utils/date";
import { formatNumber } from "../../utils/number";
import { getAllBackup } from "../../redux/actions/backup";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "name", label: "Mã", minWidth: 100 },
  { id: "user", label: "Người sao lưu", minWidth: 100 },
  { id: "duration", label: "Tổng thời gian", minWidth: 150 },
  { id: "detail", label: "Chi tiết", minWidth: 100 },
  { id: "last_using", label: "Sử dụng", minWidth: 100 },
  { id: "created_date", label: "Ngày sao lưu", minWidth: 100 },
];

function createData(
  id,
  name,
  user,
  duration,
  detail,
  pre_last_using,
  pre_created_date
) {
  const last_using = formatDateWithHour(pre_last_using, "-");
  const created_date = formatDateWithHour(pre_created_date, "-");
  return {
    id,
    name,
    user,
    duration,
    detail,
    last_using,
    created_date,
  };
}

const BackupRestoreList = ({
  setRestoreId,
  setOpenDeleteDialog,
  setOpenRestoreDialog,
  setOpenEditDialog,
}) => {
  const navigate = useNavigate();
  const context = useContext(NotificationContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // FILTER STATES
  const [filterBackupCode, setFilterBackupCode] = useState("");
  // END FILTER STATES

  const backupList = useSelector((state) => {
    if (filterBackupCode === "") return state.backup;

    let itemLowerCase = "",
      searchingItemLowerCase = "";
    return state.backup.filter((item) => {
      itemLowerCase = item.name.toLowerCase();
      searchingItemLowerCase = filterBackupCode.toLowerCase();
      return itemLowerCase.indexOf(searchingItemLowerCase) > -1;
    });
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
      getAllBackup(
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
    backupList.length > 0
      ? backupList.map((backup) =>
          createData(
            backup._id,
            backup.name,
            backup.user,
            backup.duration,
            backup.detail,
            backup.last_using,
            backup.created_date
          )
        )
      : [];

  return (
    <>
      <Filter
        filterBackupCode={filterBackupCode}
        setFilterBackupCode={setFilterBackupCode}
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
            ) : backupList.length > 0 ? (
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
                            setOpenDeleteDialog={setOpenDeleteDialog}
                            setRestoreId={setRestoreId}
                            id={row.id}
                            setOpenRestoreDialog={setOpenRestoreDialog}
                            setOpenEditDialog={setOpenEditDialog}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <NoRecord col={7} />
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

export default BackupRestoreList;