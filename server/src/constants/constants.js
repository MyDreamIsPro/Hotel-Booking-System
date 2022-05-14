export const INTEGER = {
  ADMIN_ROLE: 2412,
  EMPLOYEE_ROLE: 1108,
  CUSTOMER_ROLE: 1998,

  //BOOKING STATUS
  BOOKING_IN_PROGRESS: 1, // user paid but not check-in yet
  BOOKING_COMPLETED: 2, // user check-out
  BOOKING_CANCELED: 3, // user canceled booking before check-in

  //ROOM STATUS
  ROOM_EMPTY: 1,
  ROOM_PENDING: 2,
  ROOM_RENTED: 3,
};

export const STRING = {
  SECRET_KEY: "tuanvq1357*",
  USERNAME_EXIST_ERROR_MESSAGE:
    "Tài khoản này đã tồn tại. Quý khách vui lòng chọn tài khoản khác",
  WRONG_USERNAME_PASSWORD_ERROR_MESSAGE:
    "Sai tài khoản hoặc mật khẩu. Quý khách vui lòng thử lại",
  UNEXPECTED_ERROR_MESSAGE: "Đã có lỗi xảy ra. Quý khách vui lòng thử lại sau",
  OLD_PASSWORD_WRONG: "Mật khẩu cũ không chính xác",
  PERMISSION_DENIED: "Tài khoản này không được cấp quyền truy cập",

  AUTHENTICATION_FAILED:
    "Qúy khách vui lòng đăng nhập để thực hiện chức năng này",

  ROOM_ALREADY_EXIST: "Số phòng này đã tồn tại trong khách sạn",
  ROOM_TYPE_ALREADY_EXIST: "Loại phòng này đã tồn tại trong khách sạn",
};
