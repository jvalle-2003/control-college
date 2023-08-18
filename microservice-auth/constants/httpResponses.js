const HTTP_OK = (statusCode, message, data) => ({
    statusCode,
    message,
    data,
  });
  
  const HTTP_ERR = (statusCode, message, isError) => ({
    statusCode,
    message,
    error: isError,
  });
  
  /**
   * 
   * @param {*} req Request
   * @param {*} code status
   * @param {*} key controller
   * @param {*} parameters Optional object to provide additional message details.
   * @returns 
   */
  const HTTP_MESSAGE = (req, code, key, parameters) =>
    req.i18n.t(`${key}_${code}`, parameters);
  
  const HTTP_RESPONSE = (res, httpCode, msgKey, data = null, isOk) => {
    message = HTTP_MESSAGE(res, httpCode, msgKey);
  
    sendClient = isOk
      ? HTTP_OK(httpCode, message, data)
      : HTTP_ERR(httpCode, message, true);
    return res.status(sendClient.statusCode).send(sendClient);
  };
  
  module.exports = {
    HTTP_MESSAGE,
    HTTP_RESPONSE,
  };