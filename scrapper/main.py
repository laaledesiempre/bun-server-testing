import requests
import random

perros_names=["Pedro","Carlos","Lucas","Juan","Ana","Patricia","Roco","Chichi","Marin"]

url = "localhost:3000/api/perros"

print(""" Select option for testing 
      1) Send 100 requests sending random names
      2) Get json of the get endpoint""")

option = input("Option selected")

if option == "1":
    for _ in range(100):
        data = {"name" : random.choice(perros_name.random)}
        requests.post(url, json=data)
    print("100 Request made!")

elif option == "2":
    requested = requests.get(url)
    print(requested.text())

