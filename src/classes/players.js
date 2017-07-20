function requireAllContext(requireContext) {
  return requireContext.keys().map(requireContext);
}

const modules = requireAllContext(require.context('../bots', false, /.*.js$/))
let playerOne = null;
let playerTwo = null;
let symbol = ''

export default class Players {
  getPlayer(index) {
    if (index == 0) {
      return playerOne
    }
    else if (index == 1) {
      return playerTwo
    }

    return "Invalid Player Index"
  }

  loadPlayerOne(index) {
    playerOne = new modules[index].default({id: 1})
    symbol = playerOne.primarySymbol
    playerOne.activeSymbol = symbol
    console.log('Player One loaded: ', playerOne.botId, playerOne.activeSymbol)
  }
  
  loadPlayerTwo(index) {
    playerTwo = new modules[index].default({id: 2})
    if (playerTwo.primarySymbol == symbol) {
      playerTwo.activeSymbol = playerTwo.alternateSymbol
    }
    else {
      playerTwo.activeSymbol = playerTwo.primarySymbol
    }
    console.log('Player Two loaded: ', playerTwo.botId, playerTwo.activeSymbol)
  }

  getPlayerCount() {
    return modules.length;
  }
}