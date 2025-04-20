//Handling Players
class Player {
  constructor() {
    //Creating Hands
    this.hand = [];
  }
  takeTurn() {
    //Allowing Turns To Function
    let playableCards = this.getPlayableCards();
    if (playableCards.length > 0) {
      this.playCard(playableCards[0]);
    } else {
      this.drawCard();
    }
  }
  playCard(card) {
    let opp = reverse ? 3 - ((turn + 1) % 4) : (turn + 1)  % 4
    //Establishing Played Card
    let playCard = this.hand.splice(card, 1)[0];
    discard.push(playCard);
    //ALL SPECIAL CARDS
    //Reverse
    if (playCard.rank === "Reverse") {
      reverse = !reverse;
      turn++;
    }
    //Wilds
    if (playCard.suit === "wild") {
      let selected = window.prompt(
        "Select A Color from the choices: blue / green / yellow / red"
      );
      if (
        selected !== "blue" &&
        selected !== "yellow" &&
        selected !== "green" &&
        selected !== "red"
      ) {
        selected = window.prompt(
          "Not Applicable: Please Select Again From The Following Choices: blue / green / yellow / red"
        );
        if (
          selected !== "blue" &&
          selected !== "yellow" &&
          selected !== "green" &&
          selected !== "red"
        ) {
          selected = window.prompt(
            "Not Applicable: Please Try Again From The Following Choices: blue / green / yellow / red"
          );
          if (
            selected !== "blue" &&
            selected !== "yellow" &&
            selected !== "green" &&
            selected !== "red"
          ) {
            selected = window.prompt(
              "Not Applicable: Select Properly: blue / green / yellow / red"
            );
          }
        }
      }
      console.log(selected);
      playCard.suit = selected;
      //Plus 4
      if (playCard.rank === "Plus 4") {
        for (let x = 0; x < 4; x++) {
          let plus4 = shuffledDeck.splice(0, 1);
          Players[opp].hand.push(...plus4);
        }
        turn = turn + 1;
      }
    }
    //Plus2
    if (playCard.rank === "Plus 2") {
      for (let x = 0; x < 2; x++) {
        let plus2 = shuffledDeck.splice(0, 1);
        Players[opp].hand.push(...plus2);
      }
      turn = turn + 1;
    }
    //Skip
    if (playCard.rank === "Skip") {
      turn = turn + 1;
    }
  }
  drawCard() {
    //Establishing Drawn Cards
    if (this.hand.length === 0) {
    } 
    else {
      let drawCard = shuffledDeck.splice(Math.floor(Math.random()), 1);
      this.hand.push(...drawCard);
    }
  }
  getPlayableCards() {
    //Establishing Possible Plays
    let PlayableCards = [];
    for (let x = 0; x < this.hand.length; x++) {
      if (
        this.hand[x].suit === discard[discard.length - 1].suit ||
        this.hand[x].rank === discard[discard.length - 1].rank ||
        this.hand[x].suit === "wild"
      ) {
        PlayableCards.push(x);
      }
    }
    return PlayableCards;
  }
}
