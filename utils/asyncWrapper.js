module.exports = function asyncWrapper(fn, callbackError = () => {}) {
  return async function wrapped(req, res) {
    try {
     await fn(req, res);
    } catch (err) {
      callbackError(res,err);
    }
  };
};
