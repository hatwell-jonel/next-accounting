// import { db } from "./index";
// import { users, usersDetails } from "./schema";
// import bcrypt from "bcrypt";

// const usersData = [
//     {
//         id: 1,
//         username: "administrator",
//         email: "administrator@email.com",
//         password: 'administrator',
//         active: true,
//         createdBy: 0,
//         role: "admin",
//     },
//     {
//         id: 2,
//         username: "user1",
//         email: "user1@email.com",
//         password: 'administrator',
//         active: true,
//         createdBy: 0,
//         role: "user",
//     },
// ]

// // const usersDetailsData = [
// //     {
// //         id: 1,
// //         userId: 2,
// //         givenName: "John",
// //         middleName: "",
// //         familyName: "Doe",
// //         birthDate: "1990-01-01",
// //         age: "18",
// //         gender: "M",
// //         address: "123 Main Street, New York, NY 10001",
// //     },
// // ]

// const saltRounds = 10;

// // Function to hash passwords
// async function hashPasswords(users : any[]) : Promise<any[]>{
//     return Promise.all(users.map(async user => {
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//     return {
//         ...user,
//         password: hashedPassword, // Replace plaintext password with hashed password
//     };
//     }));
// }

// async function seed() {
//     // await db.transaction(async (tx) => {
//         console.log(usersData);
//     // });
// }

// seed()
// .then(() => process.exit(0))
// .catch((err) => {
// console.error("Seeding failed:", err);
// process.exit(1);
// });


// /**
//  * INSTALL DOTENV
//  * INSTALL DOTENV-CLI
//  * INSTALL TSX
//  */