---
sidebar_position: 2
---

# Deploying Custom AI Models Across Applications with Hailo NPU


## Overview


In the previous chapter, we explored the **Hailo Model Zoo**, which provides a range of pre-trained models on the COCO dataset. These models include architectures like YOLOv5, YOLOv8, and MobileNet SSD, catering to various tasks such as pose estimation and object detection. While these models are powerful and useful for many IIoT projects, they are limited to detecting objects defined in the COCO dataset (e.g., people, cars, buses, traffic lights, and elephants). For reference, visit [this site](https://cocodataset.org/#explore) .
However, real-world use cases often require models tailored to specific applications. To address this need, you can create custom models using **transfer learning**, which will be discussed in **Chapter 5**. With transfer learning, you can train models on your unique datasets, enabling you to customize your AI solutions for various projects.

## Custom Applications of YOLOv8n with Transfer Learning

Here are some practical examples of using transfer learning with the **YOLOv8n architecture** for different application domains. These examples demonstrate how tailored models can unlock new possibilities:

### 1. Security and Surveillance 

**Model Purpose**: Detecting vehicle [license plates](../../models/Chapter3/yolov8n_renamed_licenceplate.hef) to enhance parking lot monitoring and identify abnormalities.

**Dataset**: Sourced from Roboflow, this dataset enables the detection of vehicle license plates. The model helps identify suspicious activities and abnormal conditions in parking areas, improving security services.

**Applications**:
- Monitoring unauthorized vehicles.
- Detecting abnormal parking behaviors.
- Enhancing surveillance in high-security zones.

**Example Output**
![license](../../pictures/Chapter3/plate.gif)

### 2. Smart Cities 

**Model Purpose**: [Traffic monitoring](../../models/Chapter3/yolov8n_renamed.hef) for efficient urban management.

**Dataset**: A Roboflow dataset focused on car detection enables the model to monitor traffic effectively. This can be extended to count vehicles, detect traffic violations, and optimize signal timings.

**Applications**:
- Vehicle counting for traffic density analysis.
- Detecting red light violations.
- Optimizing traffic signal operations.

**Example Output**

![car](../../pictures/Chapter3/car.gif)

### 3. Livestock Monitoring

**Model Purpose**: Tracking and monitoring [livestock](../../models/Chapter3/yolov8n_renamed_cow.hef) health and movement using drones and cameras.

**Dataset**: This Roboflow dataset focuses on detecting cows. The model can be extended to indoor and outdoor monitoring scenarios, providing insights into animal behavior and health.

Applications:
- Tracking livestock movements in large farms.
- Monitoring health parameters using additional sensors.
- Enhancing farm productivity with automated data collection.

**Example Output**
![car](../../pictures/Chapter3/cow.gif)

## Next Steps
In **Chapter 5**, we will dive into the details of transfer learning, covering:

- How to prepare custom datasets.
- Fine-tuning pre-trained models.
- Deploying custom models on the Hailo NPU.

By the end of Chapter 5, you’ll be equipped to create and deploy custom AI solutions for any project domain.








