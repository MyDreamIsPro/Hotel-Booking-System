import { authMiddleware } from "./middlewares.js";
import events from "./events.js";

const chatSocket = (io) => {
  io.use(authMiddleware).on("connection", (socket) => {
    // pre-setup
    // console.log(socket.id + " has connect");
    console.log(socket.user);
    global.users.set(socket.user._id.toString(), socket.id);

    socket.emit("get-info", { ...socket.user, socket_id: socket.id });
    socket.emit("get-all-contact", socket.user.chat_groups);

    socket.on("disconnect", () => {
      // console.log(socket.id + " has disconnected");
    });

    //events
    events(socket);
  });
};

export default chatSocket;
