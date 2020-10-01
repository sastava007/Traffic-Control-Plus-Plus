
# TC++ : The complete Traffic Solution

## Idea

The main idea is to provide a smart solution for our existing traffic system. Including automated challan for overspeeding vehicles on a decentralized network and dynamic traffic signal timings and also create an interactive visualization through a dashboard to monitor the above functionalities. The Idea won 2nd Runner Up at Technex Hackthon, Nagpur.

## Solution

The idea has three major parts :
- Detect and identify overspeeding vehicles using Computer Vision Technology and generate automated challan using Decentralized Blockchain Network.
- Detect traffic density on Signals and dynamically change the traffic light timings accordingly using Background Subtraction in Computer Vision.
- Create the dashboard for the above features for monitoring purposes and map the realtime traffic on Google Maps.

## Details

Detect the vehicles using blobs and track them to calculate their speed. If the speed exceeds a certain threhold capture the ROI(Region of intrest), save it and detect the number plate of the vehicle extract the number and call the Info API to get info of vehicle and send the challan to the same using blockchain. 

Detect the static standing vehicles on the traffic signal, calculate the density of traffic based on the lane and dynamically change the traffic light timings using our self-developed algorithms.
## System Architecture
![enter image description here](/content/TC++system_architecture.png)
**Overview of Architecture**

We are running two microservices, The Python Server(Flask framework) processes the image processing, speed detection and dynamic traffic light part. NodeJS handles the Blockchain Network.
## Tech Stack

- React
- Python(Flask) and NodeJS Microservices
- openCV
- Etherium
- Solidity
- Matic 
- AntD React Components

## How it works?
Please go through the below illustrations, to understand how exactly a speeding car will be detected and how we'll be extracting it's number plate. Once the number plate is detected, we'll fetch the detail of it's owner and issue a ticket against him using our blockchain network.

**Overspeeding Vehicle Detection**
![enter image description here](/content/output.gif)
**Extract the Number Plate of Overspeeding Cars**
![enter image description here](https://docs.openvinotoolkit.org/2019_R3.1/vehicle-license-plate-detection-barrier-0106.jpeg)

**Speed Detection Algorithm**

![enter image description here](https://www.pyimagesearch.com/wp-content/uploads/2019/12/neighborhood_speed_physics_not_cal-768x573.jpg)


**Speed Detection Algorithm**

![enter image description here](https://www.pyimagesearch.com/wp-content/uploads/2019/12/neighborhood_speed_physics_not_cal-768x573.jpg)


## Note:
This repository contains the code for number plate extraction, and speed detection. The other service to generate and issue ticket for over-speeding vehicles is developed as a seperate service. It was developed in 24hr at Technex Hackathon, under modern-mobility theme and we landed as 2nd runner up. 

## About the Team
We are from IIIT Gwalior **The Three Amigos**, passionate about Tech and crazy about Tshirts and Swags, do connect, network and collaborate.
- **Prajwal Singh** : <a href="https://www.linkedin.com/in/prajwal714/" target="_blank">`LinkedIn`</a>
- **Shivam Agarwal** : <a href="https://www.linkedin.com/in/shivam-agrawal-a4a414181/" target="_blank">`LinkedIn`</a>
- **Shivansh Srivastava** : <a href="https://www.linkedin.com/in/sastava007/" target="_blank">`LinkedIn`</a>
