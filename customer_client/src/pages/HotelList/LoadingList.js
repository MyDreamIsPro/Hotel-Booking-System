// UI lib
import { Box, Container, Skeleton, Stack, styled } from "@mui/material";
// UI custom

// logic lib

// logic custom

//#region CSS
const ItemStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: 300,
  boxShadow: "0 1px 2px 1px gray",
  borderRadius: 4,
  marginBottom: 30,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "auto",
  },
}));
const Image = styled(Skeleton)(({ theme }) => ({
  width: "40%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: 200,
  },
}));
//#endregion

//----------------------------

const LoadingList = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      {/* ITEM 1 */}
      <ItemStyle>
        <Image variant="rectangular" animation="wave" />
        <Box
          style={{
            flexGrow: 1,
            paddingLeft: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="text" width="90%" height={50} animation="wave" />
          <Skeleton variant="text" width="70%" height={50} animation="wave" />
          <Skeleton variant="text" width="50%" height={50} animation="wave" />
          <Stack
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ flexGrow: 1, padding: 10 }}
          >
            <Skeleton
              variant="rectangular"
              width="20%"
              height={50}
              animation="wave"
              style={{ marginBottom: 5 }}
            />
            <Skeleton
              variant="rectangular"
              width="30%"
              height={50}
              animation="wave"
            />
          </Stack>
        </Box>
      </ItemStyle>
      {/* ITEM 2 */}
      <ItemStyle>
        <Image variant="rectangular" animation="wave" />
        <Box
          style={{
            flexGrow: 1,
            paddingLeft: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="text" width="90%" height={50} animation="wave" />
          <Skeleton variant="text" width="70%" height={50} animation="wave" />
          <Skeleton variant="text" width="50%" height={50} animation="wave" />
          <Stack
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ flexGrow: 1, padding: 10 }}
          >
            <Skeleton
              variant="rectangular"
              width="20%"
              height={50}
              animation="wave"
              style={{ marginBottom: 5 }}
            />
            <Skeleton
              variant="rectangular"
              width="30%"
              height={50}
              animation="wave"
            />
          </Stack>
        </Box>
      </ItemStyle>
      {/* ITEM 3 */}
      <ItemStyle>
        <Image variant="rectangular" animation="wave" />
        <Box
          style={{
            flexGrow: 1,
            paddingLeft: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="text" width="90%" height={50} animation="wave" />
          <Skeleton variant="text" width="70%" height={50} animation="wave" />
          <Skeleton variant="text" width="50%" height={50} animation="wave" />
          <Stack
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ flexGrow: 1, padding: 10 }}
          >
            <Skeleton
              variant="rectangular"
              width="20%"
              height={50}
              animation="wave"
              style={{ marginBottom: 5 }}
            />
            <Skeleton
              variant="rectangular"
              width="30%"
              height={50}
              animation="wave"
            />
          </Stack>
        </Box>
      </ItemStyle>
    </Container>
  );
};

export default LoadingList;
