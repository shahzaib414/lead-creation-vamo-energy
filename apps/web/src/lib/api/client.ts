export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
}

export async function requestJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error
        ? `Unable to reach the backend API. ${error.message}`
        : "Unable to reach the backend API.",
      0
    );
  }

  const responseBody = await response.json();

  if (!response.ok) {
    const message =
      extractNestErrorMessage(responseBody) ??
      `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return responseBody as T;
}

function extractNestErrorMessage(responseBody: unknown) {
  if (!responseBody || typeof responseBody !== "object") {
    return null;
  }

  const maybeMessage = (responseBody as { message?: unknown }).message;

  if (typeof maybeMessage === "string") {
    return maybeMessage;
  }

  if (
    Array.isArray(maybeMessage) &&
    maybeMessage.length > 0 &&
    typeof maybeMessage[0] === "string"
  ) {
    return maybeMessage[0];
  }

  return null;
}
