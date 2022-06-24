USE interbusv6;

DELIMITER $$
USE `interbusv6`$$

CREATE PROCEDURE `asientoAddOrEdit` (
  IN _id INT,
  IN _estado VARCHAR(40),
  IN _num_asiento INT(11),
  IN _bus_id INT(11),
  IN _reserva_id INT(11)
)
BEGIN 
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
END

CREATE PROCEDURE `busAddOrEdit` (
  IN _id INT,
  IN _num_bus INT(11),
  IN _placa VARCHAR(100),
  IN _tipo_bus VARCHAR(100)
)
BEGIN 
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
END

CREATE PROCEDURE `programacionAddOrEdit` (
  IN _id INT,
  IN _fecha date,
  IN _hora time,
  IN _usuario_id INT(11),
  IN _ruta_id INT(11)
)
BEGIN 
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
END

CREATE PROCEDURE `programacion_busAddOrEdit` (
  IN _id INT,
  IN _programacion_id INT(11),
  IN _bus_id INT(11)
)
BEGIN 
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
END

CREATE PROCEDURE `reserva_ticketAddOrEdit` (
  IN _id INT,
  IN _valor_uni double,
  IN _total double,
  IN _programacion_id INT(11),
  IN _usuario_id INT(11)
)
BEGIN 
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
END

CREATE PROCEDURE `usuarioAddOrEdit` (
  IN _id INT,
  IN _nombre VARCHAR(40),
  IN _apellido VARCHAR(40),
  IN _tipo_doc VARCHAR(40),
  IN _num_doc INT(40),
  IN _email VARCHAR(40),
  IN _password VARCHAR(40),
  IN _rol VARCHAR(40)
)
BEGIN 
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
END

CREATE PROCEDURE `usu_busAddOrEdit` (
  IN _id INT,
  IN _usuario_id INT(11),
  IN _bus_id INT(11)
)
BEGIN 
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
END

CREATE PROCEDURE `rutaAddOrEdit` (
  IN _id INT,
  IN _lugares VARCHAR(40)
)
BEGIN 
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
END