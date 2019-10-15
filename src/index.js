'use strict'

class Sudoku {

	constructor(board, size, empty_symb) {
    this.board = new Array(size);
    this.size = size;
    this.empty_symb = empty_symb;
    
    for (let i = 0; i < size; i++) {
      this.board[i] = new Array(size);
      for (let j = 0; j < size; j++) {
				this.board[i][j] = board[i][j];
			}
    }
  }
  
  isInRow(row, number) {
		for (let i = 0; i < this.size; i++) {
			if (this.board[row][i] === number) {
        return true;
      }
    }
		return false;
	}
	
	isInCol(col, number) {
		for (let i = 0; i < this.size; i++) {
			if (this.board[i][col] === number) {
        return true;
      }
    }
		return false;
	}
	
	isInBox(row, col, number) {
		let r = row - row % 3;
		let c = col - col % 3;
		
		for (let i = r; i < r + 3; i++) {
			for (let j = c; j < c + 3; j++) {
				if (this.board[i][j] === number) {
          return true;
        }
      }
    }
		return false;
	}
	
	isOk(row, col, number) {
		return !this.isInRow(row, number)  &&  !this.isInCol(col, number)  &&  !this.isInBox(row, col, number);
  }
  
  solve() {
    for (let row = 0; row < this.size; row++) {
     for (let col = 0; col < this.size; col++) {
      if (this.board[row][col] === this.empty_symb) {
        for (let number = 1; number <= this.size; number++) {
          if (this.isOk(row, col, number)) {
            this.board[row][col] = number;

            if (this.solve()) {
              return true;
            } else {
              this.board[row][col] = this.empty_symb;
            }
          }
        }
        return false;
       }
      }
     }
     return true;
  }
}

module.exports = function solveSudoku(matrix) {
  let size = 9;
  let empty = 0;

	let sudoku = new Sudoku(matrix, size, empty);
  sudoku.solve();

  return sudoku.board;
}
