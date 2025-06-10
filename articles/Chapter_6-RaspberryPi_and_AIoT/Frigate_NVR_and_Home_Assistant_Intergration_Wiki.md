
---
sidebar_position: 5
---

# Frigate NVR and Home Assistant Integration Wiki

## 🌍 Introduction

Frigate NVR is an open-source Network Video Recorder (NVR) designed specifically for real-time object detection using AI models. It is lightweight, powerful, and works seamlessly with cameras via the RTSP protocol.

Home Assistant (HA) is an open-source platform for smart home automation that enables you to control and automate devices in your home.

In this guide, we'll walk you through how to install **Frigate on a reComputer AI box** equipped with **Hailo PCIe**, and how to connect it to your existing **Home Assistant** setup using **MQTT** with minimal hassle.

---
## 🛠️ Install Hailo PCIe Driver

### Step 1: Enable PCIe Gen 3 Mode

```bash
sudo apt update
sudo raspi-config
```

* Navigate to `6 Advanced Options > A8 PCIe Speed`
* Select `Yes` to enable PCIe Gen 3
* Exit and select `Finish`
  
![object detection](../../pictures/Chapter6/pcie.png)

Append the following line to the end of `/boot/firmware/config.txt`:

```ini
dtoverlay=pciex1-compat-pi5,no-mip
```

### Step 2: Install PCIe Driver

```bash
sudo apt update
sudo apt install dkms
```

```bash
git clone https://github.com/hailo-ai/hailort-drivers
cd hailort-drivers/linux/pcie
git checkout 24e7ff2fb58fab7029024c1a1d3f2d1914f56d7b
sudo make install_dkms
```

### Step 3: Install Firmware

```bash
cd ../..
./download_firmware.sh
sudo mkdir -p /lib/firmware/hailo
sudo cp hailo8_fw*.bin /lib/firmware/hailo/hailo8_fw.bin
```

### Step 4: Fix PCIe Descriptor Size Issue

Create `/etc/modprobe.d/hailo_pci.conf` with this content:

```bash
options hailo_pci force_desc_page_size=4096
```

### Step 5: Reboot and Verify

```bash
sudo reboot
ls /dev/hailo*
```

Expected output:

```bash
/dev/hailo0
```

---

## 🚧 Install Frigate NVR with Docker

### Prerequisites

Make sure your camera is configured for RTSP streaming at 1920x1080 resolution.

### Update System

```bash
sudo apt update
```

### Install Docker

```bash
curl -fsSL get.docker.com | bash
sudo usermod -aG docker $USER
sudo reboot
```

### Pull Frigate Image

```bash
docker pull ghcr.io/blakeblackshear/frigate:0.15.0-rc2-h8l
```

### Create Directory Structure

```bash
mkdir -p ~/frigate/config
mkdir -p ~/frigate/data/db
mkdir -p ~/frigate/data/storage
cd ~/frigate
```


### Create Docker Compose File (frigate.yml)

```bash
nano frigate.yml
```

```yaml
services:
  frigate-hailo:
    container_name: frigate-hailo
    privileged: true
    restart: unless-stopped
    image: ghcr.io/blakeblackshear/frigate:0.15.0-rc2-h8l
    shm_size: 1024mb
    devices:
      - /dev/hailo0:/dev/hailo0
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./config/:/config
      - ./data/db/:/data/db
      - ./data/storage:/media/frigate
      - type: tmpfs
        target: /tmp/cache
        tmpfs:
          size: 1g
    ports:
      - 5000:5000
```
### Create Frigate Config File (config/config.yml)

```bash
nano config/config.yml
```

```yaml
database:
  path: /data/db/frigate.db

go2rtc:
  streams:
    home:
      - rtsp://admin:passw0rd@192.168.98.11:554/cam/realmonitor?channel=1&subtype=0

cameras:
  home:
    ffmpeg:
      inputs:
        - path: rtsp://admin:passw0rd@192.168.98.11:554/cam/realmonitor?channel=1&subtype=0
          roles:
            - record
            - detect

mqtt:
  enabled: False

objects:
  track:
    - person
    - cat

detectors:
  hailo8l:
    type: hailo8l
    device: PCIe

model:
  width: 300
  height: 300
  model_type: ssd
  path: /config/model_cache/h8l_cache/ssd_mobilenet_v1.hef

version: 0.15-1
```

### Start Frigate

```bash
docker compose -f frigate.yml up -d
```

### Access Web UI

Visit: `http://<your-device-ip>:5000`

---

![frigate](../../pictures/Chapter6/frigate_web.png)

## 🌟 Home Assistant Integration

### Step 1: HACS Setup

Assuming you're running Home Assistant (HA Green, HA Yellow, or similar standalone devices):

* Install [HACS](https://hacs.xyz/docs/setup/download) if not already installed.
* In HACS, install the **Frigate integration** from the community store.

![frigate](../../pictures/Chapter6/HACS.png)

* Configure it using the IP and port of your Frigate AI box, e.g.:

```
http://<ai_box_ip>:5000
```

![config_fri](../../pictures/Chapter6/config_frigate.PNG)


### Step 2: Install MQTT Add-on

Follow the [official MQTT integration guide](https://www.home-assistant.io/integrations/mqtt/) to install and configure the MQTT broker add-on.

### Step 3: Update Frigate Config for MQTT


### Step 3: Update Frigate Config for MQTT

```yaml
mqtt:
  host: <HA IP>
  port: 1883
  topic_prefix: frigate
  client_id: frigate
  user: <HA User Name>
  password: <HA Password>
```

Example:

```yaml
mqtt:
  host: 10.0.0.136
  port: 1883
  topic_prefix: frigate
  client_id: frigate
  user: kasun
  password: HiezenburgCook
```

full example :

```yaml
database:
  path: /data/db/frigate.db

go2rtc:
  streams:
    home:
      - rtsp://admin:12345678a@10.0.0.108:554/cam/realmonitor?channel=1&subtype=0

cameras:
  home:
    ffmpeg:
      inputs:
        - path: rtsp://admin:12345678a@10.0.0.108:554/cam/realmonitor?channel=1&subtype=0
          roles:
            - record
            - detect

mqtt:
  host: core-mosquitto
  port: 1883
  topic_prefix: frigate
  client_id: frigate
  user: kasun
  password: HiezenburgCook

objects:
  track:
    - person
    - cat

detectors:
  hailo8l:
    type: hailo8l
    device: PCIe

model:
  width: 300
  height: 300
  model_type: ssd
  path: /config/model_cache/h8l_cache/ssd_mobilenet_v1.hef

version: 0.15-1


```

### Step 4: Restart Frigate

```bash
docker compose -f frigate.yml down
sudo docker compose -f frigate.yml up -d
```

### Step 5: Confirm MQTT is Working (optional)

* Check HA logs or MQTT add-on logs to verify messages from Frigate
* In HA, you can now use Frigate events in automations, e.g., motion alerts, detected objects, etc.

---

![config_fri](../../pictures/Chapter6/HAinterface.PNG)




