// FIXME: this module depends on sylvester.js and math-format.js. That should
// be explicit here and perhaps implicit in code that requires this file.
jQuery.extend(KhanUtil, {

	// Computes a random matrix of size m by n, with random elements varying
	// between min and max.
	randMatrix: function( m, n, min, max ) {
		return Matrix.Random( m, n ).map(function( x ) {
			return Math.floor( (max - min + 1) * x ) + min;
		});
	},

	// Calls fn for each element the indexes of each element in matrix A,
	// an instance of type Matrix. Collects each string returned by fn into
	// TeX matrix format.
	mapMatrixToTex: function( A, fn ) {
		var tex = "\\begin{bmatrix}\n";

		var m = A.rows(), n = A.cols();
		for ( var i = 1; i <= m; i++ )
			for ( var j = 1; j <= n; j++ )
				tex += fn.call( A, i, j ) + (j === n ? " \\\\\n" : " &amp; ");

		return tex + "\\end{bmatrix}";
	},

	// Returns TeX code to represent matrix A, an instance of type Matrix.
	matrixTeX: function( A ) {
		return KhanUtil.mapMatrixToTex( A, A.e );
	},

	// Like matrixTeX, but converts floats to fractions. FIXME: this a bit of
	// a hack; at some point we should consider using proper exact arithmetic
	// using rationals etc.
	displayMatrixWithFractions: function( A ) {
		return KhanUtil.mapMatrixToTex( A, function( i, j ) {
			return KhanUtil.toFractionTex( A.e(i, j), 0.001 );
		});
	},

	// Returns TeX code to represent vector, an instance of type Vector.
	// If isRowVector is true, the vector is represented as a row vector
	// (horizontally), otherwise it is represented as a column vector
	// (vertically).
	vectorTeX: function( vector, isRowVector ) {
		var mat = Matrix.create( vector );
		return KhanUtil.matrixTeX( isRowVector ? mat.transpose() : mat );
	},

	// Returns TeX code to display an intermediate representation of A+B
	// where each element is represented in the form "a_ij + b_ij".
	displayMatrixAddition: function( A, B ) {
		Khan.assert( A.isSameSizeAs(B), "matrices A and B must have the same size." );
		return KhanUtil.mapMatrixToTex( A, function( i, j ) {
			return A.e( i, j ) + " + " + B.e( i, j );
		});
	},

	// Returns TeX code displaying the element-by-element expansion of the dot
	// product between u and v.
	displayDotProduct: function( u, v ) {
		Khan.assert( u.dimensions() === v.dimensions(), "u and v should have the same number of dimensions." );
		var d = u.dimensions();
		var tex = "";
		for ( var i = 1; i <= d; i++ ) {
			tex += u.e( i ) + " \\times " + v.e( i );
			if ( i != d ) {
				tex += " + ";
			}
		}
		return tex;
	},

	intermediateInverseMatrix2x2: function ( A ) {
		Khan.assert( A.cols() === 2 && A.rows() === 2, "A must be a 2x2 matrix." );
		return Matrix.create([[A.e(2, 2), -A.e(1, 2)], [-A.e(2,1), A.e(1, 1)]]);
	}

});
