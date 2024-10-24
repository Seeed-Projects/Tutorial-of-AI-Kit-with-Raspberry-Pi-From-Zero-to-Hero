# Contributor Guidelines

## Project Directory Structure

```shell
.
├── articles
│   ├── Chapter 1 - Introduction to AI
│   ├── Chapter 2 - Configuring the RaspberryPi Environment
│   ├── Chapter 3 - Computer Vision Projects and Practical Applications
│   ├── Chapter 4 - Large Language Model
│   ├── Chapter 5 - Custom Model Development and Deployment
│   └── Chapter 6 - RaspberryPi and AIoT
├── ContributorGuidelines.md
├── LICENSE
├── models
├── README.md
└── resource
```

### articles

```articles``` is the main directory of the project, and you can create subfolders named with your project name in ```Chapter_6:Raspberry_Pi_and_AIoT```.

### models

```models``` is the folder you can store your models in ```.hef``` format, which can be directly deployed on the AI kit. The folder will be like:```/models/Chapterx/xxxx.hef```.

### pictures

```pictures``` is the folder you can store your pictures, your pictures can help you showcase your project. The folder will be like:```/pictures/Chapterx/xxxx_1.png```.


### resource

```resource``` is the folder you can store your ```Node-Red``` work flow.The folder will be like:```/resource/Chapterx/xxx.Json```.

## Contribution Process

### Fork Project
Open [Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero](https://github.com/Seeed-Projects/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero) and ```Fork``` the project. And create a folder in the project's Chapter directory that you would like to contribute.

<img src="pictures/ContributorGuidelines/contrubutor_0.png" width="600" height="400">

### Download Project

Download project from your own repository. 

```
git clone https://github.com/Seeed-Projects/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero.git
```

### Create your project

Choose one ```Chapter``` you want to contribute your project and create folder with your project name.

<img src="pictures/ContributorGuidelines/contrubutor_1.png"  height="400">

### Dataset

You should update your dataset to your [Google Drive](https://drive.google.com/drive/home) and then use command line to download it in your project. You can use it in JupyterNotebook like below:

```
%pip install gdown
!gdown https://drive.google.com/uc?id=1AtnoXEk8_2nhEspZ6BMMIoCxE9WYaC1S -O ../resource/
```

### Code

Your code should be JupyterNotebook format and give the necessary comments, and keep the result of your code. Your code will like below:

<img src="pictures/ContributorGuidelines/contrubutor_2.png" width="600" height="400">

### Push

Make sure your code can run then you can push your code to your own repository.

```
git add .
git commit -m "update: <ThePATHofYourProject>"
git push
```
### Open a Pull Request

Open the project from your own repository like below:

<img src="pictures/ContributorGuidelines/contrubutor_3.png" width="600" height="400">

Click ```Contribute``` button and you can contribute your code to the mian repository.

<img src="pictures/ContributorGuidelines/contrubutor_4.png" width="600" height="400">