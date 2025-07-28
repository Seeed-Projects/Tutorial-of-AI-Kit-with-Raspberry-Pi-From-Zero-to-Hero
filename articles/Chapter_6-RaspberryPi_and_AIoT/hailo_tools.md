---
sidebar_position: 8
---

# Hailo Toolbox Quick Start Guide

This document will introduce how to install and use the [Hailo Toolbox](https://github.com/Seeed-Projects/hailo_toolbox), a comprehensive toolkit designed for deep learning model conversion and inference. This guide contains complete instructions from basic installation to advanced usage.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Verify Installation](#verify-installation)
- [Project Structure](#project-structure)
- [Model Conversion](#model-conversion)
- [Model Inference](#model-inference)

## System Requirements

### Basic Requirements
- **Python Version**: 3.8 ≤ Python < 3.12
- **Operating System**: Linux (Ubuntu 18.04+ recommended), Windows 10+
- **Memory**: At least 8GB RAM (16GB+ recommended)
- **Storage**: At least 2GB available space

### Hailo-Specific Requirements
- **[Hailo Dataflow Compiler](https://hailo.ai/developer-zone/software-downloads/)**: For model conversion functionality (required if using conversion features, X86 architecture and Linux only), refer to [installation tutorial](https://wiki.seeedstudio.com/tutorial_of_ai_kit_with_raspberrypi5_about_yolov8n_object_detection/)
- **[HailoRT](https://hailo.ai/developer-zone/software-downloads/)**: For inference functionality (required when using inference features), refer to [installation tutorial](https://wiki.seeedstudio.com/benchmark_on_rpi5_and_cm4_running_yolov8s_with_rpi_ai_kit/)
- **Hailo Hardware**: For hardware-accelerated inference (required when using inference features)

### Python Dependencies
Core dependency packages will be automatically installed:
```
opencv-python>=4.5.0
numpy<2.0.0
requests>=2.25.0
matplotlib>=3.3.0
onnx
onnxruntime
pillow
pyyaml
tqdm
```

## Installation

### Method 1: Install from Source (Recommended)

```bash
# Clone project source code
git clone https://github.com/Seeed-Projects/hailo_toolbox.git

# Enter project directory
cd hailo_toolbox

# Install project (development mode)
pip install -e .

# Or install directly
pip install .
```

### Method 2: Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv hailo_env

# Activate virtual environment
# Linux/macOS:
source hailo_env/bin/activate
# Windows:
hailo_env\Scripts\activate

# Install project
git clone https://github.com/Seeed-Projects/hailo_toolbox.git
cd hailo_toolbox
pip install -e .
```

## Verify Installation

After installation, verify successful installation with the following commands:

```bash
# Check version information
hailo-toolbox --version

# View help information
hailo-toolbox --help

# View conversion functionality help
hailo-toolbox convert --help

# View inference functionality help
hailo-toolbox infer --help
```

## Model Conversion

Hailo Toolbox supports converting models from various deep learning frameworks to efficient `.hef` format for running on Hailo hardware.

### Supported Model Formats

| Framework | Format | Supported | Target Format | Notes |
|-----------|--------|-----------|---------------|-------|
| ONNX | .onnx | ✅ | .hef | Recommended format |
| TensorFlow | .h5 | ✅ | .hef | Keras models |
| TensorFlow | SavedModel.pb | ✅ | .hef | TensorFlow SavedModel |
| TensorFlow Lite | .tflite | ✅ | .hef | Mobile models |
| PyTorch | .pt (torchscript) | ✅ | .hef | TorchScript models |
| PaddlePaddle | inference model | ✅ | .hef | PaddlePaddle inference models |

### Basic Conversion Commands

```bash
# View conversion help
hailo-toolbox convert --help

# Basic conversion (ONNX to HEF)
hailo-toolbox convert model.onnx --hw-arch hailo8

# Complete conversion example
hailo-toolbox convert model.onnx \
    --hw-arch hailo8 \
    --input-shape 320,320,3 \
    --save-onnx \
    --output-dir outputs \
    --profile \
    --calib-set-path ./calibration_images
```

### Conversion Parameter Details

| Parameter | Required | Default | Description | Example |
|-----------|----------|---------|-------------|---------|
| `model` | ✅ | - | Model file path to convert | `model.onnx` |
| `--hw-arch` | ❌ | `hailo8` | Target Hailo hardware architecture | `hailo8`, `hailo8l`, `hailo15`, `hailo15l` |
| `--calib-set-path` | ❌ | None | Calibration dataset folder path | `./calibration_data/` |
| `--use-random-calib-set` | ❌ | False | Use random data for calibration | - |
| `--calib-set-size` | ❌ | None | Calibration dataset size | `100` |
| `--model-script` | ❌ | None | Custom model script path | `./custom_script.py` |
| `--end-nodes` | ❌ | None | Specify model output nodes | `output1,output2` |
| `--input-shape` | ❌ | `[640,640,3]` | Model input shape | `320,320,3` |
| `--save-onnx` | ❌ | False | Save compiled ONNX file | - |
| `--output-dir` | ❌ | Same as model | Output file save directory | `./outputs/` |
| `--profile` | ❌ | False | Generate performance analysis report | - |

## Model Inference

Hailo Toolbox provides flexible inference interfaces supporting various input sources and output formats.

### Inference Examples

```bash
# View inference help
cd examples

# Basic inference example
python Hailo_Object_Detection.py
```

### Supported Input Source Types

| Input Source Type | Format | Example | Description |
|-------------------|--------|---------|-------------|
| Image files | jpg, png, bmp, etc. | `image.jpg` | Single image inference |
| Image folders | Directory path | `./images/` | Batch image inference |
| Video files | mp4, avi, mov, etc. | `video.mp4` | Video file inference |
| USB cameras | Device ID | `0`, `1` | Real-time camera inference |
| IP cameras | RTSP/HTTP stream | `rtsp://ip:port/stream` | Network camera inference |
| Network video streams | URL | `http://example.com/stream` | Online video stream inference |

### Code Explanation

To help with understanding:

```python
from hailo_toolbox import create_source     # API for loading image sources
from hailo_toolbox.models import ModelsZoo  # Model library
from hailo_toolbox.process.visualization import DetectionVisualization  # Pre-implemented object detection visualization tool
import cv2  # OpenCV tools

if __name__ == "__main__":
    # Create model input source
    source = create_source(
        "https://hailo-csdata.s3.eu-west-2.amazonaws.com/resources/video/example.mp4"
    )

    # Load YOLOv8n detection model
    # Load yolov8s model under object detection task
    inference = ModelsZoo.detection.yolov8s()
    # Load visualization module
    visualization = DetectionVisualization()

    # Read image source frame by frame
    for img in source:
        # Pass image to model for inference prediction, inference module will perform corresponding preprocessing and postprocessing based on model configuration, and wrap processing results into directly usable data
        results = inference.predict(img)
        # Get inference results for each image sequentially, model accepts multiple images for simultaneous inference, so returned results are processing results for each image
        for result in results:
            # Visualize inference results
            img = visualization.visualize(img, result)
            cv2.imshow("Detection", img)
            cv2.waitKey(1)
            # print(f"Detected {len(result)} objects")
            # Get predicted bounding boxes for current image
            boxes = result.get_boxes()
            # Get predicted confidence scores for current image
            scores = result.get_scores()
            # Get predicted class IDs for current image
            class_ids = result.get_class_ids()

            # Show first 5 detection results
            for i in range(min(5, len(result))):
                print(
                    f"  Object{i}: bbox{boxes[i]}, score{scores[i]:.3f}, class{class_ids[i]}"
                )
            print("---")
``` 
