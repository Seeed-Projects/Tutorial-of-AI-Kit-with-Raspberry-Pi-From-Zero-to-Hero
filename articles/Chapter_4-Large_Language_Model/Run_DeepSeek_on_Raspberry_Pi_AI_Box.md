---
sidebar_position: 7
---

# Deploy DeepSeek on Raspberry Pi AI Box

## Introduction

This article explains how to deploy the [DeepSeek](https://github.com/deepseek-ai/DeepSeek-LLM) model on a Raspberry Pi AI Box using the [Ollama](https://ollama.com/) deployment framework. Ollama simplifies the process of installing and running AI models on compact hardware like the Raspberry Pi, handling dependency management and system configuration. In this guide, you will find clear, step-by-step instructions on setting up your environment, installing the necessary software, and launching the DeepSeek model. This resource is aimed at developers and AI enthusiasts who want to harness the power of AI on low-power devices.

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

```
sudo date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d' ' -f5-8)Z"
sudo apt update
sudo apt full-upgrade
```

### Install Ollama 

Open one terminal with `Ctrl+Alt+T` and input command like below to install ollama:

<p style={{textAlign: 'center'}}><img src="https://files.seeedstudio.com/wiki/AI_box_deepseek/install_ollama.png" alt="pir" width={1000} height="auto"/></p>

```
curl -fsSL https://ollama.com/install.sh | sh
```

### Install and run deepseek model

Then input command like below to install and run deepseek 7b model:

<p style={{textAlign: 'center'}}><img src="https://files.seeedstudio.com/wiki/AI_box_deepseek/install_deepseek.png" alt="pir" width={1000} height="auto"/></p>

```
ollama run deepseek-r1
```

## Result

In this demonstration, I used the DeepSeek 1.5b model. You can choose which model to use based on your needs and the capacity of your hardware.

[![Alt text](https://img.youtube.com/vi/qo2iv5RLgbA/0.jpg)](https://www.youtube.com/watch?v=qo2iv5RLgbA)
