import { createMachine } from "xstate";
const voteButtonPromise = createMachine({
  "id": "Machine Name",
  "initial": "pending",
  "predictableActionArguments": true,
  "states": {
    "pending": {
      "on": {
        "AUTHENTICATED": {
          "target": "loggedIn"
        }
      }
    },
    "loggedIn": {
      "on": {
        "DIDNOTVOTE": {
          "target": "canVote"
        },

        "DIDVOTE": { "target": "didVote" }
      }
    },
    "didVote": {
      "on": {
        "VOTE1": {
          "target": "highlightFirst"
        },

        "VOTE2": {
          "target": "highlightSecond"
        }
      }
    },
    "canVote": {
      "on": {
        "VOTE": {
          "target": "didVote"
        }
      }
    },
    "highlightFirst": {},
    "highlightSecond": {}
  }
});


export default voteButtonPromise;
