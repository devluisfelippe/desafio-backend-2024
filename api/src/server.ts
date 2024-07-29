import app from "./app";
import runMigrations from "./database/migration";

const port = process.env.PORT || 3000;

runMigrations().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.log(`Error when initializing server: ${error.message}`)
});