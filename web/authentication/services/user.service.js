const request = {
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function emailInUse(email) {
  const response = await fetch("/api/email/in-use", {
    ...request,
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`${data.message}`);
  }
}

export async function requestRefreshToken(email) {
  const response = await fetch("/api/authentication/request-refresh-token", {
    ...request,
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`${data.message}`);
  }
}
