DROP TABLE IF EXISTS `user_account`;

CREATE TABLE `user_account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` varchar(20) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_type` varchar(20) NOT NULL,
  `gender` char(1) NULL,
  `nickname` varchar(20) NOT NULL,
  `profile_image` varchar(255) NULL,
  `profile_text` varchar(255) NULL,
  `preference_types` varchar(255) NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `modified_at` datetime NOT NULL,
  `modified_by` varchar(20) NOT NULL,
  `deleted_at` datetime NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;