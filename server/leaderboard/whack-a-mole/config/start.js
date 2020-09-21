const { app, PORT } = require('../app');

app.listen(PORT, () => {
    console.log(`Running: http://localhost:${PORT}`);
});
