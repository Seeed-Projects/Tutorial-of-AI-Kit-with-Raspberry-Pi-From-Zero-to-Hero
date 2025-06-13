# Hailo Toolbox Inference Tutorial

This comprehensive tutorial will guide you through running inference with the Hailo Toolbox framework. The toolbox supports both Hailo (.hef) and ONNX models with various input sources and customizable processing pipelines.

## Table of Contents

- [Installation and Configuration](#installation-and-configuration)
- [Basic Usage](#basic-usage)
- [Command Line Arguments](#command-line-arguments)
- [Inference Command](#inference-command)
- [Input Source Types](#input-source-types)
- [Callback Functions](#callback-functions)
- [Practical Usage Examples](#practical-usage-examples)

## Installation and Configuration

### Installation

Ensure you have installed the Hailo Toolbox:

```bash
git clone https://github.com/Seeed-Projects/hailo_toolbox
pip install -e .
```

### Verify Installation

Check version information:

```bash
hailo-toolbox --version
```

## Basic Usage

### Command Structure

Hailo Toolbox CLI uses a subcommand structure:

```bash
hailo-toolbox <subcommand> [arguments]
```

Supported subcommands:
- `infer`: Model inference
- `convert`: Model conversion

### Simple Inference Example

Run inference on a video file:

```bash
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source sources/test.mp4
```

## Command Line Arguments

### Global Arguments

#### Version Information
- `--version` / `-v` / `-V`: Display version information and exit
  ```bash
  hailo-toolbox --version
  ```

## Inference Command

### Basic Syntax

```bash
hailo-toolbox infer <model_path> -c <callback> --source <input_source> [OPTIONS]
```

### Required Arguments

#### model (positional argument)
- **Purpose**: Specify the path to the model file
- **Type**: String
- **Supported formats**: .hef and .onnx formats
- **Examples**:
  ```bash
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4
  hailo-toolbox infer models/yolov8n.onnx -c yolov8det --source video.mp4
  ```

#### --callback / -c (required)
- **Purpose**: Specify callback function name for custom processing and visualization
- **Type**: String
- **Required**: Yes
- **Common values**: `yolov8det`, `yolov8seg`, `yolov8pose`
- **Examples**:
  ```bash
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4
  hailo-toolbox infer models/yolov8n_seg.hef -c yolov8seg --source video.mp4
  ```

#### --source / -s (required)
- **Purpose**: Specify input source (video file, image file, folder, or camera)
- **Type**: String
- **Required**: Yes
- **Supported formats**:
  - Video files: `.mp4`, `.avi`, `.mov`, `.mkv`, etc.
  - Image files: `.jpg`, `.png`, `.bmp`, `.tiff`, etc.
  - Image folders: Directory containing image files
  - Cameras: `0`, `1` (device ID)
  - IP cameras: `rtsp://...`
- **Examples**:
  ```bash
  # Video file
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4
  
  # Image file
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source image.jpg
  
  # Image folder
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source images/
  
  # Webcam
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source 0
  ```

### Optional Arguments

#### --save / -sv
- **Purpose**: Save output video (flag parameter)
- **Type**: Boolean flag
- **Default**: False
- **Example**:
  ```bash
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4 --save
  ```

#### --save-path / -sp
- **Purpose**: Specify path to save output video
- **Type**: String
- **Default**: Auto-generated
- **Example**:
  ```bash
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4 --save --save-path output/result.mp4
  ```

#### --show / -sh
- **Purpose**: Display output video in real-time (flag parameter)
- **Type**: Boolean flag
- **Default**: False
- **Example**:
  ```bash
  hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4 --show
  ```

## Input Source Types

### Supported Input Sources

1. **Video Files**
   - Formats: MP4, AVI, MOV, MKV, WMV, etc.
   - Example: `--source video.mp4`

2. **Image Files**
   - Formats: JPG, PNG, BMP, TIFF, WEBP, etc.
   - Example: `--source image.jpg`

3. **Image Folders**
   - Format: Directory path containing image files
   - Example: `--source images/`
   - Processes all supported image files in the directory

4. **USB Cameras**
   - Format: Device ID (integer)
   - Example: `--source 0` (default camera)

5. **IP Cameras**
   - Format: RTSP stream address
   - Example: `--source rtsp://username:password@ip:port/stream`

## Callback Functions

### Built-in Callback Functions

- `yolov8det`: YOLOv8 object detection
- `yolov8seg`: YOLOv8 semantic segmentation
- `yolov8pose`: YOLOv8 pose estimation

### Callback Function Responsibilities

Callback functions handle:
- **Preprocessing**: Input data preparation
- **Postprocessing**: Model output processing
- **Visualization**: Result rendering and display

## Practical Usage Examples

### 1. Object Detection - Video Processing

```bash
# Basic detection
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4

# Detection with saved results
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4 --save --save-path output/detection_result.mp4

# Real-time display of detection results
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source video.mp4 --show
```

### 2. Object Detection - Image Processing

```bash
# Process single image
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source image.jpg --save

# Process image folder
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source images/ --save

# Batch process with custom output path
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source images/ --save --save-path output/
```

### 3. Semantic Segmentation

```bash
# Segmentation task
hailo-toolbox infer models/yolov8n_seg.hef -c yolov8seg --source video.mp4 --show

# Save segmentation results
hailo-toolbox infer models/yolov8n_seg.hef -c yolov8seg --source video.mp4 --save --save-path output/segmentation_result.mp4

# Process image folder for segmentation
hailo-toolbox infer models/yolov8n_seg.hef -c yolov8seg --source images/ --save
```

### 4. Pose Estimation

```bash
# Pose detection
hailo-toolbox infer models/yolov8s_pose.hef -c yolov8pose --source video.mp4 --show

# Save pose detection results
hailo-toolbox infer models/yolov8s_pose.hef -c yolov8pose --source video.mp4 --save --save-path output/pose_result.mp4

# Process image folder for pose estimation
hailo-toolbox infer models/yolov8s_pose.hef -c yolov8pose --source images/ --save
```

### 5. Real-time Camera Inference

```bash
# Use default camera for real-time detection
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source 0 --show

# Use secondary camera
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source 1 --show
```

### 6. IP Camera Inference

```bash
# Process RTSP stream
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source rtsp://192.168.1.100:554/stream --show
```

### 7. ONNX Model Inference

```bash
# Use ONNX model
hailo-toolbox infer models/yolov8n.onnx -c yolov8det --source video.mp4 --save
```

### 8. Batch Processing Script

Create a batch processing script for multiple files:

```bash
#!/bin/bash
# batch_inference.sh

MODEL="models/yolov8n.hef"
CALLBACK="yolov8det"
INPUT_DIR="input_videos"
OUTPUT_DIR="output_results"

mkdir -p "$OUTPUT_DIR"

for video in "$INPUT_DIR"/*.mp4; do
    filename=$(basename "$video" .mp4)
    echo "Processing $filename..."
    
    hailo-toolbox infer "$MODEL" \
        -c "$CALLBACK" \
        --source "$video" \
        --save \
        --save-path "$OUTPUT_DIR/${filename}_result.mp4"
done

echo "Batch processing completed!"
```

### 9. Folder Processing Examples

```bash
# Process all images in a folder
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source dataset/images/ --save

# Process folder with custom output directory
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source dataset/test/ --save --save-path results/

# Process folder and display results
hailo-toolbox infer models/yolov8n.hef -c yolov8det --source dataset/demo/ --show
```

## Best Practices

### 1. Model Selection

- Use smaller models (yolov8n) for real-time applications
- Use larger models (yolov8s, yolov8m) for higher accuracy requirements
- Choose task-specific models (detection, segmentation, pose)

### 2. Input Optimization

- Adjust input size to match model input dimensions
- Use appropriate color space (RGB/BGR)
- Maintain consistent input data normalization

### 3. Output Management

- Regularly clean output directories
- Use appropriate compression for saved videos
- Consider storage limitations for long-running processes

### 4. Resource Management

- Monitor system resources during inference
- Use appropriate batch sizes
- Properly clean up resources after processing

## Summary

This tutorial covers the comprehensive usage of the Hailo Toolbox inference system with the latest parameter requirements. The framework provides flexible, high-performance inference capabilities for various deep learning tasks. By following these guidelines and examples, you can effectively leverage the toolbox for your specific use cases.

Note that both `--callback` and `--source` parameters are now required for the inference command, ensuring proper configuration for all inference operations.
