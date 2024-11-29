---
sidebar_position: 3
---
# Smart Retail with reComputerR11 and AI kit

![](../../pictures/Chapter6/smart_retail.png)

This project demonstrates how to use the reComputer R11 and AI Kit to enhance your store, making it smarter and more efficient. 

We retrained the YOLOv8n model to detect Coca-Cola, chips, crackers, crisps, milk, and popcorn. The model is deployed on the AI Kit to monitor the inventory of these items on shelves, notifying store staff when restocking is needed. Additionally, we utilized a pre-trained EfficientNet model to detect people in the warehouse. This model, deployed on the CPU in TFLite format, helps prevent theft by identifying unauthorized intrusions.

Beyond inventory and security, we integrated environmental monitoring using temperature and humidity sensors. A ReSpeaker was added to emit alerts when intrusions are detected, notifying security personnel. Furthermore, we connected fans and lighting through RS485 for convenient operation by staff.

All data and controls are consolidated into a Node-RED dashboard, providing an intuitive interface for monitoring and managing store operations effectively.

## First : Set your environment
