import smoothScroll from '../../../node_modules/smooth-scroll/dist/js/smooth-scroll.js';
import mobileNavigation from './mobile-navigation.js';

const maxAlpha = 0.9;
const maxScrollPositionForAlpha = 300;
let isSticky = false;

/**
 * Initializes mobile navigation.
 * Initializes Smooth scroll plugin.
 * Initializes scroll spy set header opacity.
 */
export default function header() {
	const headerEl = document.querySelector( 'header' );

	// Add mobile navigation support
	mobileNavigation( headerEl );

	// Attach smooth scroll to every element with [data-scroll] attribute.
	smoothScroll.init( { speed: 700 } );

	// Add watcher on page scroll to control level of header opacity.
	window.addEventListener( 'scroll', () => scrollSpy( headerEl, window.scrollY ) );
	scrollSpy( headerEl, window.scrollY );
}

/**
 * Watches scroll and set opacity to the header element.
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
 * Counts opacity depends on scroll position, max scroll position and max alpha.
 *
 * @param {Number} currentPosition
 * @param {Number} maxPosition
 * @param {Number} maxAlpha
 * @returns {Number} alpha value from
 */
function countOpacity( currentPosition, maxPosition, maxAlpha ) {
	if ( currentPosition >= maxPosition ) {
		return maxAlpha;
	}

	if ( currentPosition <= 0 ) {
		return 0;
	}

	const progress = ( currentPosition * 100 ) / maxPosition;

	return progress * maxAlpha / 100;
}

/**
 * Sets opacity for header background.
 *
 * @param {HTMLElement} headerEl
 * @param {Number} position Scroll top position
 */
function setAlphaToElement( headerEl, position ) {
	const alpha = countOpacity( position, maxScrollPositionForAlpha, maxAlpha );

	headerEl.style.backgroundColor = `rgba(0, 0, 0, ${ alpha })`;
}
