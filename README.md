# Spooky Stories
Created by Avinash VK and Srujan Deshpande

## Inspiration
We wanted to create an easy way to read and make scary stories together with friends.

## What it does
Spooky Stories allows you to create your own spooky stories using a Pass the Story style format. Everyone on the Discord server has a chance to put their own additions into the story! If you're alone, you can make the story yourself :)

## How to use it
Read a written story or make a new one!  
- To read a random story `!boo story random`
- To upvote the story `!boo upvote`
- To downvote the story `!boo downvote`
- To start a new story with a prompt `!boo start`
- To end the story `!boo end`
- To view all the current Channel's stories `!boo story list`

## How we built it (Tech Stack)
1. Node.js with discord.js for the Discord bot
2. Cockroach DB for storing all the stories and votes
3. Google Cloud Platform
  - Computer Engine for the Database
  - Cloud Build
  - Container Registry
  - Cloud Run

## Challenges we ran into
- Working with Cloud Run, Build and App Engine
- Deploying and starting with Cockroach DB

## Accomplishments that we're proud of
It works!

## What we learned
Cockroach DB is pretty cool and CI/CD using GCP is very useful!

## What's next for Spooky Stories
Add more stories, reddit integration, maybe even voice access?
