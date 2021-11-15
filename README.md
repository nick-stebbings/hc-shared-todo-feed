# Red Dot Marking System (aka 'When')

## Concept

Jerry Seinfeld had a technique to keep writing jokes: He made a red mark on the calendar each day that he did some writing. His mission then became to keep making a chain of red marks as long as he could. Author John Boyne had a similar system where he used Red Dots in a personal diary. This app is a way of modelling this technique with Holochain and React/Redux.`.*

## Setup for holochain

-`cd holo-layer`
-`nix-shell`

Follow these instructions to create and run a local Holochain conductor: https://www.youtube.com/watch?v=IR6Sv2jK_WU&t=1653s
  - create a new agent
  - install the hApp bundle from `workdir/happ` with `app-id=todofeed` and the agent public key from the command above.
  - Set up an app websockets interface on port 8081

## Setup for client

-`cd client`
-`npm install`
-`npm run dev`

## Setup for tests

-`cd client/tests`
-`npm install`
-`npm test`
