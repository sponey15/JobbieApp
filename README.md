# Jobbie

Jobbie is a web application which purpose is to simplify exchange information between the provider and recipient. This is currently my main project that is still in development. In "Presentation" section you can see how it looks like now :D

## Installation

You can download application as zip and unpack it. Next you need to write some commands:

```bash
In API folder:
dotnet restore -> to install dependencies
dotnet ef database update -> (may not be required) to make database schema from last migration
dotnet watch run -> run api server

In Client folder:
npm update -> installs all dependencies used at project
ng serve -> run angular
```
## Built With

* [.NET 5.0](https://dotnet.microsoft.com/) - The web framework used for backend 
* [Angular 10](https://angular.io/) - Web developer platform for frontend

## Used Technologies
For backend:

* AutoMapper
* Cloudinary
* JSON Web Tokens
* Micrsoft Identity

For frontend:

* [ngx-gallery](https://www.npmjs.com/package/@kolkov/ngx-gallery) - photo gallery
* [ng2-file-upload](https://github.com/valor-software/ng2-file-upload) - upload pictures to cloudinary
* [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/) - angular version of Bootstrap
* [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) - toast notifications

Database:

* Entity Framework Core
* Microsft SQL Server

## Future plans
* add chat to enable communication between job provider and recipient
* company calendar to let user choose from free dates
* company profile
* other improvements

## Presentation

Application can be divided into two modules User and Company. User can browse offers that multiple companies made into different categories. User can also make a request if he is interested in certain offer that company provides. When company accepts job they can start communicate (for example user can check work tasks that have been done in job and company can inform which tasks are already made in job).

1. Main screen of application

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/1.png)

2. Register form

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/2.png)

3. Register form with validation and BS datepicker

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/3.png)

4. Validation error

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/4.png)

5. Validation error

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/5.png)

6. Main page after successfull login (for company)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/6.png)

7. Main page for company offers

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/7.png)

8. Creating new offer as company

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/8.png)

9. Second step of adding offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/9.png)

10. Adding photos to offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/10.png)

11. Editing existing offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/11.png)

12. Editing existing offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/12.png)

13. Adding new photos to exisitng offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/13.png)

14. View of all jobs that company have depending of their status (Pending, In progress, Archive)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/14.png)

15. Pending job (company can accept it or decline)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/15.png)

16. Job in progress (company can check work tasks that have been already done to notife user on job progress)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/16.png)

17. Application have guards that block unathorized access (for example user can't access sites that are only meant for company)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/17.png)

18. Main page after successfull login (for user)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/18.png)

19. All offers from different companies in choosen category

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/19%20update.png)

20. Displayed company offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/20.png)

21. Displayed company offer

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/21.png)

22. If user is interested in offer it is possible to make request to that company

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/22.png)

23. Job request

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/23.png)

24. Adding new tasks for job requests

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/24.png)

25. User view of all jobs

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/25.png)

26. User can check status of job that have been accepted by company (for example which tasks have been already done)

![1](https://raw.githubusercontent.com/sponey15/JobbieApp/master/client/src/assets/screens%20for%20readme/26.png)
