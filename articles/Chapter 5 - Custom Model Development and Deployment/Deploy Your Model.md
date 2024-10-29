---



sidebar_position: 3



---







> You can get this [Notebook](https://github.com/Seeed-Projects/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/blob/main/articles/Chapter%205%20-%20Custom%20Model%20Development%20and%20Deployment/Deploy%20Your%20Model.ipynb) on GitHub.





## Step 1: Prepare you environment on your raspberry pi







**Note：This part of code run on your [raspberry pi5](https://www.seeedstudio.com/Raspberry-Pi-5-2GB-p-5938.html) or [Recomputer R Series](https://www.seeedstudio.com/reComputer-R1000-Series-Optional-Accessories.html) with your [AI kit](https://www.seeedstudio.com/Raspberry-Pi-AI-Kit-p-5900.html)**







<!-- The Jupyter Notebook right up have a button like ![select kernel](../pictures/Chapter5/select_kernel.png), then you choose ```Select Another Kernel```, and choose ```Python Environments```, then choose ```Creat Python Environment``` and choose ```Venv```, then choose ```python3.11```. -->











### Upgrade raspberry pi







```



! sudo apt update && sudo apt upgrade



```







### Create a virtual environment







```



python -m venv hailo_env



```







### Install jupyter 







```



sudo pip install jupyter



```




```python
# Upgrade raspberry pi

! sudo apt updata && sudo apt upgrade
```
