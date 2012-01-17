// FIXME: this module depends on sylvester.js. That should be explicit here and
// perhaps implicit in code that requires this file.
jQuery.extend(KhanUtil, {

	// Computes a random matrix of size m by n, with random elements varying
	// between min and max.
	randMatrix: function( m, n, min, max ) {
		return Matrix.Random( m, n ).map(function( x ){
			return Math.floor( (max - min + 1) * x ) + min;
		});
	},

	// Returns TeX code to represent matrix A, an instance of type Matrix.
	matrixTeX: function( A ) {
		var tex = "\\begin{bmatrix}\n";

		var m = A.rows(), n = A.cols();
		for (var i = 1; i <= m; i++)
			for (var j = 1; j <= n; j++)
				tex += A.e( i , j ) + (j === n ? " \\\\\n" : " &amp; ");

		return tex + "\\end{bmatrix}";
	},

	// Returns TeX code to represent vector, an instance of type Vector. If
	// isRowVector is true, the vector is represented as a row vector
	// (horizontally), otherwise it is represented as a column vector
	// (vertically).
	matrixTeX: function ( vector, isRowVector ) {
		var mat = Matrix.create(vector);
		return KhanUtil.matrixTeX(isRowVector ? mat.transpose() : mat);
	}

});
