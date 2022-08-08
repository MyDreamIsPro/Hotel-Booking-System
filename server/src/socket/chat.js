import { authMiddleware } from "./middlewares.js";
import events from "./events.js";

const chatSocket = (io) => {
  io.use(authMiddleware).on("connection", (socket) => {
    // pre-setup
    console.log(socket.id + " has connect");
    global.users.set(socket.user._id.toString(), socket.id);

    socket.emit("get-info", { ...socket.user, socket_id: socket.id });
    socket.emit(
      "get-all-contact",
      Array.from(global.contacts, ([name, value]) => value).filter(
        (item) => item._id !== socket.user._id
      )
    );

    socket.broadcast.emit("add-user", {
      _id: socket.user._id,
      full_name: socket.user.full_name,
      profile_image: socket.user.profile_image,
    });

    socket.on("disconnect", () => {
      console.log(socket.id + " has disconnected");
    });

    //events
    events(socket);
  });
};

export default chatSocket;
