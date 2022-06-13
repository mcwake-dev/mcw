const request = {
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  method: "POST",
};

export async function requestLoginToken(email) {
  const response = await fetch(`/api/authentication/request-login-token`, {
    ...request,
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    return;
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
}
