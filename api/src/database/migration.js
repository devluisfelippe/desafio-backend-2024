import { execSync } from "child_process";

async function runMigrations() {
    try {
        console.log('Running migrations...');

        // Execute Prisma migrations
        execSync('npx prisma migrate deploy', {
            stdio: 'inherit', // This will show the command output, useful for logging
        });

        console.log('Migrations completed.');
    } catch (error) {
        console.error('Error running migrations:', error);
    }
}

export default runMigrations;