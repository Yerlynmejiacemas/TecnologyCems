-- Crear la base de datos
create database if not exists tienda_online;

-- Usar la base de datos
use tienda_online;

-- Crear la tablau
create table productos (
  id int auto_increment primary key,
  nombre varchar(255) not null,
  categoria varchar(255),
  precio int not null,
  imagen text not null, -- por ejemplo: images/iphone13.png
  descripcion text
) engine = InnoDB;

-- Hacer una consulta para obtener todos los productos
-- Deberia decir que hay 0 productos ya que no se han agregado
select * from productos;

-- Este codigo es para en caso de que no se quiera conectar a la base de datos
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

-------- -------- -------- --------
-- HAY QUE TENER CUIDADO CON ESTO
-- YA QUE SON PARA BORRAR LOS DATOS
-------- -------- -------- --------

-- Borrar un solo producto por id
delete from productos where id = 1;

-- Borrar todos los datos de las tabla productos
truncate table productos;

-- Borrar la base de datos COMPLETA
drop database tienda_online;



