CREATE TABLE `accounting_users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(256) NOT NULL,
	`active` boolean NOT NULL DEFAULT false,
	`role` enum('user','admin') NOT NULL,
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	`updated_by` int,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`is_soft_deleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `accounting_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounting_users_username_unique` UNIQUE(`username`),
	CONSTRAINT `accounting_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `accounting_users_details` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`given_name` varchar(50) NOT NULL,
	`middle_name` varchar(50),
	`family_name` varchar(50) NOT NULL,
	`birth_date` date,
	`age` varchar(3) NOT NULL,
	`gender` enum('M','F') NOT NULL,
	`address` varchar(256),
	`created_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	`updated_by` int,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`is_soft_deleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `accounting_users_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `accounting_users_details` ADD CONSTRAINT `accounting_users_details_user_id_accounting_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `accounting_users`(`id`) ON DELETE cascade ON UPDATE cascade;