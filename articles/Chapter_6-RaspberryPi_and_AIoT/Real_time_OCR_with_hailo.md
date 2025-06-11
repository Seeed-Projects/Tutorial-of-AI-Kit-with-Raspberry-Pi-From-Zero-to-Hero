---
sidebar_position: 7
---

# Introduction

OCR (Optical Character Recognition) is a technology that enables the detection and recognition of text within images, scanned documents, and real-world scenes. It transforms visual text into editable and searchable digital text, supporting various applications such as document digitization, license plate recognition, and scene text detection.

In this project, we use Baidu's PGNet model and deploy it on Seeed Studio's AI Box to achieve real-time OCR functionality.


## Hardware prepare

|                                               Raspberry Pi AI box                                              |                                               reComputer R1100                                               |
| :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| ![Raspberry Pi AI Kit](https://media-cdn.seeedstudio.com/media/catalog/product/cache/bb49d3ec4ee05b6f018e93f896b8a25d/i/m/image114993560.jpeg) | ![reComputer R1100](https://media-cdn.seeedstudio.com/media/catalog/product/cache/bb49d3ec4ee05b6f018e93f896b8a25d/2/-/2-114993595-recomputer-ai-industrial-r2135-12.jpg) |
| [**Purchase Now**](https://www.seeedstudio.com/reComputer-AI-R2130-12-p-6368.html?utm_source=PiAICourse&utm_medium=github&utm_campaign=Course) | [**Purchase Now**](https://www.seeedstudio.com/reComputer-AI-Industrial-R2135-12-p-6432.html?utm_source=PiAICourse&utm_medium=github&utm_campaign=Course) |


## Download the project

```bash
git clone https://github.com/Seeed-Projects/AIbox_pgnet_OCR.git
```

## Prepare Environment

```bash
python -m venv .env --system-site-packages
source .env/bin/activate
pip install -r requirements.txt
```

## Run this project

```bash
python inference_pgnet.py pgnet_640.hef --camera 0
```

## Result

- [OCR_result](../../pictures/Chapter6/ocr_result.png)
