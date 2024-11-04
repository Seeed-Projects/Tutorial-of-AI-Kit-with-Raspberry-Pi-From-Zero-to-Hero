---
sidebar_position: 5
---

# Generative AI (GenAI)

Generative AI is an artificial intelligence system capable of creating new, original content across various mediums such as **text, images, audio, and video**. These systems learn patterns from existing data and use that knowledge to generate novel outputs that didn't previously exist. **Large Language Models (LLMs)**, **Small Language Models (SLMs)**, and **multimodal models** can all be considered types of GenAI when used for generative tasks.

GenAI provides the conceptual framework for AI-driven content creation, with LLMs serving as powerful general-purpose text generators. SLMs adapt this technology for edge computing, while multimodal models extend GenAI capabilities across different data types. Together, they represent a spectrum of generative AI technologies, each with its strengths and applications, collectively driving AI-powered content creation and understanding.

## Large Language Models (LLMs) 

Large Language Models (LLMs) are advanced artificial intelligence systems that understand, process, and generate human-like text. These models are characterized by their massive scale in terms of the amount of data they are trained on and the number of parameters they contain. Critical aspects of LLMs include:

1. **Size**: LLMs typically contain billions of parameters. For example, GPT-3 has 175 billion parameters, while some newer models exceed a trillion parameters.

2. **Training Data**: They are trained on vast amounts of text data, often including books, websites, and other diverse sources, amounting to hundreds of gigabytes or even terabytes of text.

3. **Architecture**: Most LLMs use [transformer-based architectures](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)), which allow them to process and generate text by paying attention to different parts of the input simultaneously.

4. **Capabilities**: LLMs can perform a wide range of language tasks without specific fine-tuning, including:
   - Text generation
   - Translation
   - Summarization
   - Question answering
   - Code generation
   - Logical reasoning

5. **Few-shot Learning**: They can often understand and perform new tasks with minimal examples or instructions.

6. **Resource-Intensive**: Due to their size, LLMs typically require significant computational resources to run, often needing powerful GPUs or TPUs.

7. **Continual Development**: The field of LLMs is rapidly evolving, with new models and techniques constantly emerging.

8. **Ethical Considerations**: The use of LLMs raises important questions about bias, misinformation, and the environmental impact of training such large models.

9. **Applications**: LLMs are used in various fields, including content creation, customer service, research assistance, and software development.

10. **Limitations**: Despite their power, LLMs can produce incorrect or biased information and lack true understanding or reasoning capabilities.

We must note that we use large models beyond text, calling them *multi-modal models*. These models integrate and process information from multiple types of input simultaneously. They are designed to understand and generate content across various forms of data, such as text, images, audio, and video.

Certainly. Let's define open and closed models in the context of AI and language models:

## Closed vs Open Models:

**Closed models**, also called proprietary models, are AI models whose internal workings, code, and training data are not publicly disclosed. Examples: GPT-4 (by OpenAI), Claude (by Anthropic), Gemini (by Google).

**Open models**, also known as open-source models, are AI models whose underlying code, architecture, and often training data are publicly available and accessible. Examples: Gemma (by Google), LLaMA (by Meta) and Phi (by Microsoft)/

Open models are particularly relevant for running models on edge devices like Raspberry Pi as they can be more easily adapted, optimized, and deployed in resource-constrained environments. Still, it is crucial to verify their Licenses. Open models come with various open-source licenses that may affect their use in commercial applications, while closed models have clear, albeit restrictive, terms of service.

![Adapted from https://arxiv.org/pdf/2304.13712](../../pictures/Chapter6/llms-slm.png)

## Small Language Models (SLMs)

In the context of edge computing on devices like Raspberry Pi, full-scale LLMs are typically too large and resource-intensive to run directly. This limitation has driven the development of smaller, more efficient models, such as the Small Language Models (SLMs).

SLMs are compact versions of LLMs designed to run efficiently on resource-constrained devices such as smartphones, IoT devices, and single-board computers like the Raspberry Pi. These models are significantly smaller in size and computational requirements than their larger counterparts while still retaining impressive language understanding and generation capabilities.

Key characteristics of SLMs include:

1. **Reduced parameter count**: Typically ranging from a few hundred million to a few billion parameters, compared to two-digit billions in larger models. 

2. **Lower memory footprint**: Requiring, at most, a few gigabytes of memory rather than tens or hundreds of gigabytes.

3. **Faster inference time**: Can generate responses in milliseconds to seconds on edge devices.

4. **Energy efficiency**: Consuming less power, making them suitable for battery-powered devices.

5. **Privacy-preserving**: Enabling on-device processing without sending data to cloud servers.

6. **Offline functionality**: Operating without an internet connection.

SLMs achieve their compact size through various techniques such as knowledge distillation, model pruning, and quantization. While they may not match the broad capabilities of larger models, SLMs excel in specific tasks and domains, making them ideal for targeted applications on edge devices.

> We will generally consider SLMs, language models with less than 5 billion parameters quantized to 4 bits. 

Examples of SLMs include compressed versions of models like Meta Llama, Microsoft PHI, and Google Gemma. These models enable a wide range of natural language processing tasks directly on edge devices, from text classification and sentiment analysis to question answering and limited text generation. 

For more information on SLMs, the paper, [LLM Pruning and Distillation in Practice: The Minitron Approach](https://arxiv.org/pdf/2408.11796), provides an approach applying pruning and distillation to obtain SLMs from LLMs. And, [SMALL LANGUAGE MODELS: SURVEY, MEASUREMENTS, AND INSIGHTS](https://arxiv.org/pdf/2409.15790), presents a comprehensive survey and analysis of Small Language Models (SLMs), which are language models with 100 million to 5 billion parameters designed for resource-constrained devices. 


## Conclusion

This chapter introduces some basic concepts of large language models. And The potential of running LLMs on the edge extends far beyond simple data processing, as in this lab's examples. Here are some innovative suggestions for using this project:

**1. Smart Home Automation:**

- Integrate SLMs to interpret voice commands or analyze sensor data for intelligent home automation. This could include real-time monitoring and control of home devices, security systems, and energy management, all processed locally without relying on cloud services.

**2. Field Data Collection and Analysis:**

- Deploy SLMs on Raspberry Pi in remote or mobile setups for real-time data collection and analysis. This can be used in agriculture to monitor crop health, in environmental studies for wildlife tracking, or in disaster response for situational awareness and resource management.

**3. Educational Tools:**

- Create interactive educational tools that leverage SLMs to provide instant feedback, language translation, and tutoring. This can be particularly useful in developing regions with limited access to advanced technology and internet connectivity.

**4. Healthcare Applications:**

- Use SLMs for medical diagnostics and patient monitoring. They can provide real-time analysis of symptoms and suggest potential treatments. This can be integrated into telemedicine platforms or portable health devices.

**5. Local Business Intelligence:**

- Implement SLMs in retail or small business environments to analyze customer behavior, manage inventory, and optimize operations. The ability to process data locally ensures privacy and reduces dependency on external services.

**6. Industrial IoT:**

- Integrate SLMs into industrial IoT systems for predictive maintenance, quality control, and process optimization. The Raspberry Pi can serve as a localized data processing unit, reducing latency and improving the reliability of automated systems.

**7. Autonomous Vehicles:**

- Use SLMs to process sensory data from autonomous vehicles, enabling real-time decision-making and navigation. This can be applied to drones, robots, and self-driving cars for enhanced autonomy and safety.

**8. Cultural Heritage and Tourism:**

- Implement SLMs to provide interactive and informative cultural heritage sites and museum guides. Visitors can use these systems to get real-time information and insights, enhancing their experience without internet connectivity.

**9. Artistic and Creative Projects:**

- Use SLMs to analyze and generate creative content, such as music, art, and literature. This can foster innovative projects in the creative industries and allow for unique interactive experiences in exhibitions and performances.

**10. Customized Assistive Technologies:**

- Develop assistive technologies for individuals with disabilities, providing personalized and adaptive support through real-time text-to-speech, language translation, and other accessible tools.
