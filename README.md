# Treatwell Tech Graduate Scheme Test

A program written in Vanilla Javascript (ES6), that given a width(w) and height(h), draws a box of size w by h to an HTML5 canvas and to the console.

## Overview

The program has the following structure:

* [index.html](./index.html)

   The HTML file to be run in a browser. Contains a simple form where the user can define the desired width and height of the box, and a canvas element to which the box is drawn. This is where I initialize the program with the `makeBox()` function and run the tests by calling `runTests()`.

* [Box.js](./Box.js)

   Definition of the Box ES6 class, which creates a box of defined width and height using a set of ASCII characters.

   Methods containing the main logic of the application:
   * computeGridChars
       ```javascript
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
        ```
    * createRow
       ```javascript
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
        ```

* [tests.js](./tests.js)

   File containing simple test functions that validate the outcome of the Box methods.

