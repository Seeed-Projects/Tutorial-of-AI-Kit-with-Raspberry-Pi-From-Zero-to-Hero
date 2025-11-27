---
sidebar_position: 4
---

# Accelerating the MediaPipe models with Hailo NPU

## Overview

[MediaPipe](https://github.com/google-ai-edge/mediapipe) is an open-source framework created by Google for constructing machine learning pipelines that handle time-series data, including video and audio. It provides customizable solutions for a wide range of applications, particularly in computer vision and on-device machine learning tasks.

This article outlines the process of deploying a MediaPipe model on an AI Box to enhance hand detection, gesture landmarks, and face landmarks.

## Prepare Hardware

> **Note:** 
> Please connect a USB camera to the AI Box.

<div class="table-center">
	<table align="center">
	<tr>
		<th>reComputer AI R2130</th>
	</tr>
    <tr>
      <td><div style={{textAlign:'center'}}><img src="https://media-cdn.seeedstudio.com/media/catalog/product/cache/bb49d3ec4ee05b6f018e93f896b8a25d/1/_/1_24_1.jpg" style={{width:600, height:'auto'}}/></div></td>
    </tr>
		<tr>
			<td><div class="get_one_now_container" style={{textAlign: 'center'}}>
				<a class="get_one_now_item" href="https://www.seeedstudio.com/reComputer-AI-R2130-12-p-6368.html">
				<strong><span><font color={'FFFFFF'} size={"4"}> Get One Now 🖱️</font></span></strong>
				</a>
			</div></td>
		</tr>
	</table>
</div>


## Install Hailo Software & Verify Installation

### update the system:

```
sudo apt update
sudo apt full-upgrade
```

:::note
Sometimes you may encounter the following issues during updates.
```
Get:1 http://deb.debian.org/debian bookworm InRelease [151 kB]
Get:2 http://deb.debian.org/debian-security bookworm-security InRelease [48.0 kB]
Get:3 http://deb.debian.org/debian bookworm-updates InRelease [55.4 kB]
Get:4 http://archive.raspberrypi.com/debian bookworm InRelease [39.0 kB]
Reading package lists... Done                                   
E: Release file for http://deb.debian.org/debian/dists/bookworm/InRelease is not valid yet (invalid for another 58d 8h 26min 35s). Updates for this repository will not be applied.
E: Release file for http://deb.debian.org/debian-security/dists/bookworm-security/InRelease is not valid yet (invalid for another 84d 18h 23min 59s). Updates for this repository will not be applied.
E: Release file for http://archive.raspberrypi.com/debian/dists/bookworm/InRelease is not valid yet (invalid for another 84d 13h 13min 5s). Updates for this repository will not be applied.
E: Release file for http://deb.debian.org/debian/dists/bookworm-updates/InRelease is not valid yet (invalid for another 85d 0h 52min 29s). Updates for this repository will not be applied.	
```
This is because the time on the Raspberry Pi is set incorrectly, and you need to manually set the time on the Raspberry Pi with command below:
```
# This command only you can connect google.com
sudo date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d' ' -f5-8)Z"
```
After set your raspberry time, you can update your raspberry.
:::

### Set pcie to gen2/gen3(gen3 is faster than gen2):

Add following text to ```/boot/firmware/config.txt```

```bash
# Enable the PCIe external connector

dtparam=pciex1

# Force Gen 3.0 speeds

dtparam=pciex1_gen=3

```
:::note
If you want to use gen2, please comment dtparam=pciex1_gen=3
:::

### Install hailo-all and reboot:

Open terminal on the AI Box, and input command as follows to install Hailo software.

```
sudo apt install hailo-all
sudo apt-get -y install libblas-dev nlohmann-json3-dev
sudo reboot
```
### Check Software and Hardware:

Open terminal on the AI Box, and input command as follows to check if hailo-all have been installed.

```
hailortcli fw-control identify
```

The right result show as bellow:
<p style={{textAlign: 'center'}}><img src="https://files.seeedstudio.com/wiki/reComputer-R1000/YOLOV8/check_software.png" alt="pir" width={1000} height="auto"/></p>

Open terminal on the AI Box, and input command as follows to check if hailo-8L have been connected.

```
lspci | grep Hailo
```

The right result show as bellow:
<p style={{textAlign: 'center'}}><img src="https://files.seeedstudio.com/wiki/reComputer-R1000/YOLOV8/check_hardware.png" alt="pir" width={1000} height="auto"/></p>

## Run Project

### Install Project

```
git clone https://github.com/AlbertaBeef/blaze_app_python
```

### Install the hailo model

Input the command below you will download the model:

```
cd blaze_app_python

sudo chmod 755 ./blaze_hailo/models/get_hailo8_models.sh

./blaze_hailo/models/get_hailo8_models.sh

unzip ./blaze_hailo/models/blaze_hailo8_models.zip

mv ./blaze_hailo/models/hailo8/* ./blaze_hailo/models/   
```

### Install necessary lib

```
python -m venv .env && source .env/bin/activate
pip install numpy opencv-python plotly
```

### Run the project

```
cd ./blaze_hailo
python blaze_detect_live.py --blaze hand -f
```

## Result 

Coming soon...