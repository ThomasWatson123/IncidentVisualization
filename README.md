# Incident Visualization

This application allows fire departments to visualize their json data on a map.
- This application uses reactjs with typescript
- You must have [node](https://nodejs.org/en/download) installed on your computer before running this app
- Reboot your computer after installing node

## Cloning the project

In a terminal run "git clone https://github.com/ThomasWatson123/IncidentVisualization.git", then follow these commands in order
- Once the project has been cloned cd into the IncidentVisualization folder
- Open the .env file for the project and replace "\[METEOSTAT_API_KEY\]", with a api key from here https://rapidapi.com/meteostat/api/meteostat, you can create an account or use an existing account (basic subscription is free). Then once you've created an account copy the X-RapidAPI-Key for the environment variable
- Run "npm install"
- Run "npm run dev"

## App Functionality

Once in the app you can upload a json file with the upload file button, this will place a marker on the map for the location of the incident. You can then click on the marker to see the data for the incident.

## General Information

Improvements
- Make it so the user can upload more than one file and display multiple points on the map at the same time
- Styling improvements
- I would have added the ability to remove the json files (Clear the point on the map)
- I would have setup the google maps library to not be a development version
- I would add error handling to check if the format of the json file is incorrect

Time Spent On App: 5 hours
