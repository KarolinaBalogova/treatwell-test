/**
 * The distance between the ASCII characters on canvas (influences the grid size)
 * @public
 * @const {number}
 */
const gridSize = 40;

/**
 * Moves the '-' ASCII character's horizontal position on canvas to be perfectly aligned with the rest
 * @public
 * @const {number}
 */
const dashAlignment = -1.25;

/**
 * Box class.
 * Creates a box of defined width and height using a set of ASCII characters.
 */

class Box {
	/**
	 * @param {number} w - The width of the box.
	 * @param {number} h - The height of the box.
	 * @throws {TypeError} Throws an error when width or height are not integers.
	 * @throws {RangeError} Throws an error when width or height are smaller than 2.
	 */
	constructor( w, h ) {
		/**
		 * @private
		 * @const {number}
		 */
		this.w = Number( w );
		this.h = Number( h );

		//Throw an error if width or height are not integers
		if ( !Number.isInteger( this.w ) || !Number.isInteger( this.h ) ) {
			throw new TypeError( "The box dimensions have to be integers." );
		}

		//Throw an error if width or height are smaller than 2
		if ( this.w <= 1 || this.h <= 1 ) {
			throw new RangeError( "The box dimensions have to be bigger than 1." );
		}

		/**
		 * A grid of ASCII characters representing the box, grouped by rows
		 * @const {Array.<string[]>}
		 */
		this.gridChars = this._computeGridChars();
	}

	/**
	 * Computes the grid characters and groups them by row in a 2-dimensional array.
	 * @private
	 * @return {Array.<string[]>} A 2-dimensional array of ASCII characters representing the box grid.
	 */
	_computeGridChars() {
	 	//Initialize the array representing the grid
	 	let gridChars = [];

		//Push the first row to the array
		gridChars.push( this._createRow( '┌', '-', '┐' ) );

		//Push the middle rows to the array (box height - 2) times
		for ( let row = 2; row <= this.h - 1; row++ ) {
			gridChars.push( this._createRow( '|', ' ', '|' ) );
		}

		//Push the last row to the array
		gridChars.push( this._createRow( '└', '-', '┘' ) );

		return gridChars;
	}

	/**
	 * Creates a single row of the box.
	 * @private
	 * @param {string} firstChar - The first character of the row.
	 * @param {string} fillChar - The fill character of the row.
	 * @param {string} lastChar - The last character of the row.
	 * @return {Array.<string>} An array of ASCII characters representing a row.
	 */
	_createRow( firstChar, fillChar, lastChar ) {
		//Initialize the array representing the row
		let rowChars = [];

		//Push the first character to the array
		rowChars.push( firstChar );

		//Push the fill character to the array (box width - 2) times
		for ( let col = 2; col <= this.w - 1; col++ ) {
			rowChars.push( fillChar );
		}

		//Push the last character to the array
		rowChars.push( lastChar );

		return rowChars;
	}

	/**
	 * Draws the box on a HTML5 canvas.
	 * @public
	 * @param {Element} canvas - an instance of a HTML5 canvas element.
	 * @return {Array.<{char: string, posX: number, posY: number}>} An array of objects representing the characters drawn and their canvas position.
	 */
	drawOnCanvas( canvas ) {
		//Initialize the output array (testing purposes)
		let output = [];

		//Get canvas
		const ctx = canvas.getContext( '2d' );

		//Canvas config
		ctx.canvas.width = ( this.w + 1 ) * gridSize;
		ctx.canvas.height = ( this.h + 1 ) * gridSize;
		ctx.font = '12px monospace';
		ctx.textAlign = 'center';

		//Loop through the computed grid characters
		for ( let row = 0; row < this.gridChars.length; row++ ) {
			for ( let col = 0; col < this.gridChars[row].length; col++ ) {
				const char = this.gridChars[row][col];

				//Set character position
				const posX = ( col + 1 ) * gridSize;
				const posY = char === '-' ? ( row + 1 ) * gridSize + dashAlignment : ( row + 1 ) * gridSize;	//posY - dashAlignment ==> align the '-' character horizontally relative to the corner characters

				//Draw character on canvas
				ctx.fillText( char, posX, posY );

				//Push the character and its position to the output array (testing purposes)
				output.push( { char: char, posX: posX, posY: posY } );
			}
		}

		//return output (testing purposes)
		return output;
	}

	/**
	 * Prints the box to the console.
	 * @public
	 * @return {string} The string that is being printed out to the console.
	 */
	printToConsole() {
		//Initialize console output
		let output = '';

		//Join each row element with a space and separate the rows with a newline character
		this.gridChars.map( ( row ) => {
			output += row.join( ' ' ) + '\n';
		} );

		//Log the output string to the console
		console.log( output );

		//return the output string (testing purposes)
		return output;
	}
}
