/* Global Box */

function testBoxConstructor() {
	let box;
	let msg;

	//Check if constructor throws an exception when box dimensions are smaller than 2 / not integers
	msg = 'The constructor should throw an exception when box dimensions are smaller than 2 / not integers';

	try {
		box = new Box( 0, 0 );
		console.assert( false, { msg } );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	try {
		box = new Box( 1, 2 );
		console.assert( false, { msg } );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	try {
		box = new Box( -9, 20.2 );
		console.assert( false, { msg } );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	try {
		box = new Box( 'hi', 2 );
		console.assert( false, { msg } );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	//Check if constructor does NOT throw an exception when box dimensions are integers bigger than 1
	msg = 'The constructor should NOT throw an exception when box dimensions are integers bigger than 1';

	try {
		box = new Box( 13, 16 );
	} catch( invalidArgumentException ) {
		console.assert( false, msg );
	}
}

function testGridChars() {
	let box;
	let msg;

	//Check if gridChars is an array whose length matches the box dimensions
	msg = 'gridChars should be an array whose length matches the box dimensions';

	box = new Box( 31, 120 );
	console.assert( Array.isArray( box.gridChars ) && box.gridChars.length === 120, { msg } );
	console.assert( Array.isArray( box.gridChars ) && box.gridChars[0].length === 31, { msg } );
	console.assert( Array.isArray( box.gridChars ) && box.gridChars[119].length === 31, { msg } );
}

function testConsoleOutput() {
	let box;
	let msg;

	//Check if console output is correct
	msg = 'Console should return a different output for the specified dimensions';

	box = new Box( 3, 3 );
	console.assert( box.printToConsole() === '┌ - ┐\n|   |\n└ - ┘\n', { msg } );

	box = new Box( 10, 2 );
	console.assert( box.printToConsole() === '┌ - - - - - - - - ┐\n└ - - - - - - - - ┘\n', { msg } );
}

function testCanvasOutput() {
	const canv = document.getElementById( 'canvas' );
	let box;
	let msg;

	//Check if canvas outputs w * h number of characters
	box = new Box( 51, 34 );
	console.assert( box.drawOnCanvas( canv ).length === 51 * 34, 'Canvas should output 51 * 34 = 1734 number of characters' );

	//Check if canvas outputs the correct characters on right positions
	box = new Box( 3, 9 );
	console.assert( box.drawOnCanvas( canv )[2]['posX'] === 3 * 40, 'Canvas should output 3rd column at X position of 3 * 40 = 120' );
	console.assert( box.drawOnCanvas( canv )[16]['posY'] === 6 * 40, 'Canvas should output 6th row at X position of 6 * 40 = 240' );
	console.assert( box.drawOnCanvas( canv )[0]['posY'] === 1 * 40, 'Canvas should output the first row at Y position of 1 * 40 = 40' );
	console.assert( box.drawOnCanvas( canv )[1]['posY'] === 1 * 40 - 1.25, 'Canvas should output the first row of the - characters at Y position of 1 * 40 - 1.25 = 38.75' );
	console.assert( box.drawOnCanvas( canv )[0]['char'] === '┌', 'Canvas should output ┌ as the first character' );
	console.assert( box.drawOnCanvas( canv )[7]['char'] === ' ', 'Canvas should output an empty string in the middle' );
}

function runTests() {
	testBoxConstructor();
	testGridChars();
	testConsoleOutput();
	testCanvasOutput();
}
