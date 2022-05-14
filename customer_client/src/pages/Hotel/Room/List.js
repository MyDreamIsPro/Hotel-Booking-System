// UI lib
import { useSelector } from "react-redux";
// UI custom
// logic lib
import Item from "./Item";
// logic custom

//#region CSS
//#endregion

const RoomTypeList = ({
  setOpenViewer,
  setDataViewer,
  selectedRooms,
  setSelectedRooms,
}) => {
  const roomTypeList = useSelector((state) => state.room_type);
  return (
    <>
      {roomTypeList.map((roomType, index) => (
        <Item
          key={index}
          roomType={roomType}
          setDataViewer={setDataViewer}
          setOpenViewer={setOpenViewer}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
        />
      ))}
    </>
  );
};

export default RoomTypeList;
