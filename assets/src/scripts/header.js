import smoothScroll from '../../../node_modules/smooth-scroll/dist/js/smooth-scroll.js';

const maxAlpha = 0.9;
const maxScrollPositionForAlpha = 300;
const headerEl = document.querySelector( 'header' );
let isSticky = false;

/**
 * Initialization of header scripts.
 */
export default function header() {
	// Toggle mobile header.
	headerEl.querySelector( '.toggle-menu' ).addEventListener( 'click', ( e ) => {
		e.preventDefault();
		headerEl.classList.toggle( 'menu-active' );
	} );

	// Attach smooth scroll to menu items.
	[].forEach.call( headerEl.querySelectorAll( 'ul a' ), ( el ) => {
		el.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			smoothScroll.animateScroll( e.target.hash );

			// Close mobile navigation after clicking on menu item.
			headerEl.classList.remove( 'menu-active' );
		} );
	} );

	// Add watcher on page scroll to control level of header opacity.
	window.addEventListener( 'scroll', () => scrollSpy( headerEl, window.scrollY ) );
	scrollSpy( headerEl, window.scrollY );

	// Initialization of smooth scroll plugin.
	smoothScroll.init( { speed: 700 } );
}

/**
 * Watch on scroll change and set opacity to the header element.
 *
 * @param {HTMLElement} headerEl
 * @param {Number} position scroll top position
 */
function scrollSpy( headerEl, position ) {
	setAlphaToElement( headerEl, position );

	if ( !isSticky && position ) {
		isSticky = true;
		headerEl.classList.add( 'sticky' );
	} else if ( isSticky && !position ) {
		isSticky = false;
		headerEl.classList.remove( 'sticky' );
	}
}

/**
 * Count alpha depends on scroll position, max scroll position and max alpha.
 *
 * @param {Number} currentPosition
 * @param {Number} maxPosition
 * @param {Number} maxAlpha
 * @returns {Number} alpha value from
 */
function countAlpha( currentPosition, maxPosition, maxAlpha ) {
	if ( currentPosition >= maxPosition ) {
		return maxAlpha;
	}

	if ( currentPosition <= 0 ) {
		return 0;
	}

	let progress = ( currentPosition * 100 ) / maxPosition;
	return progress * maxAlpha / 100;
}

/**
 * Set opacity for header background.
 *
 * @param {HTMLElement} headerEl
 * @param {Number} position scroll top position
 */
function setAlphaToElement( headerEl, position ) {
	const alpha = countAlpha( position, maxScrollPositionForAlpha, maxAlpha );

	headerEl.style.backgroundColor = `rgba(0, 0, 0, ${ alpha })`;
}
