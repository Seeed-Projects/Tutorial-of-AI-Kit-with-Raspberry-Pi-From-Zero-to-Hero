---
sidebar_position: 3
---

# Run Clip Application with Hailo NPU

## Overview

[CLIP](https://github.com/openai/CLIP)(Contrastive Language-Image Pre-Training) is a neural network trained on a variety of (image, text) pairs. It can be instructed in natural language to predict the most relevant text snippet, given an image, without directly optimizing for the task, similarly to the zero-shot capabilities of GPT-2 and 3. We found CLIP matches the performance of the original ResNet50 on ImageNet “zero-shot” without using any of the original 1.28M labeled examples, overcoming several major challenges in computer vision.

This wiki will teach you how to deploy the clip application on a [Raspberry Pi5](https://www.seeedstudio.com/Raspberry-Pi-5-8GB-p-5810.html) or [Recomputer r1000](https://www.seeedstudio.com/reComputer-R1000-Series-Optional-Accessories.html), clip will inference on [AI kit](https://www.seeedstudio.com/Raspberry-Pi-AI-Kit-p-5900.html).


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

```
#Enable the PCIe external connector

dtparam=pciex1

#Force Gen 3.0 speeds

dtparam=pciex1_gen=3

```
:::note
If you want to use gen2, please comment dtparam=pciex1_gen=3
:::

### Install hailo-all and reboot:

Open terminal on the Raspberry Pi5, and input command as follows to install Hailo software.

```
sudo apt install hailo-all
sudo apt-get -y install libblas-dev nlohmann-json3-dev
sudo reboot
```
### Check Software and Hardware:

Open terminal on the Raspberry Pi5, and input command as follows to check if hailo-all have been installed.

```
hailortcli fw-control identify
```

The right result show as bellow:
<p style={{textAlign: 'center'}}><img src="https://files.seeedstudio.com/wiki/reComputer-R1000/YOLOV8/check_software.png" alt="pir" width={1000} height="auto"/></p>

Open terminal on the Raspberry Pi5, and input command as follows to check if hailo-8L have been connected.

```
lspci | grep Hailo
```

The right result show as bellow:
<p style={{textAlign: 'center'}}><img src="https://files.seeedstudio.com/wiki/reComputer-R1000/YOLOV8/check_hardware.png" alt="pir" width={1000} height="auto"/></p>

## Run Project

### Install Project

```
git clone https://github.com/hailo-ai/hailo-CLIP.git
cd hailo-CLIP
python3 -m pip install -v -e .
```

###   Run the project
Input the command below you will see a clip demo:
```
 clip_app --input demo
```
And if you want to use your camera, you should input command below after you make sure raspberry connect your own camera:
```
clip_app --input /dev/video0
```

## Result 

In the video shown below, you can see that when I input "banana," the CLIP model recognizes a banana, and when I input "apple," the model recognizes an apple. You only need to input different words, and the CLIP model will recognize different objects.

<iframe width="800" height="400" src="https://www.youtube.com/embed/JMHtqSmAGCA" title="CLIP Zero Shot Classification on Raspberry Pi 5 with Hailo AI Accelerator" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>