import FormValidator from '../../../node_modules/form-validator/dist/form-validator.es6.js';

/**
 * Validates contact form and mocks success message.
 */
export default function contactForm() {
	const slideWrapper = document.querySelector( '.slide-wrapper' );
	const formEl = slideWrapper.querySelector( 'form' );
	const submitEl = formEl.querySelector( '.btn' );

	// Form validation
	const formValidator = new FormValidator( formEl, {
		rules: {
			email: {
				required: 'Podaj swój adres email.',
				email: 'Niepoprawny adres email.'
			},
			content: {
				required: 'Napisz wiadomość.'
			}
		},
		success: ( e ) => {
			e.preventDefault();

			submitEl.classList.add( 'loading' );
			formValidator.disable();

			setTimeout( () => {
				slideWrapper.classList.add( 'message-active' );
				submitEl.classList.remove( 'loading' );
				formValidator.reset();
				formValidator.enable();
			}, 3000 );
		}
	} );

	// Close form message.
	slideWrapper.querySelector( '.message .btn' ).addEventListener( 'click', () => {
		slideWrapper.classList.remove( 'message-active' );
	} );
}
