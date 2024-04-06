DROP TABLE IF EXISTS `seller_account`;

CREATE TABLE `seller_account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` varchar(20) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role_type` varchar(20) NOT NULL,
  `business_name` varchar(20) NOT NULL,
  `business_number` varchar(10) NOT NULL,
  `auth_status` varchar(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `modified_at` datetime NOT NULL,
  `modified_by` varchar(20) NOT NULL,
  `deleted_at` datetime NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;