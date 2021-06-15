const msg = {
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  TOKEN_INVALID: "TOKEN_INVALID",
  ERROR_USER_IS_EXISTS: "ERROR_USER_IS_EXISTS",
  ERROR_USER_IS_NOT_EXISTS: "ERROR_USER_IS_NOT_EXISTS",

  ERROR_LOGIN_INVALID: "ERROR_LOGIN_INVALID",

  ERROR_COMPANY_IS_EXISTS: "ERROR_COMPANY_IS_EXISTS",
  ERROR_COMPANY_IS_NOT_EXISTS: "ERROR_COMPANY_IS_NOT_EXISTS",

  ERROR_APP_PARAM_IS_EXISTS: "ERROR_APP_PARAM_IS_EXISTS",
  ERROR_APP_PARAM_IS_NOT_EXISTS: "ERROR_APP_PARAM_IS_NOT_EXISTS",

  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",

  INVOICE_NOT_EDITABLE: "INVOICE_NOT_EDITABLE",
  INVOICE_INVALID_STATUS: "INVOICE_INVALID_STATUS",
  ERROR_BALANCE_NOT_ENOUGH: "ERROR_BALANCE_NOT_ENOUGH",
};

const errorTranslator = {
  [msg.BAD_REQUEST]: () => `Ada kesalahan silahkan coba lagi`,
  [msg.ERROR_USER_IS_EXISTS]: (arr) => `User dengan email ${arr[0]} sudah ada`,
  [msg.ERROR_USER_IS_NOT_EXISTS]: () => `User tidak ditemukan`,
  [msg.ERROR_LOGIN_INVALID]: () => `Username atau Password salah`,

  [msg.NOT_FOUND]: () => `404 Data atau Url tidak ditemukan`,
  [msg.NOT_AUTHORIZED]: () => `Akses tidak diperbolehkan`,
  [msg.TOKEN_INVALID]: () => `Kesalahan pada applikasi, silahkan login kembali`,
};

class AppError extends Error {
  constructor(code, obj) {
    super(code);
    this.name = this.constructor.name;
    this.message = errorTranslator[code](obj) || code;
    this.code = code;
    this.params = obj;
    this.statusCode = 400;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorMessage: msg,
  AppError,
};
