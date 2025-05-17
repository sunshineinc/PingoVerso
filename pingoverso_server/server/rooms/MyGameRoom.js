import { Room } from "colyseus";
import Filter from "bad-words";

const filter = new Filter();

export class MyGameRoom extends Room {
  onCreate() {
    this.setState({ players: {} });

    this.onMessage("move", (client, data) => {
      if (this.state.players[client.sessionId]) {
        this.state.players[client.sessionId].position = data.position;
      }
    });

    this.onMessage("chat", (client, msg) => {
      const clean = filter.clean(msg);
      this.broadcast("chat", { user: client.sessionId, message: clean });
    });
  }

  onJoin(client) {
    this.state.players[client.sessionId] = {
      position: { x: 0, y: 0, z: 0 },
      avatar: "penguin_default"
    };
    console.log(`${client.sessionId} entrou na sala.`);
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
    console.log(`${client.sessionId} saiu da sala.`);
  }
}