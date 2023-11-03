const axios = require("axios");// Import the axios library for making HTTP requests.
const express = require("express");// Import the express framework for building the web server.

const PORT = 8080; // Set the port number to 8080

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  axios
    .get("https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=10")
    .then((result) => {
      // Extract and format the data for each activity
      const activities = result.data.map((activity) => ({
        id: activity.id, // Format the 'id' property
        published: activity.published, // Format the 'published' property
        title: activity.title, // Format the 'title' property
        actor: {
          displayName: activity.actor.displayName,
        },
      }));

      // Limit the number of activities to 10
      const selectedActivities = activities.slice(0, 10);

      // Send the formatted data as the response
      res.json(selectedActivities);
    })
    .catch((err) => {
      console.log(err);
    });
});
