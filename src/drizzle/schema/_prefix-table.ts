import { mysqlTableCreator } from "drizzle-orm/mysql-core";
export const accountingTable = mysqlTableCreator((name) => `accounting_${name}`);