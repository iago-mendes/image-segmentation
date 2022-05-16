import styled from 'styled-components'

export const Container = styled.div`
	background: ${p => p.theme.text};
	color: ${p => p.theme.background};
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);

	display: flex;
	flex-direction: column;
	justify-content: space-around;

	padding: 0.5rem;
	width: 100%;

	> div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		cursor: pointer;
		transition: filter 0.2s, transform 0.2s;

		:hover {
			filter: brightness(0.8);
			transform: scale(0.95);
		}

		figure {
			position: relative;

			width: 15vw;
			height: 15vw;
			max-width: 5rem;
			max-height: 5rem;
		}

		h1 {
			font-family: Ubuntu;
			font-size: 1.8rem;
		}
	}

	> ul {
		list-style: none;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;

		li {
			cursor: pointer;
			transition: filter 0.2s, transform 0.2s;

			font-size: 1.25rem;

			:hover {
				filter: brightness(0.8);
				transform: scale(0.95);
			}
		}
	}

	@media (min-width: 750px) {
		flex-direction: row;

		> ul {
			flex-direction: row;
			gap: 1rem;
		}
	}
`
