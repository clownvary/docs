export default (xhr) => {
  const text = xhr.responseText;

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};
