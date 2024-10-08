# Kaiser-Webhook

Kaiser Webhook is a tool that was made for hosting an exploit server locally/remotely. Currently it is used to detect certain blind attacks like XSS and HTML injections. 
Not only does it log requests, alerts, and the attack vector, but it uses discord webhooks to output the results in your discord channel. A demo version can be seen at
https://kaiser-webhook.vercel.app/

Created by mrunoriginal/AtlasWiki


https://github.com/user-attachments/assets/647aaffd-0c54-4518-9549-c3de6f3a4a82



<br>

## Key Features:
+ **Alert Detection**: Sends (blind) injection alerts to your discord webhook.
+ **Logging**: Comes with request logging.
+ **Location Tracking**: Tracks the location of where the payload was fired.
+ **Payload Tracking**: Tracks the payload that was fired.
+ **Easy Link Generation**: Comes with a link generator to create the link for the payload.
+ **24/7 Online Detection**: Supports hosting with virtualization and serverless functions like vercel.
+ **Link Security**: Creating your own code/password as it's required so that your webhook does not get spammed.
+ **Separated Webhooks**: There is a separate webhook for logging requests and detecting injection alerts.
+  **Clean UI**: Comes with a clean and simple to use UI.

## Installation and Setup:

### Without Vercel:
1.) Clone the repo:
```
git clone https://github.com/AtlasWiki/kaiser-webhook.git
```

2.) Go inside the directory and install the packages:
```
npm i
```

3.) Generate your discord webhook and edit the .env file with your own values

4.) Run the index.js file
```
node index.js
```
5.) Navigate to http://localhost:4000/ and read the instructions

6.) You're all set and may begin playing around with the tool

<br>

**RECOMMENDED STEP**: Host the repo remotely to Vercel or any other serverless provider.

**NOTE**: If you choose Vercel like how I did for the demo web app, then no need to edit the .env file from the repo. You would just need to deploy your own fork of this repo and edit the .env values from Vercel.

<br>

### With Vercel:

1.) Fork the repo.

2.) Import the github repo as a project to Vercel.

3.) Add your own .env variables in the Vercel deployment process (**do not edit .env file of your forked repo**).

<br>

### Warranty
The creator(s) of this tool provides no warranty or assurance regarding its performance, dependability, or suitability for any specific purpose.

The tool is furnished on an "as is" basis without any form of warranty, whether express or implied, encompassing, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

The user assumes full responsibility for employing this tool and does so at their own peril. The creator(s) holds no accountability for any loss, damage, or expenses sustained by the user or any third party due to the utilization of this tool, whether in a direct or indirect manner.

Moreover, the creator(s) explicitly renounces any liability or responsibility for the accuracy, substance, or availability of information acquired through the use of this tool, as well as for any harm inflicted by viruses, malware, or other malicious components that may infiltrate the user's system as a result of employing this tool.

By utilizing this tool, the user acknowledges that they have perused and understood this warranty declaration and agree to undertake all risks linked to its utilization.
  
### License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/AtlasWiki/kaiser-webhook/blob/main/LICENSE) for details.
