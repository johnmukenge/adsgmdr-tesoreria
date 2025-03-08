const port = 3000;
const app = require('./index');
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});