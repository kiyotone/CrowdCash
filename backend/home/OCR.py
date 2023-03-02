from PIL import Image
import cv2 as cv
import pytesseract
import os
import numpy as np
from os import path
import urllib.request

## The Ideal size of Driving License is 800x494##
#we have included resizing but somtimes it goes mad#
##pip install pytesseract##
##pip install opencv-contrib-python##
##pip install pillow##
##pip install numpy##

def KYC_verification(image_url):
    # Check if operating system is windows or linux
    if os.name == 'nt':
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    else:
        pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

    roi =[
        [(360,111),(596,139),'text','name'],
        [(380,142),(536,209),'text','address'],
        [(361,235),(485,263),'text','dob'],
        [(390,267),(655,300),'text','father_name'],
        [(433,302),(602,334),'text','citizenship_no'],
        [(400,368),(539,403),'text','phone_no'],
        [(106,82),(271,105),'text','lisence_no'],
    ]
    mydata = {}

    imgq=cv.imread('home/Query.jpg')
    h,w,c=imgq.shape


    orb =cv.ORB_create(1000)
    kp1,des1 = orb.detectAndCompute(imgq,None)

    per = 5
    # path ='User'

    # piclist=os.listdir(path)
    # print(piclist)

    # read image from image url
    with urllib.request.urlopen(image_url) as url_response:
        img_array = url_response.read()

    # Decode the image data to OpenCV-readable format
    img = cv.imdecode(np.frombuffer(img_array, np.uint8), cv.IMREAD_COLOR)

    # img = cv.imread('p1v3.jpg')

    img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)



    kp2, des2=orb.detectAndCompute(img,None)
    bf=cv.BFMatcher(cv.NORM_HAMMING)
    matches=bf.match(des2,des1)
    matches = sorted(matches, key = lambda x:x.distance)
    good = matches[:int(len(matches)*(per/100))]

    imgmatch=cv.drawMatches(img,kp2,imgq,kp1,good,None,flags=2)
    


    srcpts = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    dstpts = np.float32([kp1[m.trainIdx].pt for m in good]).reshape(-1,1,2)

    M, mask = cv.findHomography(srcpts, dstpts, cv.RANSAC, 5.0)
    imgscan = cv.warpPerspective(img, M, (w,h))
    imgmatch=cv.resize(imgscan,(w//2,h//2))

    imgshow=imgscan.copy()
    imgmask=np.zeros_like(imgshow)
    for x,r in enumerate(roi):
        cv.rectangle(imgmask,(r[0][0],r[0][1]),(r[1][0],r[1][1]),(0,255,0),cv.FILLED)
        imgshow=cv.addWeighted(imgshow,0.99,imgmask,0.1,0)
        imgcrop = img[r[0][1]:r[1][1],r[0][0]:r[1][0]]
        # cv.imshow(str(x),imgcrop)
    
        # print(f'{r[3]}: {pytesseract.image_to_string(imgcrop)}')
        mydata[r[3]] = pytesseract.image_to_string(imgcrop).replace('\n', '').replace('\x0c', '')  

    return mydata 

def main():
    print(KYC_verification('https://scontent.fbir5-1.fna.fbcdn.net/v/t1.15752-9/332347773_930051531343884_8077175877960478506_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=2FgJcIqu3AsAX_ilBJ5&_nc_ht=scontent.fbir5-1.fna&oh=03_AdQUKd7FxuduwXhVEOnPZaxgVNLDH2U71ElB3SEm91Sjgw&oe=64274262'))

if __name__ == "__main__":
    main()
