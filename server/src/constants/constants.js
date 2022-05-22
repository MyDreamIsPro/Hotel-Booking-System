export const INTEGER = {
  ADMIN_ROLE: 2412,
  EMPLOYEE_ROLE: 1108,
  CUSTOMER_ROLE: 1998,

  //BOOKING STATUS
  BOOKING_CANCELED: 1, // user cancelled booking before check-in
  BOOKING_IN_PROGRESS: 2, // user paid but not check in yet
  BOOKING_CHECK_IN: 3, // user checked in
  BOOKING_CHECK_OUT: 4, // user check-out

  //ROOM STATUS
  ROOM_EMPTY: 1,
  ROOM_PENDING: 2,
  ROOM_RENTED: 3,
};

export const STRING = {
  SECRET_KEY: "tuanvq1357*",
  PHONE_EXIST_ERROR_MESSAGE:
    "Số điện thoại này đã tồn tại. Quý khách vui lòng chọn số điện thoại khác",
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
  BOOKING_NOT_FOUND: "Đơn đặt chỗ không tồn tại",
  USER_BANNED:
    "Tài khoản này đã bị khóa. Quý khách vui lòng liên hệ quản trị viên để biết thêm chi tiết",
};
