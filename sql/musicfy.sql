create database Musicfy;
use Musicfy;
CREATE TABLE artistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    pais VARCHAR(50),
    fecha_formacion DATE
);
CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    id_artista INT,
    fecha_lanzamiento DATE,
    FOREIGN KEY (id_artista) REFERENCES artistas(id) ON DELETE CASCADE
);
CREATE TABLE canciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    duracion TIME,
    id_album INT,
    ruta_mp3 VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_album) REFERENCES albums(id) ON DELETE CASCADE
);
ALTER TABLE canciones MODIFY ruta_mp3 VARCHAR(255);
CREATE TABLE tendencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT
);
CREATE TABLE artista_tendencia (
    id_artista INT,
    id_tendencia INT,
    FOREIGN KEY (id_artista) REFERENCES artistas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tendencia) REFERENCES tendencias(id) ON DELETE CASCADE,
    PRIMARY KEY (id_artista, id_tendencia)
);
use musicfy;
INSERT INTO artistas (nombre, genero, pais, fecha_formacion)
VALUES 
('Depeche Mode', 'Synth-pop', 'Inglaterra', '1980-01-01'),
('A Perfect Circle', 'Rock Alternativo', 'Estados Unidos', '1999-01-01'),
('Nafta', 'Soul', 'Argentina', '2016-01-01'),
('The cure', 'Rock Alternativo', 'Inglaterra', '1976-01-01'),
('And One', 'Synth-pop', 'Alemania', '1989-01-01'),
('Boris Brejcha', 'High-Tech Minimal', 'Alemania', '2006-01-01');

select * from artistas;

INSERT INTO albums (titulo, id_artista, fecha_lanzamiento)
VALUES 
('Playing the Angel', 1, '1969-10-17'),
('Violator', 1, '1990-03-19'),
('Thirteenth Step', 2, '2003-09-16'),
('Mer de Noms', 2, '2000-05-23'),
('Nafta', 3, '2019-10-17'),
('Nafta II', 3, '2023-07-28'),
('The Cure', 4, '2004-06-25'),
('Desintegration', 4, '1989-05-02'),
('Bodypop', 5, '2006-09-01'),
('Tanzomat', 5, '2011-03-04'),
('Space Diver', 6, '2020-01-24'),
('Never Stop Dancing', 6, '2021-11-26');

select * from albums;

ALTER TABLE canciones ADD COLUMN id_tendencia INT;

ALTER TABLE canciones
ADD CONSTRAINT fk_tendencia
FOREIGN KEY (id_tendencia) REFERENCES tendencias(id);

INSERT INTO tendencias (titulo, descripcion)
VALUES 
('Mix Depeche', 'Los mejores clásicos para disfrutar el silencio'),
('Boliche Tech', 'Bailá toda la noche con lo mejor del synth y tech'),
('Lo mejor de los 80', 'Clásicos sin parar, lo mejor de la época'),
('Rock Alternativo', 'Variedad de temas para alternar un poco el dia'),
('Cura para los oídos', 'Mix con lo mas escuchado de The Cure'),
('Minimal Techno', 'Para una noche mas extensa de pie, al ritmo de Boris');

INSERT INTO artista_tendencia (id_artista, id_tendencia)
VALUES 
(1, 1),
(5, 2),
(6, 2), 
(1, 3),
(4, 3),
(2, 4),
(4, 4),
(1, 4),
(4, 5),
(6, 6);
select * from albums;

INSERT INTO canciones (titulo, duracion, id_album)
VALUES 
('A Paint That I´m Used to', '00:04:11', 1),
('John the Revelator', '00:03:42', 1),
('Suffer Well', '00:03:49', 1),
('The Sinner in Me', '00:04:55', 1),
('Precious', '00:04:10', 1),
('Macro', '00:04:02', 1),
('I Want It All', '00:06:09', 1),
('Nothin´s Impossible', '00:04:21', 1),
('Introspectre', '00:01:42', 1),
('Damaged People', '00:03:27', 1),
('Lilian', '00:04:45', 1),
('The Darkest Star', '00:06:55', 1);

INSERT INTO canciones (titulo, duracion, id_album)
VALUES
('World In My Eyes', '00:04:27', 2),
('Sweetest Perfection', '00:04:42', 2),
('Personal Jesus', '00:04:54', 2),
('Halo', '00:04:28', 2),
('Waiting for the Night', '00:06:07', 2),
('Enjoy the Silence', '00:06:13', 2),
('Policy of Truth', '00:04:54', 2),
('Blue Dress', '00:05:38', 2),
('Clean', '00:05:33', 2);

select * from canciones;

CREATE TABLE cancion_tendencia (
    id_cancion INT,
    id_tendencia INT,
    FOREIGN KEY (id_cancion) REFERENCES canciones(id),
    FOREIGN KEY (id_tendencia) REFERENCES tendencias(id)
);

INSERT INTO cancion_tendencia (id_cancion, id_tendencia) VALUES 
(18, 1),
(15, 1),
(5, 1),
(11, 1),
(19, 1),
(1, 1),
(2, 1),
(7, 1),
(13, 1),
(8, 1),
(15, 3),
(5, 3),
(1, 3),
(2, 3),
(13, 3);

CREATE TABLE artistas_relacionados (
    id_artista_principal INT,
    id_artista_relacionado INT,
    FOREIGN KEY (id_artista_principal) REFERENCES artistas(id),
    FOREIGN KEY (id_artista_relacionado) REFERENCES artistas(id)
);

INSERT INTO artistas_relacionados (id_artista_principal, id_artista_relacionado) 
VALUES 
(1, 4),
(1, 2),
(2, 1),
(2, 4),
(4, 1),
(4, 2),
(5, 6),
(5, 1),
(6, 5);

select * from artistas_relacionados;

CREATE TABLE Favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artista_id INT,
    imagen_url VARCHAR(255),
    FOREIGN KEY (artista_id) REFERENCES artistas(id)
);

ALTER TABLE artistas
ADD COLUMN imagen_url VARCHAR(255);

UPDATE Favoritos f
JOIN artistas a ON f.artista_id = a.id
SET f.imagen_url = a.imagen_url;


INSERT INTO Favoritos (artista_id)
VALUES (1);

DELETE FROM Favoritos
WHERE artista_id = 1;

SELECT a.nombre, a.imagen_url
FROM artistas a
JOIN Favoritos f ON a.id = f.artista_id;

update artistas set imagen_url = "../../img/the-cure.jpeg" where id = 4;

CREATE TRIGGER after_artistas_update AFTER UPDATE ON artistas
FOR EACH ROW
BEGIN
    UPDATE Favoritos
    SET imagen_url = NEW.imagen_url
    WHERE artista_id = NEW.id;
END;


SELECT a.nombre, a.imagen_url FROM artistas a JOIN Favoritos f ON a.id = f.artista_id;

select * from favoritos;

ALTER TABLE Favoritos
ADD COLUMN href VARCHAR(255);

INSERT INTO Favoritos (artista_id, imagen_url, href) VALUES (3, 'https://ejemplo.com/imagen1.jpg', 'https://ejemplo.com/enlace1');

INSERT INTO Favoritos (artista_id, imagen_url, href) VALUES (4,"../../img/the-cure.jpeg", "../The-Cure/artista4.html");


UPDATE Favoritos
SET href = "../Depeche-mode/artista1.html"
WHERE artista_id = 1;

SELECT a.nombre, a.imagen_url, f.href FROM artistas a JOIN Favoritos f ON a.id = f.artista_id;


UPDATE Favoritos f
        JOIN artistas a ON f.artista_id = a.id
        SET f.imagen_url = a.imagen_url


delete from Favoritos where artista_id

SELECT a.id, a.nombre, a.imagen_url, f.href FROM artistas a JOIN Favoritos f ON a.id = f.artista_id;

select * from artistas;


update artistas set imagen_url = "../../img/boris.png" where id = 6;