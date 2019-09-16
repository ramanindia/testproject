/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) 
{
	

}
/**
 * define a variable.
 */
 let number1;



/**
 * Animation for chart loading
 * Check out {@link http://bl.ocks.org/mbostock/4341574| this example}
 *
 * @param  {obj} b Data point
 * @return {funct}   Tween function
 * @public
 */
function tweenLoading(b) {
    var i;
 
    b.innerRadius = 0;
    i = d3.interpolate({ startAngle: 0, endAngle: 0}, b);
 
    return function(t) { return shape(i(t)); };
}


 /**
   * Represents a sum of two number.
   * @param {number} a - this is a value.
   * @param {number} b - this is a value.
   * @return {number} result of the sum value.
   */
  function sum(a, b)
  {
    return a + b;
  }
  
  
  