---



sidebar_position: 1



---







> You can get this [Notebook](https://github.com/Seeed-Projects/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/blob/main/articles/Chapter%205%20-%20Custom%20Model%20Development%20and%20Deployment/Training%20Your%20Model.ipynb) on GitHub.





## Step 1: Prepare you environment on your host computer







**Note：This part of code run on your host computer**







The Jupyter Notebook right up have a button like ![select kernel](../../pictures/Chapter5/select_kernel.png), then you choose ```Select Another Kernel```, and choose ```Python Environments```, then choose ```Creat Python Environment``` and choose ```Venv```, then choose ```python3.10```.




```python
# Here is my hostcomputer information, you should install Ubantu 22.04 if you what use this code.
# Linux PC 6.8.0-45-generic #45~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Wed Sep 11 15:25:05 UTC 2 x86_64 x86_64 x86_64 GNU/Linux.

!uname -a
```


```
Linux PC 6.8.0-45-generic #45~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Wed Sep 11 15:25:05 UTC 2 x86_64 x86_64 x86_64 GNU/Linux

```

 

```python
# Here is my python version, you should install python3.10.12 
# Python 3.10.12

!python -V
```


```
Python 3.10.12

```

 

```python
# Install libs, if you see 'install successfully' it means you install libs successfully, or when you see 'install error' it means you install libs unsuccessfully
try:
    %pip install torch torchvision pycocotools opencv-python ultralytics matplotlib -q
    print('install successfully')
except:
    print('install error')

```


```
Note: you may need to restart the kernel to use updated packages.
install successfully

```

 


## Step 2: Prepare your dateset







I want to build a model to detect different fruit include banana, apple and orange. So I need to collect some pictures of this fruit. And I use [robflow](https://roboflow.com/) to label my dataset.







### Step 1: Create Project







Select ```New Project```:







![roboflow_1](../../pictures/Chapter5/roboflow_1.png)







Fill your project information and create the project







![roboflow_2](../../pictures/Chapter5/roboflow_2.png)







### Step 2: Update images and annotate







Update images







![roboflow_3](../../pictures/Chapter5/roboflow_3.png)







Label your image







![roboflow_4](../../pictures/Chapter5/roboflow_4.png)







### Step 3: Export dataset







Add annotated image to your dataset







![roboflow_5](../../pictures/Chapter5/roboflow_5.png)







Generate New version of your dataset







![roboflow_6](../../pictures/Chapter5/roboflow_6.png)







Download your dataset







![roboflow_7](../../pictures/Chapter5/roboflow_7.png)




```python
# Download gdown to install dataset from google driver, if you see 'install successfully' it means you install libs successfully, or when you see 'install error' it means you install libs unsuccessfully
try:
    %pip install gdown -q
    print('install successfully')
except:
    print('install error')
```


```
Note: you may need to restart the kernel to use updated packages.
install successfully

```

 

```python
# Download your dataset, and you can also train your model on roboflow   
!gdown https://drive.google.com/uc?id=1zZKnIVAcdNLUKg7IxaF-xLzE3Fvr3A05  && unzip roboflow.zip -d ~/datasets/ && rm roboflow.zip && mv ~/datasets/data.yaml ./data.yaml && cp -r ~/datasets/test/images ./
```


```
Downloading...
From: https://drive.google.com/uc?id=1zZKnIVAcdNLUKg7IxaF-xLzE3Fvr3A05
To: /home/jiahao/example/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/Chapter5_Custom_Model_Development_and_Deployment/roboflow.zip
100%|██████████████████████████████████████| 6.71M/6.71M [00:02<00:00, 3.01MB/s]
Archive:  roboflow.zip
  inflating: /home/jiahao/datasets/README.dataset.txt  
  inflating: /home/jiahao/datasets/README.roboflow.txt  
  inflating: /home/jiahao/datasets/data.yaml  
   creating: /home/jiahao/datasets/test/
   creating: /home/jiahao/datasets/test/images/
 extracting: /home/jiahao/datasets/test/images/20240918104508517_jpg.rf.fc23cc5073658776229f2ce2facaccf2.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918104609422_jpg.rf.1b1eec4e7487857e73728fb66b5c19e5.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111003194_jpg.rf.0d8caffdb9f7ed581ae4790861117445.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111025904_jpg.rf.ecc1f6af3eb9ecb5f09f03a834ba1a3a.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111056023_jpg.rf.27341363336ab55424a222714f5c26b2.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111059003_jpg.rf.07f88b928b21d2e1f7ab2fb02dd458c2.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111212445_jpg.rf.57f60851320325084ef6a8dcc0f834fe.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111344357_jpg.rf.41e2664dc6a0f978da863d92716e5886.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111402547_jpg.rf.5249e14425d3d0365103a9806de7ceb7.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111414977_jpg.rf.ec065439154f0e1975c3d20057ec0141.jpg  
 extracting: /home/jiahao/datasets/test/images/20240918111506857_jpg.rf.9eb35f5595733b69faabe0a723eb7e6e.jpg  
   creating: /home/jiahao/datasets/test/labels/
  inflating: /home/jiahao/datasets/test/labels/20240918104508517_jpg.rf.fc23cc5073658776229f2ce2facaccf2.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918104609422_jpg.rf.1b1eec4e7487857e73728fb66b5c19e5.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111003194_jpg.rf.0d8caffdb9f7ed581ae4790861117445.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111025904_jpg.rf.ecc1f6af3eb9ecb5f09f03a834ba1a3a.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111056023_jpg.rf.27341363336ab55424a222714f5c26b2.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111059003_jpg.rf.07f88b928b21d2e1f7ab2fb02dd458c2.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111212445_jpg.rf.57f60851320325084ef6a8dcc0f834fe.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111344357_jpg.rf.41e2664dc6a0f978da863d92716e5886.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111402547_jpg.rf.5249e14425d3d0365103a9806de7ceb7.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111414977_jpg.rf.ec065439154f0e1975c3d20057ec0141.txt  
  inflating: /home/jiahao/datasets/test/labels/20240918111506857_jpg.rf.9eb35f5595733b69faabe0a723eb7e6e.txt  
   creating: /home/jiahao/datasets/train/
   creating: /home/jiahao/datasets/train/images/
 extracting: /home/jiahao/datasets/train/images/20240918104450297_jpg.rf.74b5f688c91f1df0f100ddc30873cdf7.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104452137_jpg.rf.83bd6c6f3ef085fe08a3f895e1c0897f.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104454067_jpg.rf.4a7a4bb65aba3d2d4278eb27bfd7c580.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104511467_jpg.rf.19b8b1d292110a71f317492606b40e1d.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104516347_jpg.rf.ee5d40880fe406a5e6f86ed0c61b8db6.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104518227_jpg.rf.254f9d8e3889ca3f3dd3ef8f539f7bbd.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104524137_jpg.rf.9e99c407fd2476329ba0233019ac6ded.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104527187_jpg.rf.8ddcbc4ec8bc962a1d705e7c3184d8b4.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104545272_jpg.rf.d86873441ac2ab2ab7c44618ea102c21.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104552942_jpg.rf.2c6555769085da2f7f2bb9c26799d49c.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918104559712_jpg.rf.5c85f824b1ef8aa1b977cafd030b68a7.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111000244_jpg.rf.d59d9235fff28861475f1c88aaf5f02a.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111006204_jpg.rf.82bb9fd90f637bb7aec9b6177c50d2f0.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111009204_jpg.rf.9a2415f7ca998b093d10b08bc772fcd7.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111015124_jpg.rf.9430c5c58d0eb53983a3aa502b650e0a.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111016964_jpg.rf.e8c5378fcca546a258b69e747a44cbc2.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111019964_jpg.rf.77c73f026cd277f3611f390319aad2b4.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111027734_jpg.rf.f1106193711f981653dd66e2252f0114.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111030673_jpg.rf.9f287af8472ba2287b8a28f06ca10452.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111033573_jpg.rf.e918801cc08209c51bb4a4b91d181de2.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111036523_jpg.rf.9b0ebab550cb57763707a786649f3e4d.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111038343_jpg.rf.e1a0e2a3db1ac098165efcf4bae98e79.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111041323_jpg.rf.9a9fcd1c2118c97721a2450c498d8b00.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111044303_jpg.rf.77436c45fc97b6dde8fdff85e8d91748.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111050173_jpg.rf.8192e2e79d462ae126b35b777edcf6a8.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111102013_jpg.rf.af39c825952b05415348e9aaddd0240e.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111105003_jpg.rf.15b3e7c5d1acb620c14f897e6834d434.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111107953_jpg.rf.79be85e169c9c0741ee1b7c0e8308a36.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111110873_jpg.rf.f16579779a8e772502c5612d5dcf3ba0.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111113843_jpg.rf.a04c27bafbf98f6baab7d8f33b7933c3.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111123413_jpg.rf.38576af62433b63dd4376b1d327806f0.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111127123_jpg.rf.620f10e9c8b35bc9fb6a92c329ce4212.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111131735_jpg.rf.86ba4a92db86720a12153530f5b283a8.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111134705_jpg.rf.f6fff679ae74100351678259d2ce6f2f.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111137635_jpg.rf.036c892bfbe9b8d195b403ea67481352.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111145295_jpg.rf.74cd26a694253303069cabbf85608a52.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111151175_jpg.rf.6fe9ea5026eb020d88b6c798661038c9.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111158805_jpg.rf.3738343048f497b5c8ae5562c0c0d0a6.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111201755_jpg.rf.5b2b6cf0992448ed1378633d7a2757ba.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111209455_jpg.rf.2571bb63619b094690cc961fa5cefea5.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111220145_jpg.rf.9e3dc0521bfb6ceff25f46037b5e5848.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111228925_jpg.rf.5587e29403874650a3740fe2e5c9ff1d.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111238265_jpg.rf.ee0d0cc41706cff89649e87266d0a54c.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111241235_jpg.rf.dddb3a81788016b665c7a3d00da57158.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111247035_jpg.rf.a4394df781ecf0b03e365e28af511880.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111248875_jpg.rf.17f775354cf7fdd62788dbb643fa200c.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111254765_jpg.rf.37433e4cd77211b67730eee1159d882e.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111257665_jpg.rf.98fadcdf758e1cbf33c70ec4d78670f2.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111300645_jpg.rf.f65a4c5ea1c57359ddafbfb00271960d.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111303565_jpg.rf.ccf8dc3f61439db90252aa5a2b1dd623.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111306555_jpg.rf.0b5c42af1968d0dcfcdec33df59c3f44.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111315435_jpg.rf.9d8f2994dd0a27fe8426966f5295f3a9.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111318345_jpg.rf.648be3edd1ed0150400c19b41ff59f51.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111321305_jpg.rf.cdf4b1c7f37a248fc0a64e87b30a8d0d.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111324265_jpg.rf.d8aea36f18c8e7f5a5a82792be429214.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111331885_jpg.rf.eb0162588299f9cdedd06ab566776362.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111334875_jpg.rf.32d375e7d31f6fbe81464ed751f70c09.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111337815_jpg.rf.5bcd8447f3f28c2e50f02bd37d657788.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111340747_jpg.rf.5e3554dbdf1575afdc488a35fbbf8cdc.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111342557_jpg.rf.755dbcdd16c5f6b3499cf68abcd431ba.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111350147_jpg.rf.5e86f42902e69e84498d1d2514c79ed6.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111354887_jpg.rf.2b95aeb2a242320340571814b6c8d6ca.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111400697_jpg.rf.49698279acef3b01bcc580e636ac0faa.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111425567_jpg.rf.95788d0f55ad09b2dd6fe713f28792f5.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111431277_jpg.rf.9ec7035e7099236de996676595f5b538.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111434177_jpg.rf.5f88ff0ab3402b2fc6847bdf65f6badf.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111437087_jpg.rf.c870bdff32626d9b58f9db3c894d464c.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111441847_jpg.rf.bb5e923a2059dea5201369182fc1bc95.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111444807_jpg.rf.c4c6722e4ee5d86cbf8811100be178f1.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111449527_jpg.rf.fed47e9903b649cd520a862482d18903.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111452387_jpg.rf.01fff687d431ed9978da2393f264d0a5.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111455257_jpg.rf.dce4f95442200b7b5f1c8491defe417a.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111508687_jpg.rf.5290b003ee8ef82c4d8661f183a424f3.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111517477_jpg.rf.fcfa4c1480ed765732b71c352bf31a88.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111522267_jpg.rf.33069c1b1200e0893c7f4cddd6131de7.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111528797_jpg.rf.ff43297f59bd95808c0d7ee83c619ece.jpg  
 extracting: /home/jiahao/datasets/train/images/20240918111531747_jpg.rf.691c5f32349a12c62e72414ffbc3422f.jpg  
   creating: /home/jiahao/datasets/train/labels/
  inflating: /home/jiahao/datasets/train/labels/20240918104450297_jpg.rf.74b5f688c91f1df0f100ddc30873cdf7.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104452137_jpg.rf.83bd6c6f3ef085fe08a3f895e1c0897f.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104454067_jpg.rf.4a7a4bb65aba3d2d4278eb27bfd7c580.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104511467_jpg.rf.19b8b1d292110a71f317492606b40e1d.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104516347_jpg.rf.ee5d40880fe406a5e6f86ed0c61b8db6.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104518227_jpg.rf.254f9d8e3889ca3f3dd3ef8f539f7bbd.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104524137_jpg.rf.9e99c407fd2476329ba0233019ac6ded.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104527187_jpg.rf.8ddcbc4ec8bc962a1d705e7c3184d8b4.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104545272_jpg.rf.d86873441ac2ab2ab7c44618ea102c21.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104552942_jpg.rf.2c6555769085da2f7f2bb9c26799d49c.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918104559712_jpg.rf.5c85f824b1ef8aa1b977cafd030b68a7.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111000244_jpg.rf.d59d9235fff28861475f1c88aaf5f02a.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111006204_jpg.rf.82bb9fd90f637bb7aec9b6177c50d2f0.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111009204_jpg.rf.9a2415f7ca998b093d10b08bc772fcd7.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111015124_jpg.rf.9430c5c58d0eb53983a3aa502b650e0a.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111016964_jpg.rf.e8c5378fcca546a258b69e747a44cbc2.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111019964_jpg.rf.77c73f026cd277f3611f390319aad2b4.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111027734_jpg.rf.f1106193711f981653dd66e2252f0114.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111030673_jpg.rf.9f287af8472ba2287b8a28f06ca10452.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111033573_jpg.rf.e918801cc08209c51bb4a4b91d181de2.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111036523_jpg.rf.9b0ebab550cb57763707a786649f3e4d.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111038343_jpg.rf.e1a0e2a3db1ac098165efcf4bae98e79.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111041323_jpg.rf.9a9fcd1c2118c97721a2450c498d8b00.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111044303_jpg.rf.77436c45fc97b6dde8fdff85e8d91748.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111050173_jpg.rf.8192e2e79d462ae126b35b777edcf6a8.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111102013_jpg.rf.af39c825952b05415348e9aaddd0240e.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111105003_jpg.rf.15b3e7c5d1acb620c14f897e6834d434.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111107953_jpg.rf.79be85e169c9c0741ee1b7c0e8308a36.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111110873_jpg.rf.f16579779a8e772502c5612d5dcf3ba0.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111113843_jpg.rf.a04c27bafbf98f6baab7d8f33b7933c3.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111123413_jpg.rf.38576af62433b63dd4376b1d327806f0.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111127123_jpg.rf.620f10e9c8b35bc9fb6a92c329ce4212.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111131735_jpg.rf.86ba4a92db86720a12153530f5b283a8.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111134705_jpg.rf.f6fff679ae74100351678259d2ce6f2f.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111137635_jpg.rf.036c892bfbe9b8d195b403ea67481352.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111145295_jpg.rf.74cd26a694253303069cabbf85608a52.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111151175_jpg.rf.6fe9ea5026eb020d88b6c798661038c9.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111158805_jpg.rf.3738343048f497b5c8ae5562c0c0d0a6.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111201755_jpg.rf.5b2b6cf0992448ed1378633d7a2757ba.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111209455_jpg.rf.2571bb63619b094690cc961fa5cefea5.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111220145_jpg.rf.9e3dc0521bfb6ceff25f46037b5e5848.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111228925_jpg.rf.5587e29403874650a3740fe2e5c9ff1d.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111238265_jpg.rf.ee0d0cc41706cff89649e87266d0a54c.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111241235_jpg.rf.dddb3a81788016b665c7a3d00da57158.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111247035_jpg.rf.a4394df781ecf0b03e365e28af511880.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111248875_jpg.rf.17f775354cf7fdd62788dbb643fa200c.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111254765_jpg.rf.37433e4cd77211b67730eee1159d882e.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111257665_jpg.rf.98fadcdf758e1cbf33c70ec4d78670f2.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111300645_jpg.rf.f65a4c5ea1c57359ddafbfb00271960d.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111303565_jpg.rf.ccf8dc3f61439db90252aa5a2b1dd623.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111306555_jpg.rf.0b5c42af1968d0dcfcdec33df59c3f44.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111315435_jpg.rf.9d8f2994dd0a27fe8426966f5295f3a9.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111318345_jpg.rf.648be3edd1ed0150400c19b41ff59f51.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111321305_jpg.rf.cdf4b1c7f37a248fc0a64e87b30a8d0d.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111324265_jpg.rf.d8aea36f18c8e7f5a5a82792be429214.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111331885_jpg.rf.eb0162588299f9cdedd06ab566776362.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111334875_jpg.rf.32d375e7d31f6fbe81464ed751f70c09.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111337815_jpg.rf.5bcd8447f3f28c2e50f02bd37d657788.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111340747_jpg.rf.5e3554dbdf1575afdc488a35fbbf8cdc.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111342557_jpg.rf.755dbcdd16c5f6b3499cf68abcd431ba.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111350147_jpg.rf.5e86f42902e69e84498d1d2514c79ed6.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111354887_jpg.rf.2b95aeb2a242320340571814b6c8d6ca.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111400697_jpg.rf.49698279acef3b01bcc580e636ac0faa.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111425567_jpg.rf.95788d0f55ad09b2dd6fe713f28792f5.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111431277_jpg.rf.9ec7035e7099236de996676595f5b538.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111434177_jpg.rf.5f88ff0ab3402b2fc6847bdf65f6badf.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111437087_jpg.rf.c870bdff32626d9b58f9db3c894d464c.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111441847_jpg.rf.bb5e923a2059dea5201369182fc1bc95.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111444807_jpg.rf.c4c6722e4ee5d86cbf8811100be178f1.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111449527_jpg.rf.fed47e9903b649cd520a862482d18903.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111452387_jpg.rf.01fff687d431ed9978da2393f264d0a5.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111455257_jpg.rf.dce4f95442200b7b5f1c8491defe417a.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111508687_jpg.rf.5290b003ee8ef82c4d8661f183a424f3.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111517477_jpg.rf.fcfa4c1480ed765732b71c352bf31a88.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111522267_jpg.rf.33069c1b1200e0893c7f4cddd6131de7.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111528797_jpg.rf.ff43297f59bd95808c0d7ee83c619ece.txt  
  inflating: /home/jiahao/datasets/train/labels/20240918111531747_jpg.rf.691c5f32349a12c62e72414ffbc3422f.txt  
   creating: /home/jiahao/datasets/valid/
   creating: /home/jiahao/datasets/valid/images/
 extracting: /home/jiahao/datasets/valid/images/20240918104514477_jpg.rf.ef49facc806150ff6e1550176e3232d0.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918104521187_jpg.rf.bc26171712c68f46f2d8605808c4153b.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918110958304_jpg.rf.36861185a28ca404f91a519810c28595.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111012094_jpg.rf.955e60af49114172de1d8a8d7aa8b529.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111022884_jpg.rf.b1426ccf294f2d541441c9ecea69c8e6.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111047223_jpg.rf.f93a4a2e7acad30febc7c1b8979448e3.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111116813_jpg.rf.c6e857406eb59133ddd738b45121c452.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111119723_jpg.rf.6dc22bd2a60f214fd2986939d4efbdd9.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111125323_jpg.rf.de99b175032ed0e5f30bf3ce2b5c7a68.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111142325_jpg.rf.33b6487e213295de47eca419f9d1e9ab.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111206545_jpg.rf.37badeffd5888b86ba4f5536b3787e3a.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111218345_jpg.rf.66eed7aab2c8e6149a30083ddb256815.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111225965_jpg.rf.34d771d2d56c4c482915c84fffd125ee.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111231905_jpg.rf.43058e78ee14bf357f83ac2b0c2c65fc.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111235055_jpg.rf.990baf4687ee445fe6091a19c342c622.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111244125_jpg.rf.0f3e5e257c13d2e5e162c7b065336ed7.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111309505_jpg.rf.f2bff3f87965798ac7171728b7a5f66f.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111357777_jpg.rf.1459e7abed4156ab8c3c07be8379951d.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111422647_jpg.rf.00c4d337f695788dfb6c7bb1d26f145a.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111428407_jpg.rf.7874193e59dfd1ac738620ecb091bdc2.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111447647_jpg.rf.923eb9d7918bd2fc6b027e741e279dbc.jpg  
 extracting: /home/jiahao/datasets/valid/images/20240918111503917_jpg.rf.648c38d674d1d13cb90f3f5211d06fbe.jpg  
   creating: /home/jiahao/datasets/valid/labels/
  inflating: /home/jiahao/datasets/valid/labels/20240918104514477_jpg.rf.ef49facc806150ff6e1550176e3232d0.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918104521187_jpg.rf.bc26171712c68f46f2d8605808c4153b.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918110958304_jpg.rf.36861185a28ca404f91a519810c28595.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111012094_jpg.rf.955e60af49114172de1d8a8d7aa8b529.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111022884_jpg.rf.b1426ccf294f2d541441c9ecea69c8e6.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111047223_jpg.rf.f93a4a2e7acad30febc7c1b8979448e3.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111116813_jpg.rf.c6e857406eb59133ddd738b45121c452.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111119723_jpg.rf.6dc22bd2a60f214fd2986939d4efbdd9.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111125323_jpg.rf.de99b175032ed0e5f30bf3ce2b5c7a68.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111142325_jpg.rf.33b6487e213295de47eca419f9d1e9ab.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111206545_jpg.rf.37badeffd5888b86ba4f5536b3787e3a.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111218345_jpg.rf.66eed7aab2c8e6149a30083ddb256815.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111225965_jpg.rf.34d771d2d56c4c482915c84fffd125ee.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111231905_jpg.rf.43058e78ee14bf357f83ac2b0c2c65fc.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111235055_jpg.rf.990baf4687ee445fe6091a19c342c622.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111244125_jpg.rf.0f3e5e257c13d2e5e162c7b065336ed7.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111309505_jpg.rf.f2bff3f87965798ac7171728b7a5f66f.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111357777_jpg.rf.1459e7abed4156ab8c3c07be8379951d.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111422647_jpg.rf.00c4d337f695788dfb6c7bb1d26f145a.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111428407_jpg.rf.7874193e59dfd1ac738620ecb091bdc2.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111447647_jpg.rf.923eb9d7918bd2fc6b027e741e279dbc.txt  
  inflating: /home/jiahao/datasets/valid/labels/20240918111503917_jpg.rf.648c38d674d1d13cb90f3f5211d06fbe.txt  

```

 


## Step 3: Training Yolo11n







YOLOv11 is the latest version in the YOLO (You Only Look Once) series developed by Ultralytics, following previous iterations like YOLOv5 and YOLOv8. It retains the key features of earlier versions, focusing on real-time object detection with improvements in speed, accuracy, and versatility across various tasks, such as object detection, segmentation, classification, and pose estimation.




```python
from ultralytics import YOLO

# Load a model
model = YOLO("yolo11n.pt") # load a pretrained model (recommended for training)
# Train model with 10 epochs
results = model.train(data="data.yaml", epochs=20, imgsz=640, batch=16)

```


```
Downloading https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt to 'yolo11n.pt'...

```

 

```
100%|██████████| 5.35M/5.35M [00:01<00:00, 3.14MB/s]

```

 

```
Ultralytics 8.3.18 🚀 Python-3.10.12 torch-2.5.0+cu124 CPU (AMD Ryzen 5 5600G with Radeon Graphics)
[34m[1mengine/trainer: [0mtask=detect, mode=train, model=yolo11n.pt, data=data.yaml, epochs=20, time=None, patience=100, batch=16, imgsz=640, save=True, save_period=-1, cache=False, device=None, workers=8, project=None, name=train, exist_ok=False, pretrained=True, optimizer=auto, verbose=True, seed=0, deterministic=True, single_cls=False, rect=False, cos_lr=False, close_mosaic=10, resume=False, amp=True, fraction=1.0, profile=False, freeze=None, multi_scale=False, overlap_mask=True, mask_ratio=4, dropout=0.0, val=True, split=val, save_json=False, save_hybrid=False, conf=None, iou=0.7, max_det=300, half=False, dnn=False, plots=True, source=None, vid_stride=1, stream_buffer=False, visualize=False, augment=False, agnostic_nms=False, classes=None, retina_masks=False, embed=None, show=False, save_frames=False, save_txt=False, save_conf=False, save_crop=False, show_labels=True, show_conf=True, show_boxes=True, line_width=None, format=torchscript, keras=False, optimize=False, int8=False, dynamic=False, simplify=True, opset=None, workspace=4, nms=False, lr0=0.01, lrf=0.01, momentum=0.937, weight_decay=0.0005, warmup_epochs=3.0, warmup_momentum=0.8, warmup_bias_lr=0.1, box=7.5, cls=0.5, dfl=1.5, pose=12.0, kobj=1.0, label_smoothing=0.0, nbs=64, hsv_h=0.015, hsv_s=0.7, hsv_v=0.4, degrees=0.0, translate=0.1, scale=0.5, shear=0.0, perspective=0.0, flipud=0.0, fliplr=0.5, bgr=0.0, mosaic=1.0, mixup=0.0, copy_paste=0.0, copy_paste_mode=flip, auto_augment=randaugment, erasing=0.4, crop_fraction=1.0, cfg=None, tracker=botsort.yaml, save_dir=/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train
Overriding model.yaml nc=80 with nc=3

                   from  n    params  module                                       arguments                     
  0                  -1  1       464  ultralytics.nn.modules.conv.Conv             [3, 16, 3, 2]                 
  1                  -1  1      4672  ultralytics.nn.modules.conv.Conv             [16, 32, 3, 2]                
  2                  -1  1      6640  ultralytics.nn.modules.block.C3k2            [32, 64, 1, False, 0.25]      
  3                  -1  1     36992  ultralytics.nn.modules.conv.Conv             [64, 64, 3, 2]                
  4                  -1  1     26080  ultralytics.nn.modules.block.C3k2            [64, 128, 1, False, 0.25]     
  5                  -1  1    147712  ultralytics.nn.modules.conv.Conv             [128, 128, 3, 2]              
  6                  -1  1     87040  ultralytics.nn.modules.block.C3k2            [128, 128, 1, True]           
  7                  -1  1    295424  ultralytics.nn.modules.conv.Conv             [128, 256, 3, 2]              
  8                  -1  1    346112  ultralytics.nn.modules.block.C3k2            [256, 256, 1, True]           
  9                  -1  1    164608  ultralytics.nn.modules.block.SPPF            [256, 256, 5]                 
 10                  -1  1    249728  ultralytics.nn.modules.block.C2PSA           [256, 256, 1]                 
 11                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']          
 12             [-1, 6]  1         0  ultralytics.nn.modules.conv.Concat           [1]                           
 13                  -1  1    111296  ultralytics.nn.modules.block.C3k2            [384, 128, 1, False]          
 14                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']          
 15             [-1, 4]  1         0  ultralytics.nn.modules.conv.Concat           [1]                           
 16                  -1  1     32096  ultralytics.nn.modules.block.C3k2            [256, 64, 1, False]           
 17                  -1  1     36992  ultralytics.nn.modules.conv.Conv             [64, 64, 3, 2]                
 18            [-1, 13]  1         0  ultralytics.nn.modules.conv.Concat           [1]                           
 19                  -1  1     86720  ultralytics.nn.modules.block.C3k2            [192, 128, 1, False]          
 20                  -1  1    147712  ultralytics.nn.modules.conv.Conv             [128, 128, 3, 2]              
 21            [-1, 10]  1         0  ultralytics.nn.modules.conv.Concat           [1]                           
 22                  -1  1    378880  ultralytics.nn.modules.block.C3k2            [384, 256, 1, True]           
 23        [16, 19, 22]  1    431257  ultralytics.nn.modules.head.Detect           [3, [64, 128, 256]]           
YOLO11n summary: 319 layers, 2,590,425 parameters, 2,590,409 gradients, 6.4 GFLOPs

Transferred 448/499 items from pretrained weights
Freezing layer 'model.23.dfl.conv.weight'

```

 

```
[34m[1mtrain: [0mScanning /home/jiahao/datasets/train/labels... 77 images, 0 backgrounds, 0 corrupt: 100%|██████████| 77/77 [00:00<00:00, 2450.39it/s]
```

 

```
[34m[1mtrain: [0mNew cache created: /home/jiahao/datasets/train/labels.cache

```

 

```

[34m[1mval: [0mScanning /home/jiahao/datasets/valid/labels... 22 images, 0 backgrounds, 0 corrupt: 100%|██████████| 22/22 [00:00<00:00, 2914.46it/s]
```

 

```
[34m[1mval: [0mNew cache created: /home/jiahao/datasets/valid/labels.cache

```

 

```


```

 

```
Plotting labels to /home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/labels.jpg... 
[34m[1moptimizer:[0m 'optimizer=auto' found, ignoring 'lr0=0.01' and 'momentum=0.937' and determining best 'optimizer', 'lr0' and 'momentum' automatically... 
[34m[1moptimizer:[0m AdamW(lr=0.001429, momentum=0.9) with parameter groups 81 weight(decay=0.0), 88 weight(decay=0.0005), 87 bias(decay=0.0)
Image sizes 640 train, 640 val
Using 0 dataloader workers
Logging results to [1m/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train[0m
Starting training for 20 epochs...

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       1/20         0G     0.6629      3.092      1.013         54        640: 100%|██████████| 5/5 [01:29<00:00, 17.88s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.43s/it]
```

 

```
                   all         22         59    0.00912          1      0.535      0.491

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       2/20         0G     0.6204      2.778     0.9716         47        640: 100%|██████████| 5/5 [00:17<00:00,  3.48s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.27s/it]
```

 

```
                   all         22         59     0.0091          1      0.744      0.668

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       3/20         0G     0.6386      2.313     0.9908         65        640: 100%|██████████| 5/5 [00:16<00:00,  3.36s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.09s/it]
```

 

```
                   all         22         59    0.00896          1      0.816      0.737

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       4/20         0G     0.5686       1.82      0.928         54        640: 100%|██████████| 5/5 [00:16<00:00,  3.33s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.12s/it]
```

 

```
                   all         22         59    0.00894          1      0.911      0.787

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       5/20         0G     0.5658      1.527     0.9462         48        640: 100%|██████████| 5/5 [00:17<00:00,  3.47s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.89s/it]
```

 

```
                   all         22         59    0.00897          1      0.905      0.784

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       6/20         0G     0.5941      1.296     0.9382         47        640: 100%|██████████| 5/5 [00:22<00:00,  4.57s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.14s/it]
```

 

```
                   all         22         59    0.00902          1      0.887      0.797

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       7/20         0G     0.5397      1.103     0.9318         63        640: 100%|██████████| 5/5 [00:16<00:00,  3.33s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.09s/it]
```

 

```
                   all         22         59    0.00904          1      0.917      0.818

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       8/20         0G     0.5954      1.007     0.9539         76        640: 100%|██████████| 5/5 [00:16<00:00,  3.35s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.09s/it]
```

 

```
                   all         22         59          1      0.323      0.948      0.859

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
       9/20         0G     0.5897      1.038     0.9921         42        640: 100%|██████████| 5/5 [00:16<00:00,  3.34s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.06s/it]
```

 

```
                   all         22         59          1      0.324      0.991      0.889

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      10/20         0G     0.5724     0.9229     0.9413         57        640: 100%|██████████| 5/5 [00:16<00:00,  3.36s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.00s/it]
```

 

```
                   all         22         59          1      0.544      0.995       0.89

```

 

```


```

 

```
Closing dataloader mosaic

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      11/20         0G     0.5226     0.9882     0.9502         33        640: 100%|██████████| 5/5 [00:16<00:00,  3.30s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.99s/it]
```

 

```
                   all         22         59          1      0.754      0.995       0.89

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      12/20         0G     0.5156     0.9516     0.9467         32        640: 100%|██████████| 5/5 [00:16<00:00,  3.37s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.94s/it]
```

 

```
                   all         22         59          1      0.712      0.992      0.894

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      13/20         0G     0.4717     0.9665     0.8938         32        640: 100%|██████████| 5/5 [00:16<00:00,  3.37s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.95s/it]
```

 

```
                   all         22         59          1      0.717      0.988      0.887

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      14/20         0G     0.4689     0.9379     0.8827         31        640: 100%|██████████| 5/5 [00:16<00:00,  3.28s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.93s/it]
```

 

```
                   all         22         59      0.967       0.77      0.981      0.891

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      15/20         0G      0.465     0.8894     0.9227         34        640: 100%|██████████| 5/5 [00:16<00:00,  3.27s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.90s/it]
```

 

```
                   all         22         59      0.986      0.942      0.994      0.907

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      16/20         0G     0.4335     0.8448     0.8771         33        640: 100%|██████████| 5/5 [00:16<00:00,  3.28s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.86s/it]
```

 

```
                   all         22         59      0.989      0.952      0.995      0.906

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      17/20         0G     0.4267     0.8703     0.8883         31        640: 100%|██████████| 5/5 [00:16<00:00,  3.27s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.84s/it]
```

 

```
                   all         22         59      0.987      0.996      0.995      0.908

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      18/20         0G     0.4615     0.8565     0.9161         30        640: 100%|██████████| 5/5 [00:16<00:00,  3.34s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.87s/it]
```

 

```
                   all         22         59      0.981          1      0.995      0.911

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      19/20         0G     0.4054     0.8082     0.8759         36        640: 100%|██████████| 5/5 [00:16<00:00,  3.27s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.86s/it]
```

 

```
                   all         22         59      0.979          1      0.995      0.922

```

 

```


```

 

```

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size

```

 

```
      20/20         0G      0.414      0.821     0.8681         29        640: 100%|██████████| 5/5 [00:16<00:00,  3.25s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.85s/it]
```

 

```
                   all         22         59      0.977          1      0.995      0.926

```

 

```


```

 

```

20 epochs completed in 0.128 hours.
Optimizer stripped from /home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/last.pt, 5.5MB
Optimizer stripped from /home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.pt, 5.5MB

Validating /home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.pt...
Ultralytics 8.3.18 🚀 Python-3.10.12 torch-2.5.0+cu124 CPU (AMD Ryzen 5 5600G with Radeon Graphics)
YOLO11n summary (fused): 238 layers, 2,582,737 parameters, 0 gradients, 6.3 GFLOPs

```

 

```
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.61s/it]

```

 

```
                   all         22         59      0.977          1      0.995      0.926
                 apple         21         21      0.978          1      0.995      0.929
                banana         19         19      0.989          1      0.995      0.872
                orange         19         19      0.965          1      0.995      0.978
Speed: 1.6ms preprocess, 60.7ms inference, 0.0ms loss, 7.3ms postprocess per image
Results saved to [1m/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train[0m

```

 

```python
%matplotlib inline

import cv2
import os
import matplotlib.pyplot as plt
from ultralytics import YOLO

# Define the image directory path
image_dir = './images/'

# Get a list of all image files in the directory
image_files = [f for f in os.listdir(image_dir) if f.endswith(('.png', '.jpg', '.jpeg'))]

# Loop through each image in the directory
for image_file in image_files:
    image_path = os.path.join(image_dir, image_file)
    image = cv2.imread(image_path)

    # Perform prediction
    results = model(image)

    # Process the results and draw bounding boxes
    for result in results:
        # Extract bounding boxes
        boxes = result.boxes
        if boxes is not None:
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Get bounding box coordinates
                conf = box.conf[0]  # Confidence score
                cls = int(box.cls[0])  # Class label index
                label = f"{model.names[cls]}: {conf:.2f}"  # Create label text

                # Draw the bounding box and label on the image
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Green box
                cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)  # Green label

    # Convert BGR image (from OpenCV) to RGB for displaying with matplotlib
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Display the result image using matplotlib
    plt.figure(figsize=(10, 6))
    plt.imshow(image_rgb)
    plt.axis('off')  # Hide axis
    plt.title(f"YOLO Prediction - {image_file}")
    plt.show()

```


```

0: 640x640 1 apple, 1 banana, 1 orange, 56.5ms
Speed: 1.3ms preprocess, 56.5ms inference, 1.0ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 banana, 1 orange, 46.4ms
Speed: 1.2ms preprocess, 46.4ms inference, 0.5ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 banana, 1 orange, 46.1ms
Speed: 1.1ms preprocess, 46.1ms inference, 0.5ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 orange, 83.6ms
Speed: 1.2ms preprocess, 83.6ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 banana, 1 orange, 49.5ms
Speed: 1.3ms preprocess, 49.5ms inference, 0.7ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 46.4ms
Speed: 1.0ms preprocess, 46.4ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 banana, 1 orange, 55.7ms
Speed: 1.3ms preprocess, 55.7ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 orange, 87.3ms
Speed: 1.3ms preprocess, 87.3ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 banana, 48.6ms
Speed: 1.2ms preprocess, 48.6ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 banana, 1 orange, 48.8ms
Speed: 1.1ms preprocess, 48.8ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 

```

0: 640x640 1 apple, 1 banana, 1 orange, 46.6ms
Speed: 1.2ms preprocess, 46.6ms inference, 0.6ms postprocess per image at shape (1, 3, 640, 640)

```

 


```
<Figure size 1000x600 with 1 Axes>
```

 


## Step 4: Export to ONNX format







I will use Hailo DataFlow Compiler to convert model to hef format to inference on AI Kit, so I need to convert model to onnx format.




```python
# Export Yolov11n model to onnx format, the path will be shown as below
# For me the path is /home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.onnx

model.export(format="onnx", opset=10)
```


```
Ultralytics 8.3.18 🚀 Python-3.10.12 torch-2.5.0+cu124 CPU (AMD Ryzen 5 5600G with Radeon Graphics)

[34m[1mPyTorch:[0m starting from '/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.pt' with input shape (1, 3, 640, 640) BCHW and output shape(s) (1, 7, 8400) (5.2 MB)
[31m[1mrequirements:[0m Ultralytics requirements ['onnx>=1.12.0', 'onnxslim', 'onnxruntime'] not found, attempting AutoUpdate...
Collecting onnx>=1.12.0
  Downloading onnx-1.17.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (16 kB)
Collecting onnxslim
  Downloading onnxslim-0.1.35-py3-none-any.whl.metadata (3.0 kB)
Collecting onnxruntime
  Downloading onnxruntime-1.19.2-cp310-cp310-manylinux_2_27_x86_64.manylinux_2_28_x86_64.whl.metadata (4.5 kB)
Requirement already satisfied: numpy>=1.20 in /home/jiahao/example/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/.venv/lib/python3.10/site-packages (from onnx>=1.12.0) (2.1.2)
Collecting protobuf>=3.20.2 (from onnx>=1.12.0)
  Downloading protobuf-5.28.2-cp38-abi3-manylinux2014_x86_64.whl.metadata (592 bytes)
Requirement already satisfied: sympy in /home/jiahao/example/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/.venv/lib/python3.10/site-packages (from onnxslim) (1.13.1)
Requirement already satisfied: packaging in /home/jiahao/example/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/.venv/lib/python3.10/site-packages (from onnxslim) (24.1)
Collecting coloredlogs (from onnxruntime)
  Downloading coloredlogs-15.0.1-py2.py3-none-any.whl.metadata (12 kB)
Collecting flatbuffers (from onnxruntime)
  Downloading flatbuffers-24.3.25-py2.py3-none-any.whl.metadata (850 bytes)
Collecting humanfriendly>=9.1 (from coloredlogs->onnxruntime)
  Downloading humanfriendly-10.0-py2.py3-none-any.whl.metadata (9.2 kB)
Requirement already satisfied: mpmath<1.4,>=1.1.0 in /home/jiahao/example/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/.venv/lib/python3.10/site-packages (from sympy->onnxslim) (1.3.0)
Downloading onnx-1.17.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.0 MB)
[2K   [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m16.0/16.0 MB[0m [31m7.6 MB/s[0m eta [36m0:00:00[0ma [36m0:00:01[0m
[?25hDownloading onnxslim-0.1.35-py3-none-any.whl (140 kB)
Downloading onnxruntime-1.19.2-cp310-cp310-manylinux_2_27_x86_64.manylinux_2_28_x86_64.whl (13.2 MB)
[2K   [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m13.2/13.2 MB[0m [31m9.5 MB/s[0m eta [36m0:00:00[0ma [36m0:00:01[0m
[?25hDownloading protobuf-5.28.2-cp38-abi3-manylinux2014_x86_64.whl (316 kB)
Downloading coloredlogs-15.0.1-py2.py3-none-any.whl (46 kB)
Downloading flatbuffers-24.3.25-py2.py3-none-any.whl (26 kB)
Downloading humanfriendly-10.0-py2.py3-none-any.whl (86 kB)
Installing collected packages: flatbuffers, protobuf, humanfriendly, onnx, coloredlogs, onnxslim, onnxruntime
Successfully installed coloredlogs-15.0.1 flatbuffers-24.3.25 humanfriendly-10.0 onnx-1.17.0 onnxruntime-1.19.2 onnxslim-0.1.35 protobuf-5.28.2

[31m[1mrequirements:[0m AutoUpdate success ✅ 17.6s, installed 3 packages: ['onnx>=1.12.0', 'onnxslim', 'onnxruntime']
[31m[1mrequirements:[0m ⚠️ [1mRestart runtime or rerun command for updates to take effect[0m


[34m[1mONNX:[0m starting export with onnx 1.17.0 opset 10...
[34m[1mONNX:[0m slimming with onnxslim 0.1.35...
[34m[1mONNX:[0m export success ✅ 18.8s, saved as '/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.onnx' (10.1 MB)

Export complete (18.9s)
Results saved to [1m/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights[0m
Predict:         yolo predict task=detect model=/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.onnx imgsz=640  
Validate:        yolo val task=detect model=/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.onnx imgsz=640 data=data.yaml  
Visualize:       https://netron.app

```

 


```
'/home/jiahao/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/runs/detect/train/weights/best.onnx'
```

 