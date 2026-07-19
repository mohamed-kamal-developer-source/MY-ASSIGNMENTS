module.exports = (i, $) => {
  const check = $(".current");

  const number = check
    .text()
    .trim()
    .replace(/page \d+\s+of\s+/i, "");

  if (!check["0"] || i === +number) {
    return false;
  } else {
    return true;
  }
};
