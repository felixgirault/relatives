( function( ) {

	/**
	 *	Constructor.
	 */

	function Scale( ) {

		this._$reference = undefined;
		this._$sizes = $( '.scale-sizes' );
		this._$sizesList = $( '.options-list' );
		this._$precision = $( '.options-precision' );
		this._sizeTemplate = _.template( $( '#scale-size-template' ).html( ));
		this._map = { };

		var _this = this;

		$( '.options' ).on( 'submit', function( event ) {
			event.preventDefault( );
			_this._load( );
		});

		this._$sizes.on( 'click', 'tr', function( event ) {
			_this._setReference( $( this ));
		});

		this._load( );
	}



	/**
	 *	Class for the reference size.
	 */

	Scale.REFERENCE_CLASS = 'scale-reference';



	/**
	 *	Loads sizes.
	 */

	Scale.prototype._load = function( ) {

		this._map = { };
		this._$reference = undefined;
		this._$sizes.empty( );

		var sizes = this._$sizesList.val( ).split( ',' );

		for ( var i = 0; i < sizes.length; ++i ) {
			var size = parseInt( sizes[ i ], 10 );

			$size = $( this._sizeTemplate({
				'index': i,
				'pixels': size
			}));

			this._map[ i ] = {
				'pixels': size,
				'$ems': $size.find( '.scale-ems .scale-value' )
			};

			this._$sizes.append( $size );
		}

		this._setReference( this._$sizes.find( '.scale-size' ).first( ));
	};



	/**
	 *	Sets the reference size.
	 */

	Scale.prototype._setReference = function( $element ) {

		if ( this._$reference ) {
			this._$reference.removeClass( Scale.REFERENCE_CLASS );
		}

		this._$reference = $element;
		this._$reference.addClass( Scale.REFERENCE_CLASS );

		var referenceIndex = this._$reference.attr( 'data-index' );
		var referencePixels = this._map[ referenceIndex ].pixels;
		var precision = this._$precision.val( );

		_( this._map ).each( function( size ) {
			size.$ems.text(
				( size.pixels / referencePixels ).toFixed( precision )
			);
		});
	};


	new Scale( );
}( ));
