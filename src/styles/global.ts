import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: ${p => p.theme.background};
		color: ${p => p.theme.text};
	}

	body, input, textarea, button {
		font-family: Roboto;
	}

	button {
		cursor: pointer;
	}

	a {
		color: inherit;
		text-decoration: none;
		font-weight: bold;

		:hover {
			text-decoration: underline;
		}
	}

	.page {
		width: 100%;
		max-width: 900px;

		padding: 2rem;
		margin: 0 auto;

		> section {
			margin-bottom: 2.5rem;

			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}
	}
`
