import cv2
import dlib
import time
import threading
import math
import os
import requests
from pprint import pprint
import json

# carCascade = cv2.CascadeClassifier('myhaar.xml')
# video = cv2.VideoCapture('../short-test.mp4')
PATH="P:/hackthon/images"
FILE_PATH="P:/hackthon/list.txt"
# WIDTH = 1920
# HEIGHT = 1080
# MIN_WIDTH=100
# MIN_HEIGHT=100
API_KEY='02f97a914ac21efe0f718cc3acbd0ebce3d1dc5e '

def overspeeding(car_id):
	with open(PATH+'/3car.jpg', 'rb') as fp:
		response = requests.post(
        'https://api.platerecognizer.com/v1/plate-reader/',
         # Optional
        files=dict(upload=fp),
        headers={'Authorization':'Token '+API_KEY})
	res=response.json()
	print(res)
	# print(type(res)) #type == dictionary
	# print(type(res['results'])) # type==list
	# print(len(res['results']))
	# print(type( res['results'][0]['box'] ))
	# print( res['results'][0]['plate'] )
	# print(res['results'][0]['vehicle'])


			
 


	
overspeeding(2)
