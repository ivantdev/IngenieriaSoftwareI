function getCSRFToken() {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === "csrftoken") {
      return value;
    }
  }
  return null;
}

async function fetchWithAuth(url, options, setUser) {
  const response = await fetch(url, {
    ...options,
    image: "/placeholder.svg?height=64&width=64",
    credentials: "include",
  });

  if (response.status === 403) {
    setUser({
      isActiveSession: false,
    });
    window.location.href = "/login";
  }

  return response;
}

export { getCSRFToken, fetchWithAuth };
