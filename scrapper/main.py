
import requests #https://requests.readthedocs.io/en/latest/
import random

# Names for random posting
perros_names=["Pedro","Carlos","Lucas","Juan","Ana","Patricia","Roco","Chichi","Marin"]

# There is not place like 127.0.0.1
url = "http://127.0.0.1:3000/api/perros"

# Menu
while True:
    print(""" Select option for testing 
        1) Send amount requests sending random names
        2) Get json of the get endpoint
        s) Exit""")

    option = input("Option selected")
    
    # Post
    if option == "1":

        # Number of requests
        while True:
            try:
                amout_of_request = int(input("Put an amount of inputs (integer): "))
                break
            except:
                print("Not a valid number")
        
        # Request loop
        for _ in range(amout_of_request):
            data = {"name" : random.choice(perros_names)}
            requests.post(url,json=data)

        print(f"{amout_of_request} Request made!")

    # Get
    elif option == "2":
        requested = requests.get(url)
        for value in requested.json():
            print(value)
    
    # Exit
    elif option.lower() == "s":
        print("Bye!")
        break
    
    # Error
    else:
        print("Unknown option")

