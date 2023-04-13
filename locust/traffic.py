"""
import json
from locust import HttpUser, between, task

class ReadFile():
   def __init__(self):
       self.data = []


   def cargaMasiva(self):
       print("Cargando ...")
       try:
           with open("traffic.json", 'r') as file:
               self.data = json.loads(file.read())
       except Exception:
           print(f'Error : {Exception}')


class TrafficData(HttpUser):
   wait_time = between(0.1, 0.9)
   reader = ReadFile()
   reader.cargaMasiva()


   def on_start(self):
       print("On Start")
  
   @task
   def send_message(self):
       if self.reader.data:
           data = self.reader.data[0]
           res = self.client.post("/voto/agregarVoto", json=data)
           response = res.json()
           print(response)
           self.reader.data.pop(0)
       else:
           print("Empty")
           self.stop(True)
"""
# ------------------------------------------------------------------------------------
# --------------------- 
# ------------------------------------------------------------------------------------

import json
from random import randrange
from locust import HttpUser, between, task

class readFile():
    def __init__(self):
        self.data = []

    def getData(self): #Metodo donde se obtiene un elemento de la lista de registros
        size = len(self.data) #Tamaño de los datos
        if size > 0:
            index = randrange(0, size - 1) if size > 1 else 0
            return self.data.pop(index)
        else:
            print("size -> 0")
            return None
    
    def loadFile(self):
        print("Cargando ...")
        try:
            with open("traffic.json", 'r', encoding='utf-8') as file:
                self.data = json.loads(file.read())
        except Exception:
            print(f'Error : {Exception}')

class trafficData(HttpUser):
    wait_time = between(0.1, 0.9) #Tiempo de espera entre registros
    reader = readFile()
    reader.loadFile()

    def on_start(self):
        print("On Start")
    
    @task
    def sendMessage(self):
        data = self.reader.getData() #Registro obtenido de la lista
        if data is not None:
            res = self.client.post("/voto/agregarVoto", json=data)
            response = res.json()
            print(response)
        else:
            print("Empty") #No hay mas datos por enviar
            self.stop(True)