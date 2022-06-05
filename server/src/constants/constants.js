export const INTEGER = {
  ADMIN_ROLE: 2412,
  EMPLOYEE_ROLE: 1108,
  CUSTOMER_ROLE: 1998,

  // LOG ACTION TYPES
  LOG_ADD: 1, // add record
  LOG_UPDATE: 2, // update record
  LOG_DELETE: 3, // delete record
  LOG_CHECK_IN_BOOKING: 4, // check in booking
  LOG_CHECK_OUT_BOOKING: 5, // check out booking
  LOG_BOOK_BOOKING: 6, // user book place
  LOG_CANCEL_BOOKING: 7, // user cancel booking
  LOG_BAN_ACCOUNT: 8, // admin ban an account
  LOG_ACTIVE_ACCOUNT: 9, // admin active an account
  LOG_SEND_REVIEW: 10, // user send a review
  LOG_APPROVE_REVIEW: 11, // admin approve a review
  LOG_REJECT_REVIEW: 12, // admin reject a review
  LOG_RESET_REVIEW: 13, // admin reset a review
  LOG_RESTORE: 14, // admin use restoring feature

  //BOOKING STATUS
  BOOKING_CANCELED: 1, // user cancelled booking before check-in
  BOOKING_IN_PROGRESS: 2, // user paid but not check in yet
  BOOKING_CHECK_IN: 3, // user checked in
  BOOKING_CHECK_OUT: 4, // user check-out

  //ROOM STATUS
  ROOM_EMPTY: 1,
  ROOM_PENDING: 2,
  ROOM_RENTED: 3,

  // REVIEW STATUS
  REVIEW_WAITING: 1,
  REVIEW_ACCEPTED: 2,
  REVIEW_IGNORED: 3,

  // DISCOUNT TYPE
  AMOUNT_DISCOUNT: 0,
  PERCENTAGE_DISCOUNT: 1,
};

export const STRING = {
  SECRET_KEY: "tuanvq1357*",

  DISCOUNT_CODE_ALREADY_EXIST: "Mã khuyến mãi này đã tồn tại",
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
