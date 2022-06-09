export const isValidUrl = (urlString = "") => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(urlString);
};

export const removeStringPrefix = (string = "") => {
  // Remove 'a ', 'an ', and 'the '
  if (string.toLowerCase().startsWith("a ")) {
    return string.slice(2);
  }

  if (string.toLowerCase().startsWith("an ")) {
    return string.slice(3);
  }

  if (string.toLowerCase().startsWith("the ")) {
    return string.slice(4);
  }

  return string;
};
