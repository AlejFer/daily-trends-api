# daily-trends-api

API that exposes a feed of news, gathered from the newspapers El Mundo and El País through web scrapping technique

<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is an API that exposes a feed of news, it allows the user to create news and store them in the API as well as it gathers from the most important newspapers in the market (El Mundo and El País) the feed of news of the current day, so the API clients are always up to date on the matters that are going on across the world.

In order to get the feed of news from those newspapers this API uses a web scraping technique specifically design for given providers.

Of course, it was design in a way that more providers could be added into the system by requiring the minimun amount of changes and time. You may also suggest changes by forking this repo and creating a pull request or opening an issue!

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section lists all major frameworks/libraries used to bootstrap the DAILY-TRENDS-API.

* [Express.JS](https://expressjs.com/es/)
* [Mongoose](https://mongoosejs.com/)
* [Cheerio](https://cheerio.js.org/)
* [Axios](https://axios-http.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The following are the instructions to set up the API project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have Docker and Docker-Compose installed in your system
* [Docker](https://www.docker.com/)
* [Docker-Compose](https://docs.docker.com/compose/)

### Installation

_Lets launch the project locally._

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/daily-trends-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Launch MongoDB services `docker-compose.mongo.yml`
   ```sh
   docker-compose -f ./docker-compose.mongo.yml up
   ```
4. Start project in dev mode
   ```sh
   npm run dev
   ```

_You can also launche all the project from `docker-compose.yml`._

1. Launch API with docker `docker-compose.mongo.yml`
   ```sh
   docker-compose up
   ```

* Docker-compose
  The Dockerfile will execute the script `init.script.sh` on build to set the accuarate environment variables according to the deploy env specified in the ARG/ENV NODE_ENV. By default it sets environment to development.
  The file `docker-compose` is currently setting NODE_ENV to development as well.
  On directory /environment/ you'll find the env config for development and staging, additional env config could be added for production or other environments.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

API docs.

* Feed Model
  ```txt
   {
     "date": "2022-05-15",
     "header": "Eurovisión",
     "description": "Ganador de Eurovisión",
     "figure": "http://img.png",
     "externalLink": "http://provider/feed",
     "externalSource": "provider",
     "id": "125-35-514",
   }
   ```

* GET /feed
  ```txt
   Get all feeds
   ```
* GET /feed/:id
  ```txt
   Get feed by :id
   ```
* GET /feed/today
  ```txt
   Get all feeds created from the API, as well as the top 5 news from each provider, for the current day
   ```
* POST /feed
  ```txt
   Creates a feed. Body => FeedDTO. Required fields in body => { "date": "2022-05-15", "header": "Ganador de Eurovisión" }
   ```
* PATCH /feed/:id
  ```txt
   Updated feed by :id. Body => FeedDTO
   ```
* DELETE /feed/:id
  ```txt
   DELETE feed by :id
   ```



<p align="right">(<a href="#top">back to top</a>)</p>
