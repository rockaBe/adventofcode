const fs = require("fs").promises;

const getData = async () => {
  const fname = "input.txt";

  let data;
  try {
    const buf = await fs.readFile(fname);
    data = buf.toString("utf-8");
  } catch (e) {
    if (e && e.message) {
      e.message = `Error while reading ${fname}: ` + e.message;
    }
    throw e;
  }
  return data;
};

module.exports = getData;
