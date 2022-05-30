import styled from 'styled-components'

export const Container = styled.div`
	> header {
		width: 100%;

		margin-top: 1.5rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		button {
			transition: filter 0.2s, transform 0.2s;

			:hover {
				filter: brightness(0.75);
				transform: scale(0.95);
			}
		}

		> .actions {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			> button {
				display: flex;
				align-items: center;
				gap: 0.25rem;

				padding: 0.25rem 0.5rem;
				border: none;

				background-color: ${p => p.theme.text};
				color: ${p => p.theme.background};
				border-radius: 0.25rem;
			}
		}

		> .selected-colors {
			display: flex;
			align-items: center;
			gap: 1rem;

			> .selected-color {
				width: 2rem;
				height: 2rem;

				border-radius: 0.25rem;
				overflow: hidden;

				> button {
					margin-left: auto;
					padding: 0.2rem;
					border-radius: 0.25rem;

					display: flex;
					align-items: center;
					justify-content: center;

					border: none;
					background-color: ${p => p.theme.background}80;
					color: ${p => p.theme.text};

					transition: background-color 0.2s;

					:hover {
						background-color: ${p => p.theme.background};
					}
				}
			}

			> .new-color {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;

				> input {
					background-color: ${p => p.theme.background};
					border: ${p => p.theme.text} 2px solid;
					border-radius: 0.25rem;
				}

				> button {
					display: flex;
					align-items: center;
					justify-content: center;

					background-color: ${p => p.theme.text};
					color: ${p => p.theme.background};

					border: none;
					border-radius: 0.25rem;
					padding: 0.4rem 0.5rem;
				}
			}
		}
	}

	> main {
		width: 100%;

		> canvas {
			width: 300px;
		}
	}
`
