## Description

App developed in [Nest](https://github.com/nestjs/nest) alongside AWS

## Steps to follow on this version (locally with your own aws account)

1.  First we need to create an AWS account, after this we need our credentials(Access key Id , Secret Access Key) which they'll be in AWS when we click on the profile name and then we click on Security Credentials <img src="https://res.cloudinary.com/dhfwuqzoz/image/upload/v1674227563/Images%20for%20mailing%20app%20readme/First_steps_mdtshd.png" />

After doing this a new tab will be opened and then we've got to scroll down to see Access key tab and then click on Create new access Key
<img src="https://res.cloudinary.com/dhfwuqzoz/image/upload/v1674227920/Images%20for%20mailing%20app%20readme/access_keys_pgt8kx.png" />

after this another screen will pop up, it's pretty straight forward just click on Create Access Key on the bottom right and once this is done, it will show you both key which you can download(I recommend it) .

IMPORTANT : THIS IS THE FIRST AND ONLY TIME AWS WILL SHOW YOUR THIS KEYS THAT'S WHY IS IMPORTANT TO DOWNLOAD THE FILE OR WRITE THEM DOWN.

2.  There are 3 ways to loggin your credentials:

A) using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions) after installing from our terminal we can execute the following :

```cmd
aws configure
```

and then it'll ask for your credentials, AZ and output.

```cmd
AWS Access Key ID [None]: YOUR_AWS_ACCESS_KEY_ID
AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
Default region name [None]: AVAILABILITY_ZONE
Default output format [None]: json

```

Note : Remember to use the closest region to your location to avoid connection and lag issues

Note 2: This will create a local config file in your computer [here](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html) is some more info about this method

B) If you're using VSCode you can use this extension [AWS Toolkit](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode) after install click
on the icon and it will ask for your credentials and AZ as the previous step

C) Place an .ENV file with the following

AWS_ACCESS_KEY_ID= YOUR_ACCESS_KEY
<br>
AWS_SECRET_ACCESS_KEY= YOUR_SECRET_ACCESS_KEY

IMPORTANT: YOU HAVE TO SPECIFICALLY USE THESE ENVIRONMENT VARIABLE NAMES AS THEY ARE WRITTEN ON THIS EXAMPLE, BECAUSE WHEN WE USE THE SDK IT'LL AUTOMATICALLY RECOGNIZE THEM BY THEIR NAME AND USE THESE CREDENTIALS ALONE AS STATED [HERE](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-environment.html)

## Terraform

1. First you must download Terraform from [here](https://developer.hashicorp.com/terraform/downloads?product_intent=terraform)
2. And then follow the steps of the setup that are in [this](https://www.youtube.com/watch?v=SLB_c_ayRMo&ab_channel=freeCodeCamp.org) video starting from minute 6:00 depending on your os the steps are different but are covered in this video
3. Go to terraform folder and then click in the main.tf file inside of it, change the following

```json
provider "aws"  {
    region = "THE_REGION_WHERE_YOU_HAVE_YOUR_ACCOUNT"
    access_key = "YOUR_ACCESS_KEY"
    secret_key = "YOUR_SECRET_ACCESS_KEY"
}

```

4. After this run the following scripts in order and one by one

```
npm run terraform:init
npm run terraform:plan
npm run terraform:apply
```

1.- terraform:init will setup all the aws dependencies needed to create services

2.- terraform:plan will show what changes are being made

3.- run terraform:apply will execute this changes in AWS creating the DybamoDb specific
table that this app will use in your account with your credentials

## Endpoints and Requests

Endpoint used to send mails POST REQUEST :

http://localhost:3000/mailing/

NOTE : this endpoint could change if you setup a diferent route for your localhost

Example of the JSON used to make request to this endpoint :

```json
{
    "type" : "html"                      -----------------> here we define the kind of email we want  HTML or normal . If we dont define anything or something that isn't html it'll be normal
    "receiver" : "bt_89_1@hotmail.com", -----------------> main address receiving the message
    "cc" : ["bowikif816@v3dev.com", "agu89.1@gmail.com"], ---------------------------> cc stands for Carbon Copy, meaning copies of the message being delivered to these other adresses
    "sender" : "agu89.1@gmail.com", ---------------------------> email address who sends the message
    "body" : "EMAIL BODY" , ---------------------------> we write the body of the messsage, if we defined "type" : "html" we can use html tags to give style to our message
    "subject" : "TEST" ---------------------------> here goes the subject

}
```

Endpoint used to retrieve failed Emails GET REQUEST :

http://localhost:3000/email/error

It'll return an object that looks like this :
Note: the object returned will contain all mails that failed to be sent by SES with all their information in order from the most recent.
Note2: the error_message property will contain the error returned from the SES service and a little description of what happened

```json
[
  {
    "email_body": {
      "S": "<h1> title</h1> <p> Im a paragraph </p>"
    },
    "receiver": {
      "S": "test@mail.com"
    },
    "sender": {
      "S": "test.1@gmail.com"
    },
    "subject": {
      "S": "test from postman"
    },
    "error_message": {
      "S": "MessageRejected: Email address is not verified. The following identities failed the check in region SA-EAST-1: ajja@mail.com"
    },
    "email_date": {
      "S": "Thu, 19 Jan 2023 20:57:44 GMT"
    },
    "email_id": {
      "S": "20560bb1-078c-4396-ade6-5ee849dbace7"
    },
    "email_status": {
      "S": "ERROR"
    }
  },
  {
    "email_body": {
      "S": "<h1> title</h1> <p> Im a paragraph </p>"
    },
    "receiver": {
      "S": "test@mail.com"
    },
    "sender": {
      "S": "test.1@gmail.com"
    },
    "subject": {
      "S": "test from postman"
    },
    "error_message": {
      "S": "MessageRejected: Email address is not verified. The following identities failed the check in region SA-EAST-1: ajja@mail.com"
    },
    "email_date": {
      "S": "Thu, 19 Jan 2023 20:57:10 GMT"
    },
    "email_id": {
      "S": "8d10e462-a55f-4c18-a809-11321215dc9d"
    },
    "email_status": {
      "S": "ERROR"
    }
  },
  {
    "email_body": {
      "S": "<h1> title</h1> <p> Im a paragraph </p>"
    },
    "receiver": {
      "S": "test@ail.com"
    },
    "sender": {
      "S": "test.1@gmail.com"
    },
    "subject": {
      "S": "test from postman"
    },
    "error_message": {
      "S": "MessageRejected: Email address is not verified. The following identities failed the check in region SA-EAST-1: sarasa@ail.com"
    },
    "email_date": {
      "S": "Thu, 19 Jan 2023 16:39:13 GMT"
    },
    "email_id": {
      "S": "33b166d0-5017-4c1a-a69d-1a9e4b966e16"
    },
    "email_status": {
      "S": "ERROR"
    }
  }
]
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
