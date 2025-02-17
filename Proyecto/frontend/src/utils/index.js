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

export { getCSRFToken };
