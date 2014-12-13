-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
        
CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NULL,
  `password` VARCHAR(30) NULL,
  `provider` VARCHAR(30) NULL,
  `provider_id` VARCHAR(60) NULL,
  `mail` VARCHAR(60) NULL,
  `picture` VARCHAR(300) NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Checkups'
-- 
-- ---

DROP TABLE IF EXISTS `Checkups`;
        
CREATE TABLE `Checkups` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(30) NULL,
  `phase` VARCHAR(30) NULL,
  `fork_from` INTEGER NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `created_by` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Quotes'
-- 
-- ---

DROP TABLE IF EXISTS `Quotes`;
        
CREATE TABLE `Quotes` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NOT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `author` INTEGER NOT NULL,
  `where` MEDIUMTEXT NOT NULL,
  `when` DATE NULL,
  `category_id` INTEGER NULL,
  `rate` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Sources'
-- 
-- ---

DROP TABLE IF EXISTS `Sources`;
        
CREATE TABLE `Sources` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NULL,
  `source_entity_id` INTEGER NULL,
  `type` INTEGER NULL,
  `what` MEDIUMTEXT NULL,
  `checked` BIT DEFAULT 0,
  `observation` MEDIUMTEXT NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Contexts'
-- 
-- ---

DROP TABLE IF EXISTS `Contexts`;
        
CREATE TABLE `Contexts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NOT NULL DEFAULT 0,
  `body` MEDIUMTEXT NOT NULL,
  `tags` VARCHAR(100) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rates'
-- 
-- ---

DROP TABLE IF EXISTS `Rates`;
        
CREATE TABLE `Rates` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `checkup_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  `qualification` INTEGER NULL,
  `score` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Entities'
-- 
-- ---

DROP TABLE IF EXISTS `Entities`;
        
CREATE TABLE `Entities` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NULL,
  `description` VARCHAR(300) NULL,
  `type` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Inputs'
-- Aportes/Post
-- ---

DROP TABLE IF EXISTS `Inputs`;
        
CREATE TABLE `Inputs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `type` INTEGER NULL,
  `refers_to` INTEGER NULL,
  `text` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) COMMENT 'Aportes/Post';

-- ---
-- Table 'Comments'
-- 
-- ---

DROP TABLE IF EXISTS `Comments`;
        
CREATE TABLE `Comments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `input_id` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Actions'
-- 
-- ---

DROP TABLE IF EXISTS `Actions`;
        
CREATE TABLE `Actions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `made_by` INTEGER NULL,
  `type` INTEGER NULL,
  `on` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Checkup_User'
-- 
-- ---

DROP TABLE IF EXISTS `Checkup_User`;
        
CREATE TABLE `Checkup_User` (
  `user_id` INTEGER NOT NULL,
  `checkup_id` INTEGER NOT NULL,
  `role_id` INTEGER NOT NULL DEFAULT 0,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `checkup_id`)
);

-- ---
-- Table 'Entity_Relations'
-- 
-- ---

DROP TABLE IF EXISTS `Entity_Relations`;
        
CREATE TABLE `Entity_Relations` (
  `entity_id_from` INTEGER NULL AUTO_INCREMENT,
  `entity_id_to` INTEGER NULL,
  `type` INTEGER NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`entity_id_from`)
);

-- ---
-- Table 'Source_Types'
-- 
-- ---

DROP TABLE IF EXISTS `Source_Types`;
        
CREATE TABLE `Source_Types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Entity_Types'
-- 
-- ---

DROP TABLE IF EXISTS `Entity_Types`;
        
CREATE TABLE `Entity_Types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Qualifications'
-- 
-- ---

DROP TABLE IF EXISTS `Qualifications`;
        
CREATE TABLE `Qualifications` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Scores'
-- 
-- ---

DROP TABLE IF EXISTS `Scores`;
        
CREATE TABLE `Scores` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Relation_Types'
-- 
-- ---

DROP TABLE IF EXISTS `Relation_Types`;
        
CREATE TABLE `Relation_Types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Action_Types'
-- 
-- ---

DROP TABLE IF EXISTS `Action_Types`;
        
CREATE TABLE `Action_Types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Role_Types'
-- 
-- ---

DROP TABLE IF EXISTS `Role_Types`;
        
CREATE TABLE `Role_Types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Categories'
-- 
-- ---

DROP TABLE IF EXISTS `Categories`;
        
CREATE TABLE `Categories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NULL,
  `description` VARCHAR(60) NULL,
  `created_by` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Rates` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkups` (`id`);
ALTER TABLE `Rates` ADD FOREIGN KEY (user_id) REFERENCES `Checkup_User` (`user_id`);
ALTER TABLE `Rates` ADD FOREIGN KEY (qualification) REFERENCES `Qualifications` (`id`);
ALTER TABLE `Rates` ADD FOREIGN KEY (score) REFERENCES `Scores` (`id`);
ALTER TABLE `Entities` ADD FOREIGN KEY (id) REFERENCES `Entity_Relations` (`entity_id_from`);
ALTER TABLE `Entities` ADD FOREIGN KEY (type) REFERENCES `Entity_Types` (`id`);
ALTER TABLE `Sources` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkups` (`id`);
ALTER TABLE `Sources` ADD FOREIGN KEY (source_entity_id) REFERENCES `Entities` (`id`);
ALTER TABLE `Sources` ADD FOREIGN KEY (type) REFERENCES `Source_Types` (`id`);
ALTER TABLE `Checkup_User` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `Checkup_User` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkups` (`id`);
ALTER TABLE `Quotes` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkups` (`id`);
ALTER TABLE `Quotes` ADD FOREIGN KEY (author) REFERENCES `Entities` (`id`);
ALTER TABLE `Quotes` ADD FOREIGN KEY (category_id) REFERENCES `Categories` (`id`);
ALTER TABLE `Contexts` ADD FOREIGN KEY (checkup_id) REFERENCES `Checkups` (`id`);
ALTER TABLE `Entity_Relations` ADD FOREIGN KEY (entity_id_to) REFERENCES `Entities` (`id`);
ALTER TABLE `Entity_Relations` ADD FOREIGN KEY (type) REFERENCES `Relation_Types` (`id`);
ALTER TABLE `Actions` ADD FOREIGN KEY (type) REFERENCES `Action_Types` (`id`);
ALTER TABLE `Comments` ADD FOREIGN KEY (input_id) REFERENCES `Inputs` (`id`);

-- ---
-- Table Properties
-- ---

 ALTER TABLE `Checkups` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Rates` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Entities` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Sources` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Checkup_User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Quotes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Contexts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Source_Types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Entity_Types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Qualifications` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Scores` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Entity_Relations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Actions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Relation_Types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Action_Types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Role_Types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Comments` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 ALTER TABLE `Inputs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Checkups` (`id`,`status`,`phase`,`fork_from`) VALUES
-- ('','','','');
-- INSERT INTO `Rates` (`id`,`checkup_id`,`user_id`,`qualification`,`score`) VALUES
-- ('','','','','');
-- INSERT INTO `Entities` (`id`,`name`,`description`,`type`) VALUES
-- ('','','','');
-- INSERT INTO `Sources` (`id`,`checkup_id`,`source_entity_id`,`type`,`what`,`checked`,`observation`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Checkup_User` (`user_id`,`checkup_id`,`role_id`) VALUES
-- ('','','');
-- INSERT INTO `Quotes` (`id`,`checkup_id`,`text`,`author`,`where`,`when`,`category_id`,`rate`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Users` (`id`,`provider`,`provider_id`,`mail`,`picture`) VALUES
-- ('','','','','');
-- INSERT INTO `Contexts` (`id`,`checkup_id`,`body`,`tags`) VALUES
-- ('','','','');
-- INSERT INTO `Source_Types` (`id`) VALUES
-- ('');
-- INSERT INTO `Entity_Types` (`id`) VALUES
-- ('');
-- INSERT INTO `Qualifications` (`id`) VALUES
-- ('');
-- INSERT INTO `Scores` (`id`) VALUES
-- ('');
-- INSERT INTO `Entity_Relations` (`entity_id_from`,`entity_id_to`,`type`) VALUES
-- ('','','');
-- INSERT INTO `Actions` (`id`,`made_by`,`type`,`on`) VALUES
-- ('','','','');
-- INSERT INTO `Relation_Types` (`id`) VALUES
-- ('');
-- INSERT INTO `Action_Types` (`id`) VALUES
-- ('');
-- INSERT INTO `Role_Types` (`id`) VALUES
-- ('');
-- INSERT INTO `Comments` (`id`,`input_id`) VALUES
-- ('','');
-- INSERT INTO `Categories` (`id`) VALUES
-- ('');
-- INSERT INTO `Inputs` (`id`,`type`,`refers_to`,`text`) VALUES
-- ('','','','');


