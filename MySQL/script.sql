Create Database Proyecto1;
use Proyecto1;

create table votos(
	id_voto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    no_sede integer,
    municipio varchar(200),
    departamento varchar(200),
    papeleta varchar(200),
    partido varchar(200)
);

select * from votos;
truncate table votos;

INSERT INTO votos (no_sede,municipio,departamento,papeleta,partido) VALUES (1, 'Guatemala', 'Guatemala', 'Blanca', 'UNIONISTA');