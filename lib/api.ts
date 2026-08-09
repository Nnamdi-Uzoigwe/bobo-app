// const API_URL = process.env.EXPO_PUBLIC_API_URL;

// async function request(
//   method: "POST" | "PATCH",
//   path: string,
//   body: unknown,
//   token?: string,
// ) {
//   const res = await fetch(`${API_URL}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     body: JSON.stringify(body),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// }

// export const apiPost = (path: string, body: unknown, token?: string) =>
//   request("POST", path, body, token);

// export const apiPatch = (path: string, body: unknown, token?: string) =>
//   request("PATCH", path, body, token);

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
  token?: string,
) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const apiGet = (path: string, token?: string) =>
  request("GET", path, undefined, token);

export const apiPost = (path: string, body: unknown, token?: string) =>
  request("POST", path, body, token);

export const apiPatch = (path: string, body: unknown, token?: string) =>
  request("PATCH", path, body, token);

export const apiDelete = (path: string, token?: string) =>
  request("DELETE", path, undefined, token);
