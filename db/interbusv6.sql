-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-06-2022 a las 06:38:20
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `asientoAddOrEdit` (IN `_id` INT, IN `_estado` VARCHAR(40), IN `_num_asiento` INT(11), IN `_bus_id` INT(11), IN `_reserva_id` INT(11))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO asiento (estado, num_asiento, bus_id, reserva_id)
    VALUES (_estado, _num_asiento, _bus_id, _reserva_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE asiento
    SET
    estado = _estado,
    num_asiento = _num_asiento,
    bus_id = _bus_id,
    reserva_id = _reserva_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busAddOrEdit` (IN `_id` INT, IN `_num_bus` INT(11), IN `_placa` VARCHAR(100), IN `_tipo_bus` VARCHAR(100))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO bus (num_bus, placa, tipo_bus)
    VALUES (_num_bus, _placa, _tipo_bus);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE bus
    SET
    num_bus = _num_bus,
    placa = _placa,
    tipo_bus = _tipo_bus
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `programacionAddOrEdit` (IN `_id` INT, IN `_fecha` DATE, IN `_hora` TIME, IN `_usuario_id` INT(11), IN `_ruta_id` INT(11))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO programacion (fecha, hora, usuario_id, ruta_id)
    VALUES (_fecha, _hora, _usuario_id, _ruta_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE programacion
    SET
    fecha = _fecha,
    hora = _hora,
    usuario_id = _usuario_id,
    ruta_id = _ruta_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `programacion_busAddOrEdit` (IN `_id` INT, IN `_programacion_id` INT(11), IN `_bus_id` INT(11))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO programacion_bus (programacion_id, bus_id)
    VALUES (_programacion_id, _bus_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE programacion_bus
    SET
    programacion_id = _programacion_id,
    bus_id = _bus_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `reserva_ticketAddOrEdit` (IN `_id` INT, IN `_valor_uni` DOUBLE, IN `_total` DOUBLE, IN `_programacion_id` INT(11), IN `_usuario_id` INT(11))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO reserva_ticket (valor_uni, total, programacion_id, usuario_id)
    VALUES (_valor_uni, _total, _programacion_id, _usuario_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE reserva_ticket
    SET
    valor_uni = _valor_uni,
    total = _total,
    programacion_id = _programacion_id,
    usuario_id = _usuario_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rutaAddOrEdit` (IN `_id` INT, IN `_lugares` VARCHAR(40))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO ruta (lugares)
    VALUES (_lugares);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE ruta
    SET
    lugares = _lugares
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarioAddOrEdit` (IN `_id` INT, IN `_nombre` VARCHAR(40), IN `_apellido` VARCHAR(40), IN `_tipo_doc` VARCHAR(40), IN `_num_doc` INT(40), IN `_email` VARCHAR(40), IN `_password` VARCHAR(40), IN `_rol` VARCHAR(40))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO usuario (nombre, apellido, tipo_doc, num_doc, email, contraseña, rol)
    VALUES (_nombre, _apellido, _tipo_doc, _num_doc, _email, _password, _rol);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE usuario
    SET
    nombre = _nombre,
    apellido = _apellido,
    tipo_doc = _tipo_doc,
    num_doc = _num_doc,
    email = _email,
    password = _password,
    rol = _rol
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usu_busAddOrEdit` (IN `_id` INT, IN `_usuario_id` INT(11), IN `_bus_id` INT(11))   BEGIN 
  IF _id = 0 THEN
    INSERT INTO usu_bus (usuario_id, bus_id)
    VALUES (_usuario_id, _bus_id);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE usu_bus
    SET
    usuario_id = _usuario_id,
    bus_id = _bus_id
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END$$

DELIMITER ;

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
(1, 6735, 'RGRSG34', 'dos pisos'),
(2, 3458, 'ASDO435', 'pequeño');

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
(14, 'Sucre-Ipiales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `apellido` varchar(40) DEFAULT NULL,
  `tipo_doc` varchar(40) DEFAULT NULL,
  `num_doc` int(100) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `rol` varchar(40) DEFAULT 'pasajero'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `tipo_doc`, `num_doc`, `email`, `password`, `rol`) VALUES
(1, 'emanuel', 'zapata', 'cc', 1062274311, 'emanuelzapata792@gmail.com', 'rgrgdrhdrh43363g', 'admin');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usu_bus`
--
ALTER TABLE `usu_bus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asiento`
--
ALTER TABLE `asiento`
  ADD CONSTRAINT `asiento_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`),
  ADD CONSTRAINT `asiento_ibfk_2` FOREIGN KEY (`reserva_id`) REFERENCES `reserva_ticket` (`id`);

--
-- Filtros para la tabla `programacion`
--
ALTER TABLE `programacion`
  ADD CONSTRAINT `programacion_ibfk_1` FOREIGN KEY (`ruta_id`) REFERENCES `ruta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `programacion_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `programacion_bus`
--
ALTER TABLE `programacion_bus`
  ADD CONSTRAINT `programacion_bus_ibfk_1` FOREIGN KEY (`programacion_id`) REFERENCES `programacion` (`id`),
  ADD CONSTRAINT `programacion_bus_ibfk_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`);

--
-- Filtros para la tabla `reserva_ticket`
--
ALTER TABLE `reserva_ticket`
  ADD CONSTRAINT `reserva_ticket_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `reserva_ticket_ibfk_2` FOREIGN KEY (`programacion_id`) REFERENCES `programacion` (`id`);

--
-- Filtros para la tabla `usu_bus`
--
ALTER TABLE `usu_bus`
  ADD CONSTRAINT `usu_bus_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `usu_bus_ibfk_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
