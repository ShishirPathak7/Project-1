-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 09:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicare`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_list`
--

CREATE TABLE `chat_list` (
  `id` int(11) NOT NULL,
  `to_id` int(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `from_id` int(255) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `chat_list`
--

INSERT INTO `chat_list` (`id`, `to_id`, `message`, `from_id`, `datetime`) VALUES
(354, 1, 'Hi', 6, '2024-04-15 01:22:42'),
(355, 2, 'I am fine', 6, '2024-04-15 01:22:55'),
(356, 1, 'Can you see my message?', 6, '2024-04-15 01:23:09'),
(357, 6, 'Great', 2, '2024-04-15 01:27:14'),
(358, 6, 'whatsup', 2, '2024-04-15 01:38:59'),
(359, 2, 'great', 6, '2024-04-15 01:39:24'),
(360, 6, 'ki', 2, '2024-04-15 01:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `patient_billing`
--

CREATE TABLE `patient_billing` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_billing`
--

INSERT INTO `patient_billing` (`id`, `name`, `amount`, `date`, `purpose`, `email`, `patient_id`) VALUES
(6, 'Shishir Pathak', 50.00, '2025-05-28', 'GP Visit', NULL, NULL),
(7, 'Shishir Pathak', 170.00, '2025-05-28', 'Blood Test', NULL, NULL),
(8, 'Shishir Pathak', 200.00, '2025-05-30', 'xray', NULL, NULL),
(9, 'Kushal gautam', 50.00, '2025-05-30', 'GP visit', NULL, NULL),
(10, 'Kushal gautam', 122.00, '2025-05-30', 'us on stomach', NULL, NULL),
(11, 'User1', 50.00, '2025-05-30', 'Gp Visit', NULL, NULL),
(12, 'User1', 150.00, '2025-05-30', 'xray', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy_billing`
--

CREATE TABLE `pharmacy_billing` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pharmacy_billing`
--

INSERT INTO `pharmacy_billing` (`id`, `name`, `amount`, `date`, `patient_id`) VALUES
(1, 'Pharmacy A', 100.00, '2025-04-30', 1),
(2, 'Pharmacy B', 250.50, '2025-04-29', 2),
(3, 'Pharmacy C', 75.25, '2025-04-28', 3),
(4, 'Pharmacy D', 180.00, '2025-04-27', 4),
(5, 'Pharmacy E', 320.75, '2025-04-26', 5);

-- --------------------------------------------------------

--
-- Table structure for table `tblappointments`
--

CREATE TABLE `tblappointments` (
  `AppointmentID` int(10) NOT NULL,
  `PatientID` int(10) DEFAULT NULL,
  `DoctorName` varchar(255) DEFAULT NULL,
  `AppointmentDate` date DEFAULT NULL,
  `TimeSlot` varchar(50) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Status` enum('Scheduled','Cancelled','Completed') DEFAULT 'Scheduled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblappointments`
--

INSERT INTO `tblappointments` (`AppointmentID`, `PatientID`, `DoctorName`, `AppointmentDate`, `TimeSlot`, `Description`, `Status`) VALUES
(7, 1, 'Dr. Rachel Patel', '2024-04-13', '09:00 AM', 'This will automatically update past appointments.', 'Completed'),
(8, 77, 'Dr. Rachel Patel', '2025-06-01', '11:00 AM', 'sss', 'Completed'),
(9, 77, 'Dr. Rachel Patel', '2025-05-09', '09:00 AM', 'zzz', 'Completed'),
(10, 77, 'Dr. Rachel Patel', '2025-05-28', '10:00 AM', 'fff', 'Completed'),
(11, 77, 'Dr. Rachel Patel', '2025-05-28', '11:15 AM', 'I got a headache.', 'Completed'),
(12, 1, 'Dr. Fatima Khan', '2025-05-30', '11:30 AM', 'common cold', 'Completed'),
(13, 77, 'Dr. Fatima Khan', '2025-05-30', '11:15 AM', 'Leg Pain', 'Completed'),
(14, 77, 'Dr. Fatima Khan', '2025-05-30', '10:15 AM', 'I got eye problem.', 'Completed'),
(15, 19, 'Dr. Fatima Khan', '2025-05-30', '10:15 AM', 'kidney stone', 'Completed'),
(16, 11, 'Dr. Andrej Petrov', '2025-06-02', '10:30 AM', 'I got a headache.', 'Scheduled'),
(17, 11, 'Dr. Javier Hernandez', '2025-06-03', '11:30 AM', 'I got a headache.', 'Scheduled');

-- --------------------------------------------------------

--
-- Table structure for table `tblblogs`
--

CREATE TABLE `tblblogs` (
  `BlogID` int(10) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `UserID` int(10) NOT NULL,
  `CreationDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblblogs`
--

INSERT INTO `tblblogs` (`BlogID`, `Title`, `Content`, `UserID`, `CreationDate`) VALUES
(1, 'First Blog', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lectus vel nisi tristique, sed cursus odio bibendum. Phasellus id quam sit amet purus dignissim suscipit.', 1, '2024-04-13 18:36:03'),
(2, 'Second Blog', 'Nullam auctor, velit nec maximus aliquam, mauris purus dictum dui, vel egestas libero urna eget orci. Phasellus vel hendrerit lorem, sed sodales mi. Vestibulum finibus ex vel quam egestas, id cursus odio vehicula.', 2, '2024-04-13 18:36:03'),
(3, 'Third Blog', 'Integer malesuada risus sed ligula lacinia, vel tristique nisl suscipit. Integer luctus eget lacus ac fringilla. Donec at malesuada quam, at tempus ipsum.', 3, '2024-04-13 18:36:03'),
(4, 'Fourth Blog', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus accumsan pharetra tellus sit amet tristique. Sed lacinia tellus eu bibendum cursus.', 4, '2024-04-13 18:36:03'),
(10, 'This is my first blog I need Help', 'uihvodhvhdvcxn ,xz', 6, '2024-04-14 19:51:47');

-- --------------------------------------------------------

--
-- Table structure for table `tblcomments`
--

CREATE TABLE `tblcomments` (
  `CommentID` int(10) NOT NULL,
  `BlogID` int(10) NOT NULL,
  `UserID` int(10) NOT NULL,
  `Comment` text NOT NULL,
  `CommentDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblcomments`
--

INSERT INTO `tblcomments` (`CommentID`, `BlogID`, `UserID`, `Comment`, `CommentDate`) VALUES
(4, 1, 2, 'Hello', '2024-04-14 08:32:33'),
(5, 1, 3, 'My Comment', '2024-04-14 08:32:58'),
(6, 1, 3, 'My Comment 3', '2024-04-14 08:33:05'),
(10, 1, 1, 'Jsndndnndndjdjdjdjdjjddjdjxjxjjdjdjdjdjfjdjdjdjdudjjdjdudjdududjjdjdjdjdududududjdjdjdxudjjdjfbfbdbebdhdhdndnhdudjejdudhehdhd', '2024-04-15 08:42:47');

-- --------------------------------------------------------

--
-- Table structure for table `tblfacilities`
--

CREATE TABLE `tblfacilities` (
  `FacilityID` int(11) NOT NULL,
  `ICU_Beds` int(11) DEFAULT 0,
  `Normal_Rooms` int(11) DEFAULT 0,
  `Ambulances` int(11) DEFAULT 0,
  `XRay_Rooms` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO `tblfacilities` (`FacilityID`, `ICU_Beds`, `Normal_Rooms`, `Ambulances`, `XRay_Rooms`) VALUES
(6, 15, 100, 32, 50);

-- --------------------------------------------------------

--
-- Table structure for table `tblpersonalrecords`
--

CREATE TABLE `tblpersonalrecords` (
  `UserID` int(10) NOT NULL,
  `BP` varchar(3) DEFAULT NULL,
  `Diabetes` varchar(3) DEFAULT NULL,
  `HeartHealthIssues` varchar(3) DEFAULT NULL,
  `Arthritis` varchar(3) DEFAULT NULL,
  `Allergies` text DEFAULT NULL,
  `OtherIssues` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblpersonalrecords`
--

INSERT INTO `tblpersonalrecords` (`UserID`, `BP`, `Diabetes`, `HeartHealthIssues`, `Arthritis`, `Allergies`, `OtherIssues`) VALUES
(1, '', 'Yes', 'Yes', '', 'Nut', 'Sleepiness');

-- --------------------------------------------------------

--
-- Table structure for table `tblprescriptions`
--

CREATE TABLE `tblprescriptions` (
  `prescription_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `medicines` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `prescribedBy` varchar(255) NOT NULL,
  `pharmacist` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblprescriptions`
--

INSERT INTO `tblprescriptions` (`prescription_id`, `name`, `medicines`, `prescribedBy`, `pharmacist`, `user_id`) VALUES
(1, 'Prescription 1', '[\"Medicine A\", \"Medicine B\", \"Medicine C\"]', 'Dr. John Doe', 'Mr. Smith', 1),
(2, 'Prescription 2', '[\"Medicine X\", \"Medicine Y\"]', 'Dr. Jane Smith', 'Mr. Johnson', 1),
(3, 'Prescription 3', '[\"Medicine P\", \"Medicine Q\", \"Medicine R\", \"Medicine S\"]', 'Dr. Alice Johnson', 'Mr. Brown', 2),
(4, 'Prescription 4', '[\"Medicine T\"]', 'Dr. Emily White', 'Mr. Wilson', 2),
(5, 'Prescription 5', '[\"Medicine U\", \"Medicine V\", \"Medicine W\"]', 'Dr. David Black', 'Mr. Taylor', 3),
(6, 'Common Cold', '[\"New\",\"New 2\"]', 'Dr shah', 'PharmacistOne Main', 1),
(7, 'Common Cold', '[\"Paracetaom\",\"JOdj\",\"csjcj\"]', 'Dr shah', 'PharmacistOne Main', 1),
(14, 'Have warm water', '[\"Paracetamol\"]', 'nanns', 'PharmacistOne Main', 77),
(15, 'for headache', '[\"paracetamol\"]', 'tsyei', 'PharmacistOne Main', 77),
(16, 'Bp control', '[\"paracetamol\"]', 'Dr. X', 'PharmacistOne Main', 77),
(17, 'Flu Medication', '[\"\"]', 'dr. naveen', 'PharmacistOne Main', 8),
(18, 'Diet for Kidney stone', '[\"Have some more water\"]', 'Dr. Fatima Khan', 'PharmacistOne Main', 19),
(19, 'Headache', '[\"Paracetamol\",\"warm water\"]', 'Dr. Sandeep', 'PharmacistOne Main', 11);

-- --------------------------------------------------------

--
-- Table structure for table `tblreminders`
--

CREATE TABLE `tblreminders` (
  `reminderID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `reminderName` text DEFAULT NULL,
  `reminderTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblreminders`
--

INSERT INTO `tblreminders` (`reminderID`, `userID`, `reminderName`, `reminderTime`) VALUES
(8, 2, 'kg', '08:34:00'),
(18, 6, 'Paracetamol', '01:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `ID` int(10) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `ContactNumber` bigint(10) DEFAULT NULL,
  `Password` varchar(200) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `UserType` varchar(255) DEFAULT NULL,
  `code` mediumint(50) NOT NULL,
  `status` text NOT NULL,
  `mfa_timestamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`ID`, `FirstName`, `Email`, `ContactNumber`, `Password`, `LastName`, `UserType`, `code`, `status`, `mfa_timestamp`) VALUES
(1, 'Sample', 'patient@gmail.com', 8320930119, '12345678', 'One', 'Patient', 0, 'verified', NULL),
(2, 'Admin', 'admin@gmail.com', 8320930118, '12345678', 'Shah', 'Admin', 0, 'verified', NULL),
(3, 'HealthAdminOne', 'healthadmin@gmail.com', 8320930113, '12345678', 'One', 'HealthAdminstrator', 0, 'verified', NULL),
(4, 'PharmacistOne', 'pharmacist@gmail.com', 8320930128, '12345678', 'Main', 'Pharmacist', 0, 'verified', NULL),
(6, 'Provider', 'healthcare@mail.com', 8320930110, '12345678', 'Healthcare', 'HealthcareProvider', 0, 'verified', NULL),
(7, 'Provider 1', 'john@example.com', 1234567890, 'password123', 'Doe', 'HealthcareProvider', 0, 'verified', NULL),
(8, 'Vatsal', 'vatsalcshah@gmail.com', 8320930118, '12345678', 'Shah', 'Patient', 0, 'verified', NULL),
(11, 'user1', 'user1@gmail.com', 0, '12345678', 'IIBIT', 'Patient', 0, 'verified', NULL),
(17, 'P1', 'sample1@gmail.com', 0, '12345678', 'Sample', 'Patient', 0, 'verified', NULL),
(19, 'Kushal ', 'gautamkushal34@gmail.com', 1111111111, '12345678', 'Gautam', 'Patient', 0, 'verified', NULL),
(77, 'Shishir', 'pathakshishir17@gmail.com', 402897861, '12345678', 'Pathak', 'Patient', 0, 'verified', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_list`
--
ALTER TABLE `chat_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_billing`
--
ALTER TABLE `patient_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pharmacy_billing`
--
ALTER TABLE `pharmacy_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblappointments`
--
ALTER TABLE `tblappointments`
  ADD PRIMARY KEY (`AppointmentID`),
  ADD KEY `FK_PatientID` (`PatientID`);

--
-- Indexes for table `tblblogs`
--
ALTER TABLE `tblblogs`
  ADD PRIMARY KEY (`BlogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `tblcomments`
--
ALTER TABLE `tblcomments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `BlogID` (`BlogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `tblfacilities`
--
ALTER TABLE `tblfacilities`
  ADD PRIMARY KEY (`FacilityID`);

--
-- Indexes for table `tblpersonalrecords`
--
ALTER TABLE `tblpersonalrecords`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `tblprescriptions`
--
ALTER TABLE `tblprescriptions`
  ADD PRIMARY KEY (`prescription_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tblreminders`
--
ALTER TABLE `tblreminders`
  ADD PRIMARY KEY (`reminderID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `idx_tblusers_code` (`code`),
  ADD KEY `idx_tblusers_email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_list`
--
ALTER TABLE `chat_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;

--
-- AUTO_INCREMENT for table `patient_billing`
--
ALTER TABLE `patient_billing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pharmacy_billing`
--
ALTER TABLE `pharmacy_billing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblappointments`
--
ALTER TABLE `tblappointments`
  MODIFY `AppointmentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tblblogs`
--
ALTER TABLE `tblblogs`
  MODIFY `BlogID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblcomments`
--
ALTER TABLE `tblcomments`
  MODIFY `CommentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblfacilities`
--
ALTER TABLE `tblfacilities`
  MODIFY `FacilityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblprescriptions`
--
ALTER TABLE `tblprescriptions`
  MODIFY `prescription_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tblreminders`
--
ALTER TABLE `tblreminders`
  MODIFY `reminderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=774;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblappointments`
--
ALTER TABLE `tblappointments`
  ADD CONSTRAINT `FK_PatientID` FOREIGN KEY (`PatientID`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblblogs`
--
ALTER TABLE `tblblogs`
  ADD CONSTRAINT `tblBlogs_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblcomments`
--
ALTER TABLE `tblcomments`
  ADD CONSTRAINT `tblComments_ibfk_1` FOREIGN KEY (`BlogID`) REFERENCES `tblblogs` (`BlogID`),
  ADD CONSTRAINT `tblComments_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblpersonalrecords`
--
ALTER TABLE `tblpersonalrecords`
  ADD CONSTRAINT `tblpersonalrecords_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblprescriptions`
--
ALTER TABLE `tblprescriptions`
  ADD CONSTRAINT `tblPrescriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tblusers` (`ID`);

--
-- Constraints for table `tblreminders`
--
ALTER TABLE `tblreminders`
  ADD CONSTRAINT `tblreminders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblusers` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
