-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 30, 2023 at 04:02 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SEGUROS`
--
CREATE DATABASE IF NOT EXISTS `SEGUROS` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `SEGUROS`;

-- --------------------------------------------------------

--
-- Table structure for table `CUSTOMERS`
--

CREATE TABLE IF NOT EXISTS `CUSTOMERS` (
  `CUSTOMER_ID` int NOT NULL AUTO_INCREMENT,
  `CUSTOMER_NAME` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `CUSTOMER_ADDRESS` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `CUSTOMER_BIRTHDATE` date NOT NULL,
  `CUSTOMER_TLF` int NOT NULL,
  `CUSTOMER_CS` varchar(20) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CUSTOMER_GENDER` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`CUSTOMER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `CUSTOMERS`
--

INSERT INTO `CUSTOMERS` (`CUSTOMER_ID`, `CUSTOMER_NAME`, `CUSTOMER_ADDRESS`, `CUSTOMER_BIRTHDATE`, `CUSTOMER_TLF`, `CUSTOMER_CS`, `CUSTOMER_GENDER`) VALUES
(1, 'Mario Moreno', 'c/ VillaMagia 4D', '2003-12-10', 111111111, 'Soltero', 'Masculino'),
(2, 'Mario Cañas', 'c/ Alimentación Luna', '1997-12-23', 1111111112, 'Soltero', 'Masculino'),
(3, 'Javier Villaverde', 'av. toperdio 6A', '2002-02-13', 222222222, 'Casado', 'Masculino'),
(4, 'Rosa Vargas', 'Nuke Town 3B', '1942-01-16', 222222223, 'Soltera', 'Femenino'),
(5, 'Javier Martinez', 'Café París', '2004-08-18', 333333333, 'Casado', 'Masculino'),
(6, 'Laura P.', 'Miami', '2005-03-05', 333333334, 'Casada', 'Femenino'),
(7, 'Marcos P Baena', 'c/ Gomera sin número', '1985-08-12', 444444444, NULL, NULL),
(8, 'Gonzalo Ramírez', 'Ciudad Canal', '2004-02-05', 444444445, 'Casado', 'Masculino'),
(11, 'Lorima', 'Islas fidji 45', '2018-06-07', 123321445, 'Divorciada', 'Femenina');

-- --------------------------------------------------------

--
-- Table structure for table `INSURANCE_BUDGETS`
--

CREATE TABLE IF NOT EXISTS `INSURANCE_BUDGETS` (
  `BUDGET_ID` int NOT NULL AUTO_INCREMENT,
  `BUDGET_NAME` enum('Presupuesto de Salud','Presupuesto de Automóvil','Presupuesto de Hogar','Presupuesto de Vida') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `BUDGET_DATE` date NOT NULL,
  `BUDGET_COVERAGE` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `CUSTOMER_ID` int NOT NULL,
  `BUDGET_PRIME` float NOT NULL,
  `BUDGET_STATUS` enum('Aprobado','Pendiente','Rechazado') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`BUDGET_ID`),
  KEY `FK_CUSTOMER_ID` (`CUSTOMER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `INSURANCE_BUDGETS`
--

INSERT INTO `INSURANCE_BUDGETS` (`BUDGET_ID`, `BUDGET_NAME`, `BUDGET_DATE`, `BUDGET_COVERAGE`, `CUSTOMER_ID`, `BUDGET_PRIME`, `BUDGET_STATUS`) VALUES
(1, 'Presupuesto de Automóvil', '2023-01-15', 'Cobertura Total', 1, 499.99, 'Aprobado'),
(2, 'Presupuesto de Vida', '2023-02-20', 'Cobertura Básica', 6, 314.34, 'Aprobado'),
(3, 'Presupuesto de Salud', '2023-04-15', 'Cobertura Médica', 3, 699.99, 'Rechazado'),
(4, 'Presupuesto de Vida', '2023-04-05', 'Cobertura Beneficiarios', 4, 599.99, 'Aprobado'),
(5, 'Presupuesto de Automóvil', '2023-04-25', 'Cobertura Básica', 5, 399.99, 'Pendiente'),
(6, 'Presupuesto de Hogar', '2022-03-22', 'Cobertura Completa', 6, 449.99, 'Aprobado'),
(7, 'Presupuesto de Salud', '2023-12-21', 'Cobertura Dental', 7, 749.99, 'Pendiente'),
(8, 'Presupuesto de Automóvil', '2023-08-22', 'Cobertura Total', 8, 479.99, 'Aprobado');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `INSURANCE_BUDGETS`
--
ALTER TABLE `INSURANCE_BUDGETS`
  ADD CONSTRAINT `FK_CUSTOMER_ID` FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMERS` (`CUSTOMER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
