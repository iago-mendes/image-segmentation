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
	}
`