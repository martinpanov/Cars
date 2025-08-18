type ValidationError = {
  name: string;
  errors: Record<string, { message: string }>;
};

type ErrorWithMessage = {
  msg: string;
};

function parserError(error: any): string[] {
  console.log(error);
  
  // Handle array of validation errors
  if (Array.isArray(error)) {
    return error.map((e: ErrorWithMessage) => e.msg);
  }
  
  // Handle mongoose validation errors
  if (error.name === 'ValidationError') {
    const validationError = error as ValidationError;
    return Object.values(validationError.errors).map(v => v.message);
  }
  
  // Handle single error message
  return [error.message];
}

export default parserError;