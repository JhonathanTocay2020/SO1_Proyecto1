# Manual de Usuario
## Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Sistemas Operativos 1, Primer Semestre 2023

## Tecnologías Utilizadas
| Término    | Definición                                                                   |
| -----------| ---------------------------------------------------------------------------- |
| `Redis`    | Motor de base de datos en memoria.                                           |
| `Mysql`    | Sistema de gestión de bases de datos                                         |
| `Nodejs`   | Entorno en tiempo de ejecución multiplataforma JavaScript                    |
| `GCP`      | Google Cloud Platform                                                        |
| `K8S`      | Kubernetes                                                                   |
| `Cloud Run`| Plataforma de computación gestionada que escala contenedores automáticamente |

## Descripcion General
Este proyecto consiste en comprender la concurrencia y la teoría del paralelismo para desarrollar
sistemas distribuidos que muestre estadísticas en tiempo real mediante Kubernetes y tecnologías en la
nube. Y proporcionar un despliegue de un Dashboard para mostrar dichas gráficas donde se mostrarán las distintas consultas. Este proyecto será aplicado para llevar el control sobre el porcentaje de votos cemitidos en las
elecciones.

## Uso
Se cuenta con un Clúster que está alojado en GCP, dicho cluster cuenta con varios Deployments, Pods y Contenedores en los que se desplegará dicha aplicación, los cuales serán accesibles mediante distintos puertos.

### Locust 
Para el uso de locust se utiliza el siguiente comando:
```sh
locust -f <<archivo.py>>

```
La ejecución proviene de un mini-servicio en python. Esta parte es local asi que se ejecuta desde la carpeta destino.

Este archivo se corre localmente y el contenido distribuido viene de una lista de json con la siguiente estructura
```sh
[
  {
    "sede": 1,
    "municipio": "Guatemala",
    "departamento": "Guatemala",
    "papeleta": "Blanca",
    "partido": "FCN"
  },
  …
] 

```
[![Locust.png](https://i.postimg.cc/DZ7PVbtq/Locust.png)](https://postimg.cc/7CQ20bP6)

### Tráfico de Datos desde el Dashboard de Locust

[![Locust-Insert.jpg](https://i.postimg.cc/yNp9jc5x/Locust-Insert.jpg)](https://postimg.cc/QB5Hx9jZ)

### MySQL
Levantado en una imagen por medio de contenedores dentro de kubernetes, expuesto en el puerto 3306.

[![descarga-1.jpg](https://i.postimg.cc/FzRQFpfm/descarga-1.jpg)](https://postimg.cc/8JqYthBn)

### Redis
Levantado por medio de una imagen de docker dentro de Kubernetes, expuesto en el puerto 6379.

[![Logo-redis-svg-1.jpg](https://i.postimg.cc/Y25HB6rc/Logo-redis-svg-1.jpg)](https://postimg.cc/7bncgTJX)

### gRPC Server y Redis Sub
Levantado como un servicio que será comunicado por medio de la URL de espacio de trabajo de kubernetes y comunicado con el cliente bajo la dirección 34.66.60.225.nip.io, URL que servirá como conexión hacia el frontend que permitirá la visualización del dashboard.

### gRPC Client y Redis Pub
Permite la conexión con locust para dar paso al tráfico de datos que será insertado en la base de datos MySQL.

#### Servidor de desarrollo API

Levantado en la dirección api.34.66.60.225.nip.io, URL que servirá como conexión hacia el frontend que permitirá la visualización del dashboard.
Dicha aplicación es desarrollada en Node JS.

[![2560px-Node-js-logo-svg-1.jpg](https://i.postimg.cc/HxGwgWL9/2560px-Node-js-logo-svg-1.jpg)](https://postimg.cc/xkRJG2MX)

### Frontend
Levantado por medio de Cloud Run.

Este proyecto fue generado con [React](https://legacy.reactjs.org/docs/getting-started.html).

[![react.jpg](https://i.postimg.cc/wTxbP2ZT/react.jpg)](https://postimg.cc/Lh7Tgtmr)

## WEB APP
La aplicacion esta compuesta de varios componentes que servirán para mostrar los reportes necesarios dentro de un Dashboard. 
### Uso de la Aplicación
**Reportes Mysql**
- Recopilación de datos almacenados en MySQL.
- Top 3 de departamentos con mayores votos para presidente, en MySQL.
[![D1.jpg](https://i.postimg.cc/pLWB1Sns/D1.jpg)](https://postimg.cc/rKHWDQj4)
- Gráfico circular del porcentaje de votos por partido, según municipio, y
departamento, en MySQL. 
[![D2.jpg](https://i.postimg.cc/3rjm5BhV/D2.jpg)](https://postimg.cc/JtnGjjG5)

**Reportes Redis**
- Gráfico de barras que muestre las 5 sedes con mayores votos almacenados
en Redis.
[![D3.jpg](https://i.postimg.cc/FRVRqTSx/D3.jpg)](https://postimg.cc/7GbwJMmC)
- Últimos 5 votos almacenados en Redis.
[![D4.jpg](https://i.postimg.cc/y83NB19x/D4.jpg)](https://postimg.cc/0zxv0qV1)
