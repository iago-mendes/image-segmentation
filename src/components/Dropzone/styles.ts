import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 30rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${p => p.theme.background};
	border-radius: 1rem;
	outline: 0;
	cursor: pointer;
	transition: transform 0.2s;

	:hover {
		transform: scale(0.98);
	}

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}

	p {
		width: calc(100% - 6rem);
		height: calc(100% - 6rem);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;

		border: ${p => p.theme.text} 1px dashed;
		border-radius: 1rem;

		color: ${p => p.theme.text};
		font-family: Ubuntu;
		font-size: 1.3rem;
		font-weight: bold;

		text-align: center;
		padding: 1rem;

		svg {
			width: 2.5rem;
			height: 2.5rem;
			color: ${p => p.theme.text};
		}
	}
`
