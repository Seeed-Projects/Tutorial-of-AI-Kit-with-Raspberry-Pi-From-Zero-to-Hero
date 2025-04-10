---
sidebar_position: 4
---



# Make your Own Web Application with Hailo and Using Flask 

![object detection](../../pictures/Chapter3/flask.gif)

This tutorial walks you through setting up a Hailo-based web application using Flask. It covers installing necessary dependencies, setting up the environment, and running the server. Here’s a step-by-step breakdown:

### Step 1: Update the System

Open a terminal on your reComputer AI Box and run the following commands to update your system:

```
sudo apt update
sudo apt full-upgrade
```
### Step 2: Set PCIe to Gen3

Follow the [tutorial](https://seeed-projects.github.io/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/docs/Chapter_2-Configuring_the_RaspberryPi_Environment/Introduction_to_Hailo_in_Raspberry_Pi_Environment#installing-hailo-software-on-raspberry-pi-5) to set PCIe to Gen3 as required for the Hailo device.

### Step 3: Install Dependencies for NPU

```
sudo apt install hailo-all
```

### Step 4: Set Up the Project Environment

- **Create a New Directory**

```
mkdir Hailo-Web-App
cd Hailo-Web-App
```
- **Create and Activate a Virtual Environment**

```
python -m venv --system-site-packages env
source env/bin/activate

```
- **Clone the Repository**

```
git clone https://github.com/KasunThushara/Hailo-Web.git
cd Hailo-Web
```

- **Install Python Dependencies**

```
pip install -r requirements.txt
```
- **Grant Execution Permission to the Download Script**

```
chmod +x download_resources.sh
```

- **Run the Resource Download Script**

```
./download_resources.sh
```

### Step 5: Start the Server

- **Navigate Back to the Project Directory at New Terminal**

```
cd Hailo-Web-App
```

- **Activate the Virtual Environment (if not already activated)**

```
source env/bin/activate
```

- **Navigate to the Hailo-Web Directory**

```
cd Hailo-Web
```

- **Start the Server**

```
python3 server.py

```

### Step 6: Access the Web UI

Once the server is running, open a web browser and visit:

```
http://<pi-ip-address>:5000 
```

### What You Will Do on the Web UI:
- Choose the vision task (e.g., object detection, pose estimation).
- Upload the relevant files for the selected task.
- View the results directly on the web interface.
This setup provides a user-friendly interface for interacting with the Hailo device for various vision tasks.


