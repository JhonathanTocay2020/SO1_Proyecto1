# Manual Técnico
## Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Sistemas Operativos 1, Primer Semestre 2023

## Arquitectura del Proyecto

[![Arquitectura-Proyecto.jpg](https://i.postimg.cc/Gpr9Q08p/Arquitectura-Proyecto.jpg)](https://postimg.cc/pmG2W6BN)

## Tecnologías Utilizadas
| Término    | Definición                                                                   |
| -----------| ---------------------------------------------------------------------------- |
| `Redis`    | Motor de base de datos en memoria.                                           |
| `Mysql`    | Sistema de gestión de bases de datos                                         |
| `Nodejs`   | Entorno en tiempo de ejecución multiplataforma JavaScript                    |
| `GCP`      | Google Cloud Platform                                                        |
| `Locust`   | Herramienta de prueba de carga de código abierto, con Python                 |
| `K8S`      | Kubernetes                                                                   |
| `Nginx`    | Diseñado para ofrecer un bajo uso de memoria y alta conrurrencia             |
| `Cloud Run`| Plataforma de computación gestionada que escala contenedores automáticamente |
| `Docker`   | Pruebas de automatizació de despliegue de aplicaciones dentro de contenedores|

## Requerimientos
- Servicios de Kubernetes administrados en la nube.
    - Google Cloud Engine (GKE).
    - Clúster de Kubernetes.
- Servicios mínimos para cada nodo 8CPU y 32GiB de memoria.
- Sistema Operativo libre (Linux Windows, etc)
    - Memoria RAM Mínima de preferencia: 4GB
    - Disco Duro de preferencia: 1GB o más 
- Instalación de todas las tecnologías 

## Locust 
Documentación oficial en [Locust](https://docs.locust.io/en/stable/installation.html).

### Instalación de Locust
Se puede instalar locust en la máquina utilizando el siguiente comando:
```sh
pip install locust
```

Para verificar que Locust se instaló correctamente se puede ejecutar el siguiente comando:
```sh
locust -V
```
Para ejecutar un archivo de Locust se puede ejecutar el siguiente comando:
```sh
locust -f <<archivo.py>>
```

## gRPC Client y Server
El dockerfile para nuestro gRPC Server y Client seria como el siguiente:
```Dockerfile
# syntax=docker/dockerfile:1
#Version node
FROM node:lts-alpine3.17

#directorio de trabajo
WORKDIR /app

#Copiando archivos con las librerias necesarias
COPY package.json ./
COPY package-lock.json ./
COPY . .

#listar y ejecutar todos los archivos
RUN ls -a
RUN npm install

CMD ["node", "archivo.js"]
```
Las instrucciones utilizadas realizan lo siguente:
- `FROM node:lts-alpine3.17`: Especifica node:lts-alpine3.17 como imagen base para la que se creará la imagen.
- `WORKDIR /app`: Especifica que el directorio /app será el directorio de trabajo del contenedor.
- `COPY package.json ./`: Copia el archivo package.json al directorio actual.
- `COPY package-lock.json ./`: Copia el archivo package-lock.json al directorio actual.
- `COPY . .`: Realiza la copia del código fuente al directorio actual.
- `RUN ls -a`: Comando para listar las carpetas que copio.
- `RUN npm install`: Realiza la instalación de las dependencias necesarias.
- `CMD ["node", "archivo.js"]`: Ejecuta el codigo fuente de nuestro server y client en el contenedor.

**Ejecución**
* Realizar npm i en api, grpc-client y grpc-server para instalar las dependencias necesarias.

 ```
 npm install @grpc/grpc-js @grpc/proto-loader async google-protobuf lodash minimist
 ```

## Redis

### Redis Pub
El dockerfile para nuestro Redis Pub seria como el siguiente:
```Dockerfile
# syntax=docker/dockerfile:1
#Version golang
FROM golang:1.20
WORKDIR /app


COPY go.mod ./
COPY go.sum ./
COPY . .

RUN go mod download

# EXPOSE 3300
RUN go build -o /backendPub

CMD ["/backendPub"]
```

Las instrucciones utilizadas realizan lo siguente:
- `FROM golang:1.20`: Especifica golang:1.20 como imagen base para la que se creará la imagen.
- `WORKDIR /app`: Especifica que el directorio /app será el directorio de trabajo del contenedor.
- `COPY go.mod ./`: Copia el archivo go.mod al directorio actual.
- `COPY go.sum ./`: Copia el archivo go.mod al directorio actual.
- `COPY . .`: Realiza la copia del código fuente al directorio actual.
- `RUN go mod download`: Ejecuta el comando para instalar las dependencias.
- `RUN go build -o /backendPub`: Realiza el build del proyecto para ser ejecutado.
- `CMD ["/backendPub"]`: Ejecuta el codigo fuente de nuestro pub en el contenedor.

Una vez que se haya creado el Dockerfile, se puede ejecutar el siguiente comando para crear la imagen:
```sh
sudo docker build -t [usuarioRepo]/so1_proyecto_redispub .
```
Creada la imagen se puede subir al usuario de Docker Hub para usar posteriormente en kubernetes. 

### Redis Sub
El dockerfile para nuestro Redis Sub seria como el siguiente:
```Dockerfile
# syntax=docker/dockerfile:1
#Version golang
FROM golang:1.20
WORKDIR /app


COPY go.mod ./
COPY go.sum ./
COPY . .

RUN go mod download

# EXPOSE 3300
RUN go build -o /backendSub

CMD ["/backendSub"]

```

Las instrucciones de arriba son las siguientes:
- `FROM golang:1.20`: Especifica golang:1.20 como imagen base para la que se creará la imagen.
- `WORKDIR /app`: Especifica que el directorio /app será el directorio de trabajo del contenedor.
- `COPY go.mod ./`: Copia el archivo go.mod al directorio actual.
- `COPY go.sum ./`: Copia el archivo go.mod al directorio actual.
- `COPY . .`: Realiza la copia del código fuente al directorio actual.
- `RUN go mod download`: Ejecuta el comando para instalar las dependencias.
- `RUN go build -o /backendSub`: Realiza el build del proyecto para ser ejecutado.
- `CMD ["/backendSub"]`: Ejecuta el codigo fuente de nuestro pub en el contenedor.

Una vez que se haya creado el Dockerfile, se puede ejecutar el siguiente comando para crear la imagen:
```sh
sudo docker build -t [usuarioRepo]/redissub .
```

### MySQL
Levantado en una imagen por medio de contenedores dentro de kubernetes, expuesto en el puerto 3306, Haciendo uso del archivo data.yaml dentro de la carpeta kubernetes por medio del siguiente comando:
```sh
kubectl apply -f data.yaml
```

### Redis
Levantado por medio de una imagen de docker dentro de Kubernetes, expuesto en el puerto 6379, Haciendo uso del archivo redis.yaml dentro de la carpeta kubernetes por medio del siguiente comando:
```sh
kubectl apply -f redis.yaml
```

## GCloud SDK
Documentación oficial en [GCloud](https://cloud.google.com/sdk/docs/install-sdk?hl=es-419#deb).
### Instalación de SDK para Ubuntu
Se utilizan los siguientes comandos uno por uno:
```
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-367.0.0-linux-x86_64.tar.gz
```
```
tar zxvf google-cloud-sdk-367.0.0-linux-x86_64.tar.gz
```
```
./google-cloud-sdk/install.sh
```
Al finalizar la ejecución de todos cerrar y abrir una terminal nueva para continuar el proceso.

### Configurar GCloud sdk
```
gcloud init
```
Configurar el proyecto y la región por defecto, utilizando el ID del Proyecto.
```
gcloud config set project <<ID_proyecto>>
```
```
gcloud config set compute/zone us-central1-a
```
-----------
## Instalar Kubectl
```
gcloud components install kubectl
```
Teniendo instalado Kubectl se debe crear el Clúster a utilizar para levantar el proyecto.

## Obtener credenciales para Kubectl
Entrar en la página de GCP a la configuración del clúster, obtener la conexión, copiar y pegar la conexión en una terminal. Ejemplo
```
gcloud container clusters get-credentials <<name_cluster>> --zone us-central1-a --project so1-2023
```

## Instalar Helm y Crear nginx para uso de ingress
Crear un namespace para ingress y uso de helm que servirá como gestor de los paquetes de k8s para el manejo de ingress con nginx.

```
kubectl create ns nginx-ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx 
helm repo update 
helm install nginx-ingress ingress-nginx/ingress-nginx -n nginx-ingress
helm list -n nginx
```
Comando para visualizar los servicios que se tendrán dentro del namespace de nginx.
```
kubectl get services -n nginx-ingress
```
### Optenemos IP Externa
Obtenemos la IP externa por donde ingresan los datos
```
kubectl get svc -n nginx-ingress
```

### Algunos comandos útiles para el monitoreo y configuración de Kubernetes
Listar los nodos
```
kubectl get nodes
```
Listar los namespaces
```
kubectl get namespaces
```
Listar los pods
```
kubectl get pods
```
**Ejecutar los archivos de configuración yaml**
```
kubectl create -f archivo.yaml
kubectl delete -f archivo.yaml
kubectl apply -f archivo.yaml
```

## Cloud Run

### Container Registry

Hacer pull de la imagen desde DockerHub
```
docker pull <<username>>/<<image_name>>
```

Realizar un tag a la imagen para posteriormente utilizarla dentro de GCloud.
```
docker tag <<imagen>> gcr.io/<ID>/<nombre>:<version>
```

Hacer push de la imagen taggeada a dentro de la consola de GCloud.
```
docker push gcr.io/so1-2023/frontend
```

## Creación de un servidor web en Docker para Frontend
Para crear una imagen debemos crear un directorio para esta con un archivo llamado Dockerfile. Este archivo contiene las instrucciones detalladas para crear la imagen en cualquier entorno sin ninguna dependencia.

Suponiendo que se requiere crear un servidor web en React, se puede iniciar el Dockerfile con las siguientes instrucciones:
```Dockerfile
FROM node:16.18.0
# create & set working directory
RUN mkdir -p /src
WORKDIR /src
# copy source files
COPY . /src
# install dependencies
RUN npm install
# start app
RUN npm run build
EXPOSE 3000
# start app
CMD ["npm", "start"]
```

Donde:
- `FROM node:16.18.0`: Especifica FROM node:16.18.0 como imagen base para la que se creará la imagen.
- `RUN mkdir -p /src`: Especifica donde se creará y utilizará el directorio del contenedor.
- `WORKDIR /src .`: Especifica que el directorio /src será el directorio de trabajo del contenedor.
- `COPY . /src`: Copia el código fuente al directorio actual.
- `RUN npm install`: Realiza la instalación de las dependencias necesarias.
- `RUN npm run build`: Realiza la construcción necesaria del proyecto.
- `EXPOSE 3000`: Expone el puerto en el que se correrá nuestro frontend
- `CMD ["npm", "start"]`: Especifica que el comando npm npm start será ejecutado al iniciar el contenedor. Este comando debe ser especificado en el package.json.

### Instalación de Linkerd
Documentación oficial en [Linkerd](https://linkerd.io/2.11/getting-started/).

A continuación se ve el proceso para la instalacion de linkerd
```
curl -fsL https://run.linkerd.io/install | sh
export PATH=$PATH:$HOME/.linkerd2/bin
linkerd check --pre
linkerd install | kubectl apply -f -
```

### Instalación del dashboard
Se instala el dashboard para acceder a la pagina de linkerd
```
linkerd viz install | kubectl apply -f -
```

### Inyectar los archivos a Linkerd
Se instala el dashboard para acceder a la pagina de linkerd
```
kubectl -n <my_namespace> get deploy -o yaml | linkerd inject - | kubectl apply -f -
```
### Ver el Dashboard
Finalmente abrimos el dashboard para comprobar que funcionen todos los nodos
```
linkerd viz dashboard
```