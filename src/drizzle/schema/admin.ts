import { 
    serial, 
    varchar, 
    boolean, 
    bigint, 
    int, 
    timestamp, 
    date, 
    mysqlEnum
} from 'drizzle-orm/mysql-core';
import { accountingTable } from './_prefix-table';
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

const now = sql`CURRENT_TIMESTAMP()`;

const defaultColumns = {
    createdBy: int('created_by').notNull(),
    createdAt: timestamp("created_at").notNull().default(now),
    updatedBy: int('updated_by'),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    isSoftDeleted: boolean('is_soft_deleted').default(false).notNull(),
};

export const users = accountingTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 50 }).unique().notNull(),
    email: varchar('email', { length: 50 }).unique().notNull(),
    password: varchar('password', { length: 50 }).notNull(),
    active: boolean('active').default(false).notNull(),
    role: mysqlEnum('role', ["user", "admin"] ).notNull(),
    ...defaultColumns,
});

export const usersDetails = accountingTable('users_details', {
    id: serial('id').primaryKey(),
    userId: bigint('user_id', { mode: 'number', unsigned: true })
    .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }).notNull(),
    givenName: varchar('given_name', { length: 50 }).notNull(),
    middleName: varchar('middle_name', { length: 50 }),
    familyName: varchar('family_name', { length: 50 }).notNull(),
    birthDate: date('birth_date'),
    age: varchar('age', { length: 3 }).notNull(),
    gender: mysqlEnum('gender',["M", "F"]).notNull(),
    address : varchar('address', { length: 256 }),
    ...defaultColumns,
});

// RELATIONS
export const usersRelations = relations(users, ({one}) => ({
    usersDetails : one(usersDetails, {
        fields : [users.id],
        references: [usersDetails.userId],
    })
}));