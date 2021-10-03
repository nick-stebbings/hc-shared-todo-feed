# Holochain hApp 'Hello-World' with scaffolding for WebSockets connection
*The frontend has react and a redux-toolkit template set up for state management in Typescript with `typesafe-actions`.*

## Setup for holochain

-`cd holo-layer`
-`nix-shell`

Follow these instructions to create and run a local Holochain conductor: https://www.youtube.com/watch?v=IR6Sv2jK_WU&t=1653s
  - create a new agent
  - install the hApp bundle from `workdir/happ` with `app-id=insta` and the agent public key from above.
  - Set up an app websockets interface on port 8081

## Setup for client

-`cd client`
-`npm install`
-`npm run dev`

## Setup for tests

-`cd client/tests`
-`npm install`
-`npm test`
