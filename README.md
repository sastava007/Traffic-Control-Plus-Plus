
# TC++ : The complete Traffic Solution

## Idea

The main idea is to provide a smart solution for our existing traffic system. Including automated challan for overspeeding vehicles on a decentralized network and dynamic traffic signal timings and also create an interactive visualization through a dashboard to monitor the above functionalities.  

## Solution

The idea has three major parts :
- Detect and identify overspeeding vehicles using Computer Vision Technology and generate automated challan using Decentralized Blockchain Network.
- Detect traffic density on Signals and dynamically change the traffic light timings accordingly using Background Subtraction in Computer Vision.
- Create the dashboard for the above features for monitoring purposes and map the realtime traffic on Google Maps.

## Details

Detect the vehicles using blobs and track them to calculate their speed. If the speed exceeds a certain threhold capture the ROI(Region of intrest), save it and detect the number plate of the vehicle extract the number and call the Info API to get info of vehicle and send the challan to the same using blockchain. 

Detect the static standing vehicles on the traffic signal, calculate the density of traffic based on the lane and dynamically change the traffic light timings using our self-developed algorithms.

## Tech Stack

- MEVN
- Python & Flask APIs
- openCV
- Etherium
- Solidity

## How it works?
Please go through the below illustrations, to understand how exactly a sppeding car will be detected and how we'll be extracting it's number plate. Once the number plate is detected, we'll fetch the detail of it's owner and issue a ticket against him using our blockchain network.
![enter image description here](https://docs.openvinotoolkit.org/2019_R3.1/vehicle-license-plate-detection-barrier-0106.jpeg)
![enter image description here](https://www.pyimagesearch.com/wp-content/uploads/2019/12/neighborhood_speed_physics_not_cal-768x573.jpg)
![enter image description here](https://i.ibb.co/yWXq0df/Whats-App-Image-2020-07-26-at-00-46-14.jpg)
![enter image description here](https://storage.googleapis.com/devfolio/hackathons/b8206911aa2b4685bbfb9e18285b50de/projects/3b7434fdffbf4933ad7a817adea395a2/picz9cvracq4.jpeg)

## Note:
This repository contains the code for number plate extraction, and speed detection. The other service to generate and issue ticket for over-speeding vehicles is developed as a seperate service. It was developed in 24hr at Technex Hackathon, under modern-mobility theme and we landed as 2nd runner up. 
