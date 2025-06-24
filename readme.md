# EymEstate
![image](./eymEstate.png)
## Description
a full stack website that you and multiple sellers can join and list their 

properties With admin panel to manage the website

once you signup /login on profile page you create new post and fill post detail 

i use `cloudinary` for image uploads

you need to make account on `https://cloudinary.com/`

go to **setting > upload > addUploadPreset**

after that set the presetname and choose siging mode :unsigned and save 

now back home copy your cloudname and upload preset the name you write

i use `scss` for styling for state management i use `context api` it is pretty simple 

for maps i use `react-leaflet`

for contact section i use `nodemailer` for sending emails

for authentication/authorization i use `jwt and cookies` for data fetching i use `axios` 

for database i use prisma orm with mongoDb provider so make sure to create acc 




## Table Of Content
- [EymEstate](#eymestate)
- [Description](#description)
- [Table Of Content](#table-of-content)
- [Installation and Usage](#installation-and-usage)
- [Used Techs](#used-techs)
- [Live Demo](#live-demo)
- [Contribution](#contribution)



## Installation and Usage
after creating mongodb and cloudinary accounts like i mention on  [description](#description)
you will fork my repo  code HTTPS =>copy url 
go to open your **cmd** `git clone url`
now you will find 3 dirs client and server and socket open your terminal create 3 terminals for each dir cd client on the first terminal and cd server and cd socket on other terminals run `npm install` in each terminal on the `api` termianl run npx prisma db push to push schema to your db
you will find **.env.example** files please rename them to .env and fill the data inside 

but now you can't see any posts so to generate dummy data 
there is a file inside `api` called `seeds.js`
but to seed you need user ids to generate users 
you should open 4'th terminal `cd api` run `npm run seed` or `node seeds.js` this will generate dummy data for you that you can see your website  

to enable sending email in contact section read the .env.example how to setup nodemailer correctly

finally run `npm run dev` in each directory `api` and `client` and `socket`

Enjoy .... `http://localhost:5173` 

## Used Techs
    - React 
    - react-router-dom
    - react-leaflet for maps
    - react-qull for Rich text 
    - mongodb
    - Prisma Orm 
    - Context Api
    - Socket.io
    - Sass 
    - dompurify for sanitizing
    - toast and timeago libraries
    - axios
    - faker for seeding dummy data 
    - react-slick for slider
    - nodemailer
    - slick-carousel  ...


### Live Demo 
[EymEstate](https://eym-real-estate-ui.vercel.app/)
on the live demo you cant try chat feature as i did'nt deploy it if you want to try it without any problems setup it on your local as i explained
### Contribution
🤝
if there any issue or features leave an issue i will consider it [Issue Page](https://github.com/ELIASyASSER/eymRealEstate/issues)
or make [pull request here ](https://github.com/ELIASyASSER/eymRealEstate/pulls)
