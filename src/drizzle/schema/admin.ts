import { mysqlTable, serial, varchar,boolean,int } from 'drizzle-orm/mysql-core';


export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }),
    email: varchar('email', { length: 50 }),
    password: varchar('password', { length: 50 }),
    active: boolean('active').default(false),
    role: varchar('role', { length: 5, enum: ["user", "admin"] }),
});

export const users_details = mysqlTable('users_details', {
    id: serial('id').primaryKey(),
    user_id: int('user_id').notNull().references(() => users.id),
    given_name: varchar('given_name', { length: 50 }),
    middle_name: varchar('middle_name', { length: 50 }),
    family_name: varchar('family_name', { length: 50 }),
    age: varchar('age', { length: 3 }),
    role: varchar('role', { length: 1, enum: ["M", "F"] }),
    address : varchar('address', { length: 256 }),
});


