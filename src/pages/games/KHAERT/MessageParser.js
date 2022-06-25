import { greetings, goodbyes } from "./constants.js";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    let foundSomething = false;
    if (greetings.includes(lowerCaseMessage)) {
      this.actionProvider.handleHello();
      foundSomething = true;
    }

    if (goodbyes.includes(lowerCaseMessage)) {
      this.actionProvider.handleGoodbye();
      foundSomething = true;
    }

    if (lowerCaseMessage.includes("dog")) {
      this.actionProvider.handleDog();
      foundSomething = true;
    }

    if (!foundSomething) {
      this.actionProvider.handleUnknownText();
    }
  }
}

export default MessageParser;
