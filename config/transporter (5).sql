-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2019 at 05:33 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `account_name` varchar(250) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `account_group_id` char(36) DEFAULT NULL,
  `account_type` varchar(50) DEFAULT NULL,
  `gst_registration_type` varchar(50) DEFAULT NULL,
  `gst_type` varchar(50) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `address1` varchar(200) DEFAULT NULL,
  `address2` varchar(200) DEFAULT NULL,
  `address3` varchar(200) DEFAULT NULL,
  `area` varchar(250) DEFAULT NULL,
  `pin_code` int(6) DEFAULT NULL,
  `pnone_no` varchar(15) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `gst_no` varchar(50) DEFAULT NULL,
  `pan_no` varchar(20) DEFAULT NULL,
  `adhar_no` varchar(20) DEFAULT NULL,
  `tan_no` varchar(25) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `creditdays` smallint(3) DEFAULT NULL,
  `credit_limit` int(15) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `balance_method` varchar(15) NOT NULL,
  `type` varchar(5) NOT NULL,
  `amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `account_groups`
--

CREATE TABLE `account_groups` (
  `group_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `group_name` varchar(240) DEFAULT NULL,
  `group_under` varchar(252) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `account_opening_balances`
--

CREATE TABLE `account_opening_balances` (
  `accunt_opening_balance_id` char(36) NOT NULL,
  `account_id` char(36) DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  `bill_no` varchar(25) DEFAULT NULL,
  `bill_date` date DEFAULT NULL,
  `bill_type` varchar(250) DEFAULT NULL,
  `balance_type` varchar(10) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `bank_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `bank_name` varchar(240) DEFAULT NULL,
  `bank_code` varchar(10) DEFAULT NULL,
  `account_no` int(15) DEFAULT NULL,
  `branch` varchar(240) DEFAULT NULL,
  `ifsc_code` varchar(24) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `area` varchar(220) DEFAULT NULL,
  `pin_code` int(6) DEFAULT NULL,
  `pnone_no` varchar(15) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cargos`
--

CREATE TABLE `cargos` (
  `product_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `product_name` varchar(240) DEFAULT NULL,
  `product_code` varchar(252) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `district_id` int(11) NOT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `city_name` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `country_name` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `district_id` int(11) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `district_name` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->false,1->true',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driver_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `account_name` varchar(100) DEFAULT NULL,
  `local_address` varchar(250) DEFAULT NULL,
  `permanent_address` varchar(250) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `mobile_no2` varchar(15) DEFAULT NULL,
  `aadhar_card_no` varchar(20) DEFAULT NULL,
  `police_station` varchar(120) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `basic_salery` int(21) DEFAULT NULL,
  `per_day_salary` int(5) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `driver_licenses`
--

CREATE TABLE `driver_licenses` (
  `driver_license_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `driver_id` char(36) DEFAULT NULL,
  `license_name` varchar(100) DEFAULT NULL,
  `license_no` varchar(40) DEFAULT NULL,
  `license_issue_date` date DEFAULT NULL,
  `license_expire_date` date DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `from-destinations`
--

CREATE TABLE `from-destinations` (
  `from-destination_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `name` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lr_entries`
--

CREATE TABLE `lr_entries` (
  `lr_entry_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `vechile_id` char(36) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `lr/gr_no` varchar(50) DEFAULT NULL,
  `reference_by` varchar(120) DEFAULT NULL,
  `from_from_destination_id` char(36) DEFAULT NULL,
  `to_from_destination_id` char(36) DEFAULT NULL,
  `cargo_id` int(21) DEFAULT NULL,
  `container_no` int(10) DEFAULT NULL,
  `load_weight` double DEFAULT NULL,
  `party_rate` float DEFAULT NULL,
  `freight_calculation` double DEFAULT NULL,
  `gross_freight` float DEFAULT NULL,
  `net_freight` float DEFAULT NULL,
  `freight_paid_by` varchar(50) DEFAULT NULL,
  `consignor_id` char(36) DEFAULT NULL,
  `consignee_id` char(36) DEFAULT NULL,
  `insurance_company` varchar(120) DEFAULT NULL,
  `policy_no` varchar(100) DEFAULT NULL,
  `insurance_amount` float DEFAULT NULL,
  `truck_owner_id` char(36) DEFAULT NULL,
  `truck_rate` float DEFAULT NULL,
  `truck_freight_calculation` float DEFAULT NULL,
  `truck_gross_freight` float DEFAULT NULL,
  `truck_net_freight` float DEFAULT NULL,
  `detention_day` float DEFAULT NULL,
  `detention_truck_rate` float DEFAULT NULL,
  `detention_party_rate` float DEFAULT NULL,
  `detention_amount` float DEFAULT NULL,
  `unload_weight` float DEFAULT NULL,
  `shortage` float DEFAULT NULL,
  `shortage_allow` float DEFAULT NULL,
  `net_shortage` float DEFAULT NULL,
  `truck_shortage_rate` float DEFAULT NULL,
  `party_shortage_rate` float DEFAULT NULL,
  `shortage_amount` float DEFAULT NULL,
  `net_party` float DEFAULT NULL,
  `net_transporter` float DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lr_entry_advance_receiveds`
--

CREATE TABLE `lr_entry_advance_receiveds` (
  `lr_entry_advance_received_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `lr_entry_id` char(36) DEFAULT NULL,
  `account_id` char(36) DEFAULT NULL,
  `slip_no` int(11) DEFAULT NULL,
  `rate` int(10) DEFAULT NULL,
  `liter` int(10) DEFAULT NULL,
  `paid_to` varchar(120) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `document_no` int(10) DEFAULT NULL,
  `document_date` date DEFAULT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lr_entry_advance_truck_receiveds`
--

CREATE TABLE `lr_entry_advance_truck_receiveds` (
  `lr_entry_advance_truck_received_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `lr_entry_id` char(36) DEFAULT NULL,
  `account_id` char(36) DEFAULT NULL,
  `slip_no` char(36) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `liter` float DEFAULT NULL,
  `paid_to` varchar(120) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `document_no` int(10) DEFAULT NULL,
  `document_date` date DEFAULT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lr_entry_extra_details`
--

CREATE TABLE `lr_entry_extra_details` (
  `lr_entry_extra_detail_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `lr_entry_id` char(36) DEFAULT NULL,
  `gross_weight` float DEFAULT NULL,
  `tare_weight` float DEFAULT NULL,
  `gst_pay_by` varchar(25) DEFAULT NULL,
  `value_of_consignment` varchar(50) DEFAULT NULL,
  `invoice_no_date` varchar(100) DEFAULT NULL,
  `be_no_date` varchar(100) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `voucher_no` varchar(50) DEFAULT NULL,
  `voucher_type` varchar(50) DEFAULT NULL,
  `cash_bank` int(21) DEFAULT NULL,
  `account_name` varchar(120) DEFAULT NULL,
  `ref _type` varchar(120) DEFAULT NULL,
  `particular` varchar(120) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `role_title` varchar(220) DEFAULT NULL,
  `alias` varchar(25) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `user_id`, `role_title`, `alias`, `is_deleted`, `status`, `created`, `updated`) VALUES
(1, '1', 'Admin', 'admin', 0, 1, '2019-01-17 18:44:50', '2019-01-17 18:45:25');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `state_id` int(11) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_name` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `role_id` int(3) NOT NULL DEFAULT '1',
  `parent_id` char(36) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(220) NOT NULL,
  `country_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `zipcode` varchar(200) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `image` varchar(220) DEFAULT NULL,
  `address` text,
  `contact_detail` text,
  `contact_person` varchar(220) DEFAULT NULL,
  `remarks` text,
  `gender` enum('Male','Female') DEFAULT NULL,
  `age` int(5) DEFAULT NULL,
  `activation_key` varchar(200) DEFAULT NULL,
  `signup_type` enum('twitter','facebook','site','googleplus') NOT NULL DEFAULT 'site',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  `token` varchar(220) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `parent_id`, `first_name`, `last_name`, `username`, `email`, `password`, `country_id`, `state_id`, `city_id`, `district_id`, `zipcode`, `phone`, `mobile_no`, `image`, `address`, `contact_detail`, `contact_person`, `remarks`, `gender`, `age`, `activation_key`, `signup_type`, `status`, `is_delete`, `token`, `created`, `last_login`, `updated`) VALUES
('1', 1, '0', 'Sunil', 'kumar', 'sunil', 'sunil@gmail.com', '$2b$10$oDmMzEq4GXeOykSsx9qJV.s0pJs4PfLfhuVR.86FLtrnHoO4MC7aO', 0, 0, NULL, NULL, '', '', NULL, '', '', '', '', '', '', 0, '', 'site', 1, 0, '', '2019-02-12 04:06:40', NULL, '2019-02-16 17:56:11'),
('bf4cb246-cb7a-4e12-80b7-3bf4d7d1e1cf', 1, '1', 'Raman', 'kumar', 'sunil67', 'anraj@gmail.com', '$2b$10$cpi1FuFT4y9S8neVsNbncuDBXaqPdFVK4LujZqoSy/0d8oomn3fxO', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'site', 1, 0, NULL, '2019-02-24 06:47:31', NULL, '2019-02-24 06:47:31'),
('67f53067-ba06-4798-9e3d-f4c6631ea1e4', 1, '1', 'Raman', 'kumar', '343', 'dfdsj@gmail.com', '$2b$10$wZ24SOFX8Pel1IXLWV0yTe5ZEGTPUKUVo/Ubr8Dvq6kCx00afFa3q', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'site', 1, 0, NULL, '2019-02-24 06:42:54', NULL, '2019-02-24 06:42:54'),
('44ba1e55-d0b9-4341-9511-444613cec2ed', 1, 'd4cb001f-cc1f-4354-8661-9d21cb7cab26', 'Raman', 'kumar', 'sunil2', 'mr.ramanraj@gmail.co', '$2b$10$9QMWX/IFQ.lrw72se3BlnefmRT2oMeAKWBFjXOesqbeCdY7G1Cl/m', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'site', 1, 0, NULL, '2019-02-24 06:33:11', NULL, '2019-02-24 06:33:11'),
('d4cb001f-cc1f-4354-8661-9d21cb7cab26', 1, '1', 'Raman', 'kumar', 'raman', 'mr.ramanraj@gmail.com', '$2b$10$AeIo5i7bIYyvaBqxZfjIou3UJViNNsp9KpgzBeCqYQgqLx55bw4OK', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'site', 1, 0, NULL, '2019-02-24 06:28:43', NULL, '2019-02-24 06:28:43'),
('0c6242c1-f08a-4fc7-88b1-4ccda174ec16', 1, '1', 'Raman', 'kumar', 'rt', 'mr.rtranraj@gmail.com', '$2b$10$U2BaQwqK9MyGVh5Ppre2GekEA8F0NFEp2Gy/wgT8..0w89toeTmGu', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'site', 1, 0, NULL, '2019-02-25 03:15:38', NULL, '2019-02-25 03:15:38');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vechile_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `vechile_no` varchar(20) DEFAULT NULL,
  `owner_type` varchar(50) DEFAULT NULL,
  `vechile_owner_id` char(36) DEFAULT NULL,
  `account_id` char(36) DEFAULT NULL,
  `vechile_group_id` char(36) DEFAULT NULL,
  `capacity` int(10) DEFAULT NULL COMMENT 'in tone',
  `average` int(10) DEFAULT NULL,
  `vechile_type` varchar(10) DEFAULT NULL,
  `RTO` varchar(50) DEFAULT NULL,
  `engine_no` varchar(20) DEFAULT NULL,
  `chassis_no` varchar(25) DEFAULT NULL,
  `load_capacity` int(10) DEFAULT NULL,
  `make` int(10) DEFAULT NULL,
  `mode` varchar(10) DEFAULT NULL,
  `insurance_company` varchar(250) DEFAULT NULL,
  `policy_no` varchar(20) DEFAULT NULL,
  `renew_date` date DEFAULT NULL,
  `amount` int(10) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `finance_company_name` varchar(120) DEFAULT NULL,
  `finance_amount` int(10) DEFAULT NULL,
  `finance_date_from` date DEFAULT NULL,
  `finance_date_to` date DEFAULT NULL,
  `Installment_amount` int(11) DEFAULT NULL,
  `Installment_date` date DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_drivers`
--

CREATE TABLE `vehicle_drivers` (
  `vechile_driver_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `driver_id` char(36) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_groups`
--

CREATE TABLE `vehicle_groups` (
  `vechile_type_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `vehicle_group` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_rto_details`
--

CREATE TABLE `vehicle_rto_details` (
  `vechile_rto_detail_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `vehicle_id` char(36) DEFAULT NULL,
  `document_type` varchar(50) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `document_no` varchar(50) DEFAULT NULL,
  `document_file` varchar(50) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `vechile_type_id` int(11) NOT NULL,
  `user_id` int(21) DEFAULT NULL,
  `vehicle_type` varchar(240) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0->not delete,1->delete',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>active,0=>Deactivate',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `account_groups`
--
ALTER TABLE `account_groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `account_opening_balances`
--
ALTER TABLE `account_opening_balances`
  ADD PRIMARY KEY (`accunt_opening_balance_id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`bank_id`);

--
-- Indexes for table `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`);

--
-- Indexes for table `driver_licenses`
--
ALTER TABLE `driver_licenses`
  ADD PRIMARY KEY (`driver_license_id`);

--
-- Indexes for table `from-destinations`
--
ALTER TABLE `from-destinations`
  ADD PRIMARY KEY (`from-destination_id`);

--
-- Indexes for table `lr_entries`
--
ALTER TABLE `lr_entries`
  ADD PRIMARY KEY (`lr_entry_id`);

--
-- Indexes for table `lr_entry_advance_receiveds`
--
ALTER TABLE `lr_entry_advance_receiveds`
  ADD PRIMARY KEY (`lr_entry_advance_received_id`);

--
-- Indexes for table `lr_entry_advance_truck_receiveds`
--
ALTER TABLE `lr_entry_advance_truck_receiveds`
  ADD PRIMARY KEY (`lr_entry_advance_truck_received_id`);

--
-- Indexes for table `lr_entry_extra_details`
--
ALTER TABLE `lr_entry_extra_details`
  ADD PRIMARY KEY (`lr_entry_extra_detail_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vechile_id`);

--
-- Indexes for table `vehicle_drivers`
--
ALTER TABLE `vehicle_drivers`
  ADD PRIMARY KEY (`vechile_driver_id`);

--
-- Indexes for table `vehicle_groups`
--
ALTER TABLE `vehicle_groups`
  ADD PRIMARY KEY (`vechile_type_id`);

--
-- Indexes for table `vehicle_rto_details`
--
ALTER TABLE `vehicle_rto_details`
  ADD PRIMARY KEY (`vechile_rto_detail_id`);

--
-- Indexes for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`vechile_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `vechile_type_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
