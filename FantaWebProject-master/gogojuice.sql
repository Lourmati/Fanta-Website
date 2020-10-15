-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 25, 2020 at 04:35 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gogojuice`
--

-- --------------------------------------------------------

--
-- Table structure for table `boisson`
--

DROP TABLE IF EXISTS `boisson`;
CREATE TABLE IF NOT EXISTS `boisson` (
  `IdBoisson` int(11) NOT NULL AUTO_INCREMENT,
  `NomBoisson` varchar(50) NOT NULL,
  `Saveur` varchar(50) NOT NULL,
  `PaysOrigine` varchar(50) NOT NULL,
  `NombreCommandes` int(11) DEFAULT NULL,
  `NombreAchetes` int(11) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `ImageBoisson` varchar(255) DEFAULT NULL,
  `Prix` varchar(50) DEFAULT NULL,
  `ImageValeurNutritive` varchar(255) DEFAULT NULL,
  `Distributeur_idDistributeur` int(11) NOT NULL,
  PRIMARY KEY (`IdBoisson`),
  KEY `Boisson_fk0` (`Distributeur_idDistributeur`)
) ENGINE=InnoDB AUTO_INCREMENT=20012 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `boisson`
--

INSERT INTO `boisson` (`IdBoisson`, `NomBoisson`, `Saveur`, `PaysOrigine`, `NombreCommandes`, `NombreAchetes`, `Description`, `ImageBoisson`, `Prix`, `ImageValeurNutritive`, `Distributeur_idDistributeur`) VALUES
(20000, 'Fanta', 'Orange', 'Morocco', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, SODIUM BENZOATE (TO PROTECT TASTE), NATURAL FLAVORS, MODIFIED FOOD STARCH, SODIUM POLYPHOSPHATES, GLYCEROL ESTER OF ROSIN, YELLOW 6, RED 40.', '../assets/images/fanta-orange-12-oz-can.png', '2.19$', '../assets/images/Fanta_Orange_NF.PNG', 10001),
(20001, 'Fanta', 'Grape', 'Spain', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, NATURAL FLAVORS, TARTARIC ACID, POTASSIUM SORBATE AND SODIUM BENZOATE (TO PROTECT TASTE), CITRIC ACID, RED 40, BLUE 1.', '../assets/images/fanta-grape-12-oz-can.png', '2.39$', '../assets/images/Fanta_Grape_NF.PNG', 10000),
(20002, 'Coca-cola', 'Original', 'USA', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CARAMEL COLOR, PHOSPHORIC ACID, NATURAL FLAVORS, CAFFEINE.', '../assets/images/coca-cola-original-12-oz-can.png', '1.99$', '../assets/images/coca-cola_original_NF.PNG', 10002),
(20003, 'Sprite', 'Lemon-lime Original', 'USA', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, NATURAL FLAVORS, SODIUM CITRATE, SODIUM BENZOATE (TO PROTECT TASTE).', '../assets/images/sprite-original-12-oz-can.png', '1.99$', '../assets/images/Sprite_Lemon_Lime_NF.PNG', 10001),
(20004, 'Fanta', 'Grapefruit', 'China', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, CONCENTRATED GRAPEFRUIT JUICE, SODIUM CITRATE, POTASSIUM SORBATE (TO PROTECT TASTE), ACACIA GUM, NATURAL FLAVORS, SODIUM BENZOATE (TO PROTECT TASTE), SUCROSE ACETATE ISOBUTYRATE,CALCIUM DISODIUM EDT', '../assets/images/fanta-grapefruit-12-oz-can.png', '2.69$', '../assets/images/Fanta_Grapefruit_NF.PNG', 10000),
(20005, 'Fanta', 'Strawberry', 'Turkey', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, NATURAL FLAVORS, CITRIC ACID, SODIUM BENZOATE (TO PROTECT TASTE), RED 40.', '../assets/images/fanta-strawberry-12-oz-can.png', '2.49$', '../assets/images/Fanta_Stawberry_NF.PNG', 10000),
(20006, 'Fanta', 'Green Apple', 'Poland', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, NATURAL FLAVORS, CITRIC ACID, MALIC ACID, CARAMEL COLOR, SODIUM CITRATE, SODIUM BENZOATE AND POTASSIUM SORBATE(TO PROTECT TASTE).', '../assets/images/fanta-green-apple-12-oz-can.png', '2.54$', '../assets/images/Fanta_Green_apple_NF.PNG', 10000),
(20007, 'Fanta', 'Pineapple', 'Costa Rica', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, NATURAL FLAVORS, MODIFIED FOOD STARCH, POTASSIUM SORBATE AND SODIUM BENZOATE (TO PROTECT TASTE), SODIUM CITRATE, MEDIUM CHAIN TRIGLYCERIDES, SALT, SUCROSE ACETATE ISOBUTYRATE, YELLOW 5, YELLOW 6.', '../assets/images/fanta-pineapple-12-oz-can.png', '2.59$', '../assets/images/Fanta_Pineapple_NF.PNG', 10000),
(20008, 'Fanta', 'Berry', 'France', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, NATURAL FLAVORS, CITRIC ACID, SODIUM CITRATE, MALIC ACID, POTASSIUM SORBATE AND SODIUM BENZOATE (TO PROTECT TASTE), BLUE 1.', '../assets/images/fanta-berry-12-oz-can.png', '2.39$', '../assets/images/Fanta_Beery_NF.PNG', 10000),
(20009, 'Fanta', 'Mango', 'Indonesia', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, NATURAL FLAVORS, CITRIC ACID, POTASSIUM SORBATE (TO PROTECT TASTE), MALIC ACID, ACACIA GUM, SODIUM BENZOATE (TO PROTECT TASTE), YELLOW 6.', '../assets/images/fanta-mango-12-oz-can.png', '2.59$', '../assets/images/Fanta_Mango_NF.PNG', 10000),
(20010, 'Fanta', 'FruitPunch', 'Caribbean', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, NATURAL FLAVORS, POTASSIUM SORBATE AND SODIUM BENZOATE (TO PROTECT TASTE), ACACIA GUM, RED 40.', '../assets/images/fanta-pineapple-12-oz-can.png', '2.39$', '../assets/images/Fanta_Fruit_Punch_NF.PNG', 10000),
(20011, 'Fanta', 'Peach', 'Korea', NULL, NULL, 'CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, NATURAL FLAVORS, CITRIC ACID, SODIUM BENZOATE (TO PROTECT TASTE), YELLOW 6, RED 40.', '../assets/images/fanta-peach-12-oz-can.png', '2.29$', '../assets/images/Fanta_Peach_NF.PNG', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `boissoncommande`
--

DROP TABLE IF EXISTS `boissoncommande`;
CREATE TABLE IF NOT EXISTS `boissoncommande` (
  `Id_BoissonCommande` int(11) NOT NULL AUTO_INCREMENT,
  `Boisson_idBoisson` int(11) NOT NULL,
  `Commande_idCommande` int(11) NOT NULL,
  PRIMARY KEY (`Id_BoissonCommande`),
  KEY `BoissonCommande_fk0` (`Boisson_idBoisson`) USING BTREE,
  KEY `BoissonCommande_fk1` (`Commande_idCommande`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `IdClient` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Adresse` varchar(50) DEFAULT NULL,
  `CodePostal` varchar(50) DEFAULT NULL,
  `Ville` varchar(50) DEFAULT NULL,
  `Province` varchar(10) DEFAULT NULL,
  `Pays` varchar(50) DEFAULT NULL,
  `NumeroCommandes` varchar(50) DEFAULT NULL,
  `Paiement_IdPaiement` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdClient`),
  KEY `Client_fk0` (`NumeroCommandes`),
  KEY `Client_fk1` (`Paiement_IdPaiement`)
) ENGINE=InnoDB AUTO_INCREMENT=30006 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`IdClient`, `Nom`, `Prenom`, `Telephone`, `Adresse`, `CodePostal`, `Ville`, `Province`, `Pays`, `NumeroCommandes`, `Paiement_IdPaiement`) VALUES
(30000, 'de la Barrière', 'Guillaume', '514-956-5842', '27 Avenue Canora', 'H4P 2A4', 'Montreal', 'QC', 'Canada', NULL, NULL),
(30001, 'Phalakhone', 'Nick', '514-643-6135', '657 Ouimet St', 'H4L 3P2', 'Montreal', 'QC', 'Canada', NULL, NULL),
(30003, 'Cadieux', 'Olivier', '514-676-8653', '129-199 Boulevard du Bon-Pasteur', 'H7N 3R4', 'Laval', 'QC', 'Canada', NULL, NULL),
(30004, 'Shintani', 'Motoki', '514-456-7834', '11848-11800 Rue Pasteur', 'H3M 2P7', 'Montreal', 'QC', 'Canada', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `IdCommande` int(11) NOT NULL AUTO_INCREMENT,
  `InfoLivraison` varchar(3000) NOT NULL,
  `InfoClient` varchar(3000) NOT NULL,
  `NombreBoisson` int(11) NOT NULL,
  `PrixFinal` double NOT NULL,
  `Etat` varchar(50) NOT NULL,
  PRIMARY KEY (`IdCommande`)
) ENGINE=InnoDB AUTO_INCREMENT=50008 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commande`
--

INSERT INTO `commande` (`IdCommande`, `InfoLivraison`, `InfoClient`, `NombreBoisson`, `PrixFinal`, `Etat`) VALUES
(50000, '1234 ave. asd, MTL, QC, H4X 3T5', 'Nick, test@gmail.com', 4, 9.16, 'En cours');

-- --------------------------------------------------------

--
-- Table structure for table `distributeur`
--

DROP TABLE IF EXISTS `distributeur`;
CREATE TABLE IF NOT EXISTS `distributeur` (
  `IdDistributeur` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `DateReception` date DEFAULT NULL,
  `DateDistribution` date DEFAULT NULL,
  `QuantiteDistribuee` int(11) NOT NULL,
  PRIMARY KEY (`IdDistributeur`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `distributeur`
--

INSERT INTO `distributeur` (`IdDistributeur`, `Nom`, `DateReception`, `DateDistribution`, `QuantiteDistribuee`) VALUES
(10000, 'Couchetard', NULL, NULL, 0),
(10001, 'Metro', NULL, NULL, 0),
(10002, 'Pharmaprix', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `modepaiement`
--

DROP TABLE IF EXISTS `modepaiement`;
CREATE TABLE IF NOT EXISTS `modepaiement` (
  `IdPaiement` int(11) NOT NULL AUTO_INCREMENT,
  `ModePaiement` varchar(11) NOT NULL,
  PRIMARY KEY (`IdPaiement`)
) ENGINE=InnoDB AUTO_INCREMENT=60003 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modepaiement`
--

INSERT INTO `modepaiement` (`IdPaiement`, `ModePaiement`) VALUES
(60000, 'Paypal'),
(60001, 'Credit');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `IdUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `resetPasswordToken` varchar(100) DEFAULT NULL,
  `resetPasswordExpire` datetime DEFAULT NULL,
  `Client_IdClient` int(11) NOT NULL,
  PRIMARY KEY (`IdUtilisateur`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Utilisateur_fk0` (`Client_IdClient`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`IdUtilisateur`, `Email`, `Password`, `resetPasswordToken`, `resetPasswordExpire`, `Client_IdClient`) VALUES
(29, 'gui.dlb.37@gmail.com', '$2b$10$qYY/JvPv0hE0E8elhZ6kxOVKHwpMApTnypjPU2wABkk6V8f9m0Z8G', NULL, NULL, 30000);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
