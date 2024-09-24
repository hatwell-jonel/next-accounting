import bcrypt from "bcryptjs";
import { db } from "./index";
import { users } from "./schema";

const usersData = [
    {
        id: 1,
        username: "administrator",
        email: "administrator@email.com",
        password: 'administrator',
        active: true,
        createdBy: 0,
        role: "admin",
    },
    {
        id: 2,
        username: "user1",
        email: "user1@email.com",
        password: 'administrator',
        active: true,
        createdBy: 0,
        role: "user",
    },
]

async function hashPasswords(users) {
    const saltRounds = 10;
    return Promise.all(users.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return {
        ...user,
        password: hashedPassword, // Replace plaintext password with hashed password
    };
    }));
}


// const usersDetailsData = [
//     {
//         id: 1,
//         userId: 2,
//         givenName: "John",
//         middleName: "",
//         familyName: "Doe",
//         birthDate: "1990-01-01",
//         age: "18",
//         gender: "M",
//         address: "123 Main Street, New York, NY 10001",
//     },
// ]

async function seed() {

    // Seed users
    const hashedUsers = await hashPasswords(usersData);
    for (const userData of hashedUsers) {
        await db
            .insert(users)
            .values(userData)
            .onDuplicateKeyUpdate({
            set: {
                updatedAt: new Date(),
            },
            })
            .execute();
        }

    console.log("Seeding complete.");
}

seed()
.then(() => {
    process.exit(0)
})
.catch((err) => {
console.error("Seeding failed:", err);
process.exit(1);
});


/**
 * INSTALL DOTENV
 * INSTALL DOTENV-CLI
 * INSTALL TSX
 */