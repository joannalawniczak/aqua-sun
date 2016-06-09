import FormValidator from '../../../node_modules/form-validator/dist/form-validator.js';

/**
 * Contact form validation and mock of success message.
 */
export default function contactForm() {
	const slideWrapper = document.querySelector( '.slide-wrapper' );
	const formEl = slideWrapper.querySelector( 'form' );

	// Form validation
	const formValidator = new FormValidator(
		formEl,
		{
			email: {
				required: 'Podaj swój adres email.',
				email: 'Niepoprawny adres email.'
			},
			content: {
				required: 'Napisz wiadomość.'
			}
		},
		{
			success: () => {
				slideWrapper.classList.add( 'message-active' );
				formValidator.reset();
			}
		}
	);

	// Close form message.
	slideWrapper.querySelector( '.message .btn' ).addEventListener( 'click', () => {
		slideWrapper.classList.remove( 'message-active' );
	} );
}
