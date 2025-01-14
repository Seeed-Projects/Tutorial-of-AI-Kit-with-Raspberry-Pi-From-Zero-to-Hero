---
sidebar_position: 1
---

# Running AI Tasks with Hailo -With AI Kit 


## Introduction 

In the last chapter, we showed you how to set up the Raspberry Pi for various AI tasks. In this chapter, we will discuss how to perform **object detection and pose estimation** using the Hailo environment.

If you haven't set up your device yet, please follow the [previous tutorial](https://seeed-projects.github.io/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/docs/Chapter_2-Configuring_the_RaspberryPi_Environment/Introduction_to_Hailo_in_Raspberry_Pi_Environment) first and then return to this one.

The Hailo Model Zoo is a collection of pre-trained models using the **COCO dataset** for 80 classes. You can find various models trained by the Hailo team. In this tutorial, we will test **YOLOv8**, but you can explore other models, each with different architectures. The Hailo Model Zoo provides pre-trained models for high-performance deep learning applications.

Hailo provides different pre-trained models in ONNX/TF formats, as well as pre-compiled HEF (Hailo Executable Format) binary files to execute on Hailo devices.

Link to [Model Zoo](https://github.com/hailo-ai/hailo_model_zoo) 

In this tutorial, we will demonstrate object detection and pose estimation in the Hailo environment.

## Object Detection



- Clone the repository:

```bash
git clone https://github.com/Seeed-Projects/Benchmarking-YOLOv8-on-Raspberry-PI-reComputer-r1000-and-AIkit-Hailo-8L.git
```
- Navigate to directory 

```bash
cd Benchmarking-YOLOv8-on-Raspberry-PI-reComputer-r1000-and-AIkit-Hailo-8L
```

- Run object detection:

```bash
bash ./run.sh object-detection-hailo
```
![object detection](../../pictures/Chapter3/object_detection_with_AIkit.gif)

We measured the inference speed of YOLOv8 for object detection with a **640×640** input resolution using the AI kit. With Hailo acceleration, it reached **29.5** FPS.

## Pose Estimation

- Clone the repository (if not already):

```bash
git clone https://github.com/Seeed-Projects/Benchmarking-YOLOv8-on-Raspberry-PI-reComputer-r1000-and-AIkit-Hailo-8L.git
```

- Navigate to directory 

```bash
cd Benchmarking-YOLOv8-on-Raspberry-PI-reComputer-r1000-and-AIkit-Hailo-8L
```

- Run object detection:

```bash
bash run.sh pose-estimation-hailo
```
![pose estimation](../../pictures/Chapter3/YOLOv8-pose-estimation-with-AIkit.gif)

The inference speed of YOLOv8 for pose estimation with a **640×640** input resolution using Hailo acceleration and the AI kit reached **27** FPS.



