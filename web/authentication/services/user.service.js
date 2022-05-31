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

export async function usernameInUse(username) {
  const response = await fetch("/api/username/in-use", {
    ...request,
    method: "POST",
    body: JSON.stringify({ username }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`${data.message}`);
  }
}

export async function login(email) {
  const response = await fetch("/api/login", {
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

export async function validateUser({ username, email, first_name, surname }) {
  const response = await fetch("/api/validate-user", {
    ...request,
    method: "POST",
    body: JSON.stringify({ username, email, first_name, surname }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`${data.message}`);
  }
}

export async function register({ username, email, first_name, surname }) {
  const response = await fetch("/api/register", {
    ...request,
    method: "POST",
    body: JSON.stringify({ username, email, first_name, surname }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`${data.message}`);
  }
}
