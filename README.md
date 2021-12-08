# Farm data exercise
Solita has received an interesting project offer to create a UI and a backend for displaying data from different farms.

Data has been received from the next farms:
* Noora's farm
* Friman Metsola collective
* Organic Ossi's Impact That Lasts plantation 
* PartialTech Research Farm

Data is received as csv-files which need to be parsed for processing.

Data format is
`[Farm name], [datetime or date],[metric type], [metric value]`

Example:
`PartialTech Research Farm,2018-12-31T22:00:00.000Z,rainFall,1.4`

The data can contain errors, so it should be validated before use.

## The exercise

### Fullstack version
Create a web application or mobile application which uses backend to fetch the data.

Backend can be made with any technology. We at Solita use for example (not in preference order) Java/Kotlin/Clojure/C#/Typescript/Golang but
you are free to choose any other technology as well. 

Backend can use a database, or it can be memory based. Real database use is preferable choice because it allows you to show broader skills.

You can also freely choose the frontend (and possibly mobile) technologies to use. The important part is to give good instructions how to run the project.

### Frontend version
Create a frontend or a mobile application which uses the provided simple server. 

Technology choices are not limited.

We take less applicants for frontend/mobile only positions so building a fullstack version gives you more options.

## Stuff to do
Important! 

Doing all of these is not needed for a good exercise result. 

Instead of implementing more features you may consider to concentrate on:
* Good Readme
* Git History
* Tests
* Get features completed
* Writing good code

You can read more about tips from Solita Dev Blog:
[Do's and Dont's of Dev Academy Pre-assignments](https://dev.solita.fi/2021/11/04/how-to-pre-assignments.html)

## Backend
* CSV parsing and validation
* Endpoints to fetch data from farms with different granularities (by month, by metric)
* Aggregate calculation endpoints, endpoint which returns monthly averages, min/max and other statistical analysis
* Add tests
* Input and output validation

## Frontend
* Show data in table format 
* Add filtering options 
* Add tests (fex. React testing library)
* Show data in graphs

### Nice to have
* Endpoints to store new farms and new data
* Add User management
* Running backend in Docker
* Running backend in Cloud
* Add a map which shows the location of the farms and which can be interacted with (you can decide where the farms are)
* Add E2E tests
* Add UI for adding data to farms and creating new farms
* Add User login for data manipulation

## Returning the exercise
Return the exercise as a link to your GitHub repository.

## Validation rules
* Accept only temperature,rainfall and PH data. Other metrics should be discarded
* Discard invalid values with next rules  
* pH is a decimal value between 0 - 14
* Temperature is a celsius value between -50 and 100
* Rainfall is a positive number between 0 and 500
* Data may be missing from certain dates

## Running the server for frontend project
* Install Java runtime environment (version 8 or newer)
* Clone the repository
* start the server with command `java -jar bin/exercise-server.jar`
* You can view OpenApi-documentation from http://localhost:8080
* Create a GitHub issue if you run in problems with the server
