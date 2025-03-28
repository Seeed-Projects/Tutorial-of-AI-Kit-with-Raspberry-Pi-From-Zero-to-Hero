---
sidebar_position: 8
---

# Distributed Inference of DeepSeek model on Raspberry Pi

## Introduction

This wiki explains how to deploy the [DeepSeek](https://github.com/deepseek-ai/DeepSeek-LLM) model on Multiple Raspberry Pi AI Boxs with [distributed-llama](https://github.com/b4rtaz/distributed-llama).In this wiki, I used a **Raspberry Pi with 8GB of RAM** as the **root node** and **three Raspberry Pis with 4GB of RAM** as **worker nodes** to run the **DeepSeek 8B model**. The inference speed reached **6.06 tokens per second**.

## Prepare Hardware

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

## Prepare software

### update the system:

Open one terminal with `Ctrl+Alt+T` and input command like below:

```
sudo date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d' ' -f5-8)Z"
sudo apt update
sudo apt full-upgrade
```

### Install ditributed llama to your root and worker node

Open one terminal with `Ctrl+Alt+T` and input command like below to install [distributed-llama](https://github.com/b4rtaz/distributed-llama.git):

```
git clone https://github.com/b4rtaz/distributed-llama.git
cd distributed-llama
make dllama
make dllama-api
```

### Run on your woker node

Then input command like below to make worker nodes working:

```
cd distributed-llama
sudo nice -n -20 ./dllama worker --port 9998 --nthreads 4
```

### Run on your root node

#### Creat and activate python vitural environment

```
cd distributed-llama
python -m venv .env
source .env/bin/acitvate
```

#### Install necessary lib

```
pip install numpy==1.23.5
pip install tourch=2.0.1
pip install safetensors==0.4.2
pip install sentencepiece==0.1.99
pip install transformers
```

#### Install deepseek 8b q40 model

```
sudo mkdir model && cd model
git lfs install
git clone https://huggingface.co/b4rtaz/Llama-3_1-8B-Q40-Instruct-Distributed-Llama
```

#### Run distributed inference on root node

> **Note:** `--workers 10.0.0.139:9998 10.0.0.175:9998 10.0.0.124:9998` is the IP of the workers.

```
cd ..
./dllama chat --model ./model/dllama_model_deepseek-r1-distill-llama-8b_q40.m --tokenizer ./model/dllama_tokenizer_deepseek-r1-distill-llama-8b.t  --buffer-float-type q80 --prompt "What is 5 plus 9 minus 3?" --nthreads 4 --max-seq-len 2048 --workers 10.0.0.139:9998 10.0.0.175:9998 10.0.0.124:9998  --steps 256

```

> **Note:** If you want to test the inference speed, please use the following command.

```
cd ..
./dllama inference --model ./model/dllama_model_deepseek-r1-distill-llama-8b_q40.m --tokenizer ./model/dllama_tokenizer_deepseek-r1-distill-llama-8b.t  --buffer-float-type q80 --prompt "What is 5 plus 9 minus 3?" --nthreads 4 --max-seq-len 2048 --workers 10.0.0.139:9998 10.0.0.175:9998 10.0.0.124:9998  --steps 256
```

## Result

The following is the inference of the [DeepSeek Llama 8b](https://huggingface.co/b4rtaz/Llama-3_1-8B-Q40-Instruct-Distributed-Llama) model using 4 the Raspberry Pi.


<div align="center">
    <img width={900} 
     src="https://files.seeedstudio.com/wiki/distributed-inference/distributed_llama.gif" />
</div>

