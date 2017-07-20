export default class Bot {
    constructor() {
        if (this.constructor === Bot) {
            throw new TypeError('Abstract class "Bot" cannot be instantiated directly.'); 
        }

        if (this.botId === undefined) {
            throw new TypeError('Class must extend "Bot" class with botId property')
        }

        if (this.botName === undefined) {
            throw new TypeError('Class must extend "Bot" class with botName property');
        }

        if (this.nextMove === undefined) {
            throw new TypeError('Class must extend "Bot" class with nextMove method')
        }

        // if (this.activeSymbol === undefined) {
        //      throw new TypeError('Class must extend "Bot" class with activeSymbol property')
        // }

        if (this.primarySymbol === undefined) {
            throw new TypeError('Class must extend "Bot" class with primarySymbol property')
        }

        if (this.alternateSymbol === undefined) {
            throw new TypeError('Class must extend "Bot" class with alternateSymbol property')
        }

        if (this.strategy === undefined) {
            throw new TypeError('Class must extend "Bot" class with strategy property')
        }

        if (this.version === undefined) {
            throw new TypeError('Class must extend "Bot" class with version property')
        }
    }
}
