// This middleware helps handle async route handlers and propagate errors
export const catchAsyncError = (passedFunction) => {
    return (req, res, next) => {
      Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
  };