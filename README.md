# Red Dot Marking System (aka 'When')

## Concept

Jerry Seinfeld had a technique to keep writing jokes: He made a red mark on the calendar each day that he did some writing. His mission then became to keep making a chain of red marks as long as he could. Author John Boyne had a similar system where he used Red Dots in a personal diary.

## Setup for holochain

`cd holo-layer`
`nix-shell`

Create and run a local Holochain conductor process: https://www.youtube.com/watch?v=IR6Sv2jK_WU&t=1653s

(Or you can use this shell script)
`bash start.sh`

Then insert your agent id into this command:
`hc s call install-app-bundle workdir/happ/redDot.happ --app-id=when --agent-key=[[YOUR_AGENT_ID]]`

And run an DNA instance of the hApp on the conductor with websocket open at port 8081:
`hc s run p=8081`

## Setup for client

`cd client`
`npm install`
`npm run dev`

## Setup for tests

`cd client/tests`
`npm install`
`npm test`
