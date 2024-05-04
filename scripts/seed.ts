const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

// Variables to seed the database with

async function main() {
	try {
		// await database.$connect();
		// Call prisma to seed the database or other functions
		console.log("Database seeded successfully");
	} catch (error) {
		console.log("Error seeding database categories", error);
	} finally {
		console.log("Closing database connection");
		await database.$disconnect();
	}
}

main();