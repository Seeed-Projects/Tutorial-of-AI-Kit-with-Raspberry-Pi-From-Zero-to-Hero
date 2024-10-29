---



sidebar_position: 2



---







> You can get this [Notebook](https://github.com/Seeed-Projects/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/blob/main/articles/Chapter%205%20-%20Custom%20Model%20Development%20and%20Deployment/Convert%20Your%20Model.ipynb) on GitHub.





## Step 1: Prepare your environment on your host computer







**Note: This part of code run on your host computer**







The Jupyter Notebook right up have a button like ![select kernel](../../pictures/Chapter5/select_kernel.png), then you choose ```Select Another Kernel```, and choose ```Python Environments```, then choose ```Creat Python Environment``` and choose ```Venv```, then choose ```python3.10```.




```python
# Here is my hostcomputer information
# Linux PC 6.8.0-45-generic #45~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Wed Sep 11 15:25:05 UTC 2 x86_64 x86_64 x86_64 GNU/Linux

!uname -a
```



```python
# Here is my python version
# Python 3.10.12

!python -V
```



```python
# Download gdown to install software from google driver, if you see 'install successfully' it means you install libs successfully, or when you see 'install error' it means you install libs unsuccessfully
try:
    %pip install gdown -q
    print('install successfully')
except:
    print('install error')
```



```python
# Install hailo_dataflow_compiler-3.28.0-py3-none-linux_x86_64.whl from google driver


!gdown https://drive.google.com/uc?id=1BbEbNIrmAJkzc5Lrgcji92Nskx6gbJ_X -O ../resource/
```



```python
# Install HailoDFC to compile the model
try:
    %pip install ../resource/hailo_dataflow_compiler-3.28.0-py3-none-linux_x86_64.whl -q
    print('install successfully')
except:
    print('install error')
```




## Step 2: Open [Netron](https://netron.app/)







For parsing ONNX model, we should find the input node and output node from computational graph, open faster_rcnn.onnx from [netron](https://netron.app/):







The below image show that the input node name is ```/model.0/conv/Conv```







![yolov11n_1](../../pictures/Chapter5/yolov11n_1.png)







The below image show that the output node name is ```/model.23/Concat_5```







![yolov11n_2](../../pictures/Chapter5/yolov11n_2.png)





## Step 3: Parse the model







Hailo Archive is a tar.gz archive file that captures the "state" of the model - the files and attributes used in a given stage from parsing to compilation. Use the save_har method to save the runner's state in any stage and load_har method to load a saved state to an uninitialized runner.







The initial HAR file includes:







HN file, which is a JSON-like representation of the graph structure that is deployed to the Hailo hardware.



NPZ file, which includes the weights of the model.




```python
import tensorflow as tf
from IPython.display import SVG

# import the ClientRunner class from the hailo_sdk_client package
from hailo_sdk_client import ClientRunner
```




```python
# Define the model name and onnx model path
onnx_model_name = "yolov11n"
onnx_path = "../models/Chapter5/best.onnx"
```



**Note: Sometimes for complex model like yolo the end node is not the last node we parse, so please check [parse guild](https://community.hailo.ai/t/parsing-yolo-models-with-the-hailo-dataflow-compiler-tool/2384) for more information.**




```python
# AI kit chip is hailo8l, so we choose hailo8l as hardware arch
chosen_hw_arch = "hailo8l"

runner = ClientRunner(hw_arch=chosen_hw_arch)
hn, npz = runner.translate_onnx_model(
    onnx_path,
    onnx_model_name,
    start_node_names=["/model.0/conv/Conv"], # the name of input node
    end_node_names=["/model.23/cv2.0/cv2.0.2/Conv", "/model.23/cv3.0/cv3.0.2/Conv", 
                    "/model.23/cv2.1/cv2.1.2/Conv", "/model.23/cv3.1/cv3.1.2/Conv", 
                    "/model.23/cv2.2/cv2.2.2/Conv", "/model.23/cv3.2/cv3.2.2/Conv"], # the name of output node
    net_input_shapes={"/model.0/conv/Conv": [1, 3, 640, 640]}, # input shape
)
```



```python
# Save to har model

hailo_model_har_name = f"../models/Chapter5/{onnx_model_name}_hailo_model.har"
runner.save_har(hailo_model_har_name)
```



```python
# Use hailo command to parse the model

!hailo visualizer ../models/Chapter5/{onnx_model_name}_hailo_model.har 
```




## Step 4: Model Optimization







The input is a HAR file in Hailo Model state (before optimization; with native weights) and the output will be a quantized HAR file with quantized weights.




```python
# General imports used throughout the tutorial
# file operations
import json
import os

import numpy as np
import tensorflow as tf
from IPython.display import SVG
from matplotlib import patches
from matplotlib import pyplot as plt
from PIL import Image
from tensorflow.python.eager.context import eager_mode

# import the hailo sdk client relevant classes
from hailo_sdk_client import ClientRunner, InferenceContext

%matplotlib inline

IMAGES_TO_VISUALIZE = 5
```


```python
# The folder of images
image_dir = './images'
image_files = [f for f in os.listdir(image_dir) if f.endswith(('.png', '.jpg', '.jpeg'))]

# Init the list
images = []

# Load every images
for image_file in image_files:
    img_path = os.path.join(image_dir, image_file)
    img = Image.open(img_path).convert('RGB')  # Transform to RGB format
    img_array = np.array(img)  # Transform to NumPy format
    images.append(img_array)

# Transform images to NumPy array
images_array = np.array(images)
```


```python
# Load our parsed HAR model

assert os.path.isfile(hailo_model_har_name), "Please provide valid path for HAR file"
runner = ClientRunner(har=hailo_model_har_name, hw_arch=chosen_hw_arch)
# By default it uses the hw_arch that is saved on the HAR. For overriding, use the hw_arch flag.
```


```python
# Call Optimize to perform the optimization process
runner.optimize(images_array)

# Save the result state to a Quantized HAR file
quantized_model_har_path = f"../models/Chapter5/{onnx_model_name}_quantized_model.har"
runner.save_har(quantized_model_har_path)
```






## Step 5: Compile Hailo Archive Quantized Model to HEF




```python
runner = ClientRunner(har=quantized_model_har_path, hw_arch=chosen_hw_arch)
```


```python
hef = runner.compile()

file_name = f"../models/Chapter5/{onnx_model_name}.hef"

with open(file_name, "wb") as f:
    f.write(hef)
```

