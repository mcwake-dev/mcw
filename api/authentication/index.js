const app = require("./server");
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
