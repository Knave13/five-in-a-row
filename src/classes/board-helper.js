const offsets = [
     {x:  0, y:  0}
    ,{x:  0, y: -1}
    ,{x:  1, y: -1}
    ,{x:  1, y:  0}
    ,{x:  1, y:  1}
    ,{x:  0, y:  1}
    ,{x: -1, y:  1}
    ,{x: -1, y:  0}
    ,{x: -1, y: -1}
]

var helper = {
    // returns true if there is any piece adjacent to the specified cell
    checkAdjacent: (board, width, height, i, j, id) => {
        for (var k = 1; k <= 8; k++) {
            let index = (j + offsets[k].y) * width + (i + offsets[k].x)
            if (board[index] != 3 && board[index] != 0) {
                return true
            }
        }
        return false
    },
    // returns 1 if there is any matching piece adjacent to the specified cell
    // returns 2 if there is no matching piece by there is an opponent pice adjacent to the specified cell
    // returns 0 if there are no adjecent pieces to the specified cell
    checkAdjacent2: (board, width, height, i, j, id) => {
        let found = 0
        for (var k = 1; k <= 8; k++) {
            let index = (j + offsets[k].y) * width + (i + offsets[k].x)
            if (board[index] == id) {
                return 1
            }
            else if (board[index] != 3 && board[index] != 0) {
                found = 2
            }
        }
        return found
    },
    getLength: (board, width, height, i, j, id) => {
        let index = j * width + i
        let cell = board[index]
        if (cell != 0 && cell != 3) {
            return 0
        }
        let maxLength = 0
        // iterate through the offsets to 
        for (var k=1; k<=8; k++) {
            let done = false
            let x = i
            let y = j
            let length = 0
            while (!done) {
                x += offsets[k].x
                y += offsets[k].y
                let lookIndex = y * width + x
                if (board[lookIndex] == id) {
                    length++
                }
                else {
                    done = true
                }
            }
            if (length > maxLength) {
                maxLength = length
            }
        }
        return maxLength
    },
    // retrieve the array of lengths surrounding the empty square
    getLengthArray: (board, width, height, i, j, id) => {
        let index = j * width + i
        let cell = board[index]
        if (cell != 0 && cell != 3) {
            return 0
        }
        let lengthArray = [9]
        lengthArray[0] = 0
        // iterate through the offsets to 
        for (var k=1; k<=8; k++) {
            let done = false
            let x = i
            let y = j
            let length = 0
            while (!done) {
                x += offsets[k].x
                y += offsets[k].y
                let lookIndex = y * width + x
                if (board[lookIndex] == id) {
                    length++
                }
                else {
                    done = true
                }
            }
            lengthArray[k] = length
        }
    },
    version: '1.0.0',
    offsets: offsets
}

module.exports = helper