-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2022 a las 01:41:31
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interbusv6`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asiento`
--

CREATE TABLE `asiento` (
  `id` int(11) NOT NULL,
  `estado` varchar(40) DEFAULT NULL,
  `num_asiento` int(11) DEFAULT NULL,
  `bus_id` int(11) DEFAULT NULL,
  `reserva_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus`
--

CREATE TABLE `bus` (
  `id` int(11) NOT NULL,
  `num_bus` int(11) DEFAULT NULL,
  `placa` varchar(100) DEFAULT NULL,
  `tipo_bus` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bus`
--

INSERT INTO `bus` (`id`, `num_bus`, `placa`, `tipo_bus`) VALUES
(24, 9686, 'EYHEHD', 'ostin'),
(26, 9999, 'EEEEEEEO', 'mercury'),
(27, 5467574, 'AAAEEEEUUUO', 'edit :v'),
(28, 8970, 'ctucu', 'grande'),
(29, 8888, 'UUDTHD', 'god nuevo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacion`
--

CREATE TABLE `programacion` (
  `id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `ruta_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacion_bus`
--

CREATE TABLE `programacion_bus` (
  `id` int(11) NOT NULL,
  `programacion_id` int(100) DEFAULT NULL,
  `bus_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva_ticket`
--

CREATE TABLE `reserva_ticket` (
  `id` int(11) NOT NULL,
  `valor_uni` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `programacion_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `id` int(11) NOT NULL,
  `lugares` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`id`, `lugares`) VALUES
(2, 'popayan-santander'),
(3, 'Popayan-Cajibío'),
(4, 'El tambo-La Sierra'),
(6, 'Morales-Piendamo'),
(7, 'Rosas-Soatá'),
(8, 'Timbío-Almaguer'),
(9, 'Argelia-Balboa'),
(10, 'Bolívar-Florencia'),
(11, 'La vega-Mercaderes'),
(12, 'Patía-Piamonte'),
(13, 'San Sebastián-Santa Rosa'),
(14, 'god-zzz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `apellido` varchar(40) DEFAULT NULL,
  `tipo_doc` varchar(40) DEFAULT NULL,
  `num_doc` int(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `clave` varchar(40) DEFAULT NULL,
  `rol` varchar(40) DEFAULT 'pasajero'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `tipo_doc`, `num_doc`, `email`, `clave`, `rol`) VALUES
(1, 'juan', 'diaz', 'cc', 2147483647, 'example@gmail.com', 'contraseña123', 'despachador'),
(2, 'ez', 'drgrg', 'cc', 356363636, 'ez@gmail.com', 'ezgod', 'despachador'),
(3, 'god', 'esgesg', 'cc', 54646353, 'aaaaaaa@gmail.com', 'aeaci', 'despachador'),
(4, 'camilo', 'sas', 'cc', 2147483647, 'camilo@gmail.com', 'cuniasftd', 'pasajero'),
(5, 'conduc', 'thor', 'cc', 2147483647, 'conductor@gmail.com', 'cond', 'conductor'),
(6, 'juan', 'caballo', 'cc', 2147483647, 'despsiuu@gmail.com', 'despgod', 'despachador'),
(7, 'rodrigo', 'jefe', 'cc', 2147483647, 'jefeR@gmail.com', 'bossgod', 'jefe de rodamiento'),
(8, 'prueba', 'ci', 'cc', 464745454, 'pru@gmail.com', 'pruebaci', 'pasajero'),
(14, 'edit', 'editado', 'cc', 2147483647, 'exampleEdit@gmail.com', 'editpass', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usu_bus`
--

CREATE TABLE `usu_bus` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `bus_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usu_bus`
--

INSERT INTO `usu_bus` (`id`, `usuario_id`, `bus_id`) VALUES
(3, 5, 24),
(6, 6, 26);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asiento`
--
ALTER TABLE `asiento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bus_id` (`bus_id`),
  ADD UNIQUE KEY `reserva_id` (`reserva_id`);

--
-- Indices de la tabla `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `programacion`
--
ALTER TABLE `programacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`),
  ADD UNIQUE KEY `ruta_id` (`ruta_id`);

--
-- Indices de la tabla `programacion_bus`
--
ALTER TABLE `programacion_bus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `programacion_id` (`programacion_id`),
  ADD UNIQUE KEY `bus_id` (`bus_id`);

--
-- Indices de la tabla `reserva_ticket`
--
ALTER TABLE `reserva_ticket`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `programacion_id` (`programacion_id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usu_bus`
--
ALTER TABLE `usu_bus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`),
  ADD UNIQUE KEY `bus_id` (`bus_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asiento`
--
ALTER TABLE `asiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `bus`
--
ALTER TABLE `bus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `programacion`
--
ALTER TABLE `programacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `programacion_bus`
--
ALTER TABLE `programacion_bus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reserva_ticket`
--
ALTER TABLE `reserva_ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usu_bus`
--
ALTER TABLE `usu_bus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asiento`
--
ALTER TABLE `asiento`
  ADD CONSTRAINT `asiento_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asiento_ibfk_2` FOREIGN KEY (`reserva_id`) REFERENCES `reserva_ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `programacion`
--
ALTER TABLE `programacion`
  ADD CONSTRAINT `programacion_ibfk_1` FOREIGN KEY (`ruta_id`) REFERENCES `ruta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `programacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `programacion_bus`
--
ALTER TABLE `programacion_bus`
  ADD CONSTRAINT `programacion_bus_ibfk_1` FOREIGN KEY (`programacion_id`) REFERENCES `programacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `programacion_bus_ibfk_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva_ticket`
--
ALTER TABLE `reserva_ticket`
  ADD CONSTRAINT `reserva_ticket_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ticket_ibfk_2` FOREIGN KEY (`programacion_id`) REFERENCES `programacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usu_bus`
--
ALTER TABLE `usu_bus`
  ADD CONSTRAINT `usu_bus_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usu_bus_ibfk_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
