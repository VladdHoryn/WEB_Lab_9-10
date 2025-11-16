export interface NormalizedApiError {
  message: string;
  status?: number;
}

export function normalizeApiError(error: any): NormalizedApiError {
  if (error?.message && ("status" in error)) {
    return {
      message: error.message,
      status: error.status,
    };
  }

  return {
    message: error?.message || "Unknown error",
    status: undefined,
  };
}
