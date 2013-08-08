(function($){

	$.fn.picture = function(args){

		var defaults = {

			container : null,
			ignorePixelRatio: false,
			useLarger: false,
			insertElement: '>a',
			inlineDimensions: false

        };

		var settings = $.extend({}, defaults, args);

		this.each(function(){

			var breakpoints = [];

			var windowWidth, currentMedia, element, timeoutOffset;

			// Check the device pixel ratio
			var PixelRatio = 1;

			if(!settings.ignorePixelRatio && window.devicePixelRatio !== undefined) {
				PixelRatio = window.devicePixelRatio;
			}

			// Save off the element so it can be easily used inside a function
			element = $(this);

			//Delete the noscript we don't need it now anyway
			element.find('noscript').remove();

			// Initialise the images
			getCurrentMedia(true);

			// Only call the image resize function 200ms after window stops being resized
			timeoutOffset = false;

			$(window).resize(function(){

				if(timeoutOffset !== false) {
					clearTimeout(timeoutOffset);
				}

				timeoutOffset = setTimeout(getCurrentMedia, 200);

			});


			/**
			 * getCurrentMedia
			 *
			 * Checks the window width off the media query types and selects the current one.
			 * Calls the setPicture or setFigure function to set the image.
			 *
			 */
			function getCurrentMedia( init ){

				if(init){

					if(element.get(0).tagName.toLowerCase() === 'picture'){
						element.find('source').each(function(){

							var media, num;

							media = $(this).attr('media');

							if(media){

								num = media.replace(/[^\d.]/g, '');

								breakpoints.push(parseInt(num, 10));
							}

						});

					} else {
						var mediaObj = element.data();

						$.each(mediaObj, function(media){

							var num;

							num = media.replace(/[^\d.]/g, '');

							if(num) {
								breakpoints.push(parseInt(num, 10));
							}

						});
					}
					breakpoints.sort(function(a,b){
						return a - b;
					}); //make sure the largest breakpoint is the last

				}

				var c = 0;

				// Check if user defined container, otherwise take window
				if (settings.container == null){

					windowWidth = ($(window).width()) * PixelRatio;

				}else{

					windowWidth = ($(settings.container).width()) * PixelRatio;

				}

				// Set the c variable to the current media width
				$.each(breakpoints, function(i,v){

					if(parseInt(windowWidth, 10) >= parseInt(v, 10) && parseInt(c, 10) <= parseInt(v, 10)) {
						c = v;
					}
				});

				if (settings.useLarger ){
					var idx = breakpoints.indexOf(c);
					if (idx < breakpoints.length-1) {//make sure we're not already using the largest breakpoint
						c = breakpoints[ idx + 1];
					}
				}

				if(currentMedia !== c){
					currentMedia = c;

					if(element.get(0).tagName.toLowerCase() === 'picture') {
						setPicture();
					} else {
						setFigure();
					}

				}

			}


			/**
			 * setPicture
			 *
			 * Pulls the image src and media attributes from the source tags and sets
			 * the src of the enclosed img tag to the appropriate one.
			 *
			 */
			function setPicture(){

				var sizes = {};

				element.find('source').each(function(){

					var media, path, num;
					media = $(this).attr('media');
					path = $(this).attr('src');

					if(media) {
						num = media.replace(/[^\d.]/g, '');
					} else {
						num = 0;
					}

					sizes[num] = path;

				});

				if(element.find('img').length === 0){

					var prep = '<img src="' + sizes[currentMedia] + '"';

					if( element.attr('style') ) {
						prep += ' style="' + element.attr('style') + '"';
					}

					if( element.attr('alt') ) {
						prep += ' alt="' + element.attr('alt') + '"';
					}

					prep += '>';

					if($(settings.insertElement, element).length === 0){

						element.append(prep);

					}else{

						$(settings.insertElement, element).append(prep);

					}

				}else{

					element.find('img').attr('src', sizes[currentMedia]);

				}

				if( settings.inlineDimensions ) {
					$("<img/>").attr("src", $('img', element).attr("src")).load(function(){
						$('img', element).attr('height', this.height);
						$('img', element).attr('width', this.width);
					});
				}

			}


			/**
			 * setFigure
			 *
			 * Pulls the image src and and media values from the data attributes
			 * and sets the src of the enclosed img tag to the appropriate one.
			 *
			 */
			function setFigure(){

				var sizes = {};

				var mediaObj = element.data();

				$.each(mediaObj, function(media, path){

					var num;
					if (0 === media.indexOf('media')) {
						num = media.replace(/[^\d.]/g, '');

						if(!num) {
							num = 0;
						}

						sizes[num] = path;
					}
				});

				if(element.find('img').length === 0){

					var prep = '<img src="' + sizes[currentMedia] + '"';
					if(element.attr('style')) {
						prep += ' style="' + element.attr('style') + '"';
					}

					if(element.attr('title')) {
						prep += ' alt="' + element.attr('title') + '"';
					}

					prep += '>';

					if($(settings.insertElement, element).length === 0){

						element.append(prep);

					} else {

						$(settings.insertElement, element).append(prep);

					}

				} else {

					$('img', element).attr('src', sizes[currentMedia]);

				}

				if(settings.inlineDimensions){

					$("<img/>").attr("src", $('img', element).attr("src")).load(function(){
						$('img', element).attr('height', this.height);
						$('img', element).attr('width', this.width);
					});

				}

			}

		});

	};

})(jQuery);
