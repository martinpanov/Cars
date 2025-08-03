function parserError(error) {
  console.log(error);
  if (Array.isArray(error)) {
    return error.map(e => e.msg);
  } else if (error.name == 'ValidationError') {
    return Object.values(error.errors).map(v => v.message);
  } else {
    return [error.message];
  }
}

module.exports = parserError;