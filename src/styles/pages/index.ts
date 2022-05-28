import styled from 'styled-components'

export const Container = styled.div`
	> header {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;

		display: flex;
		justify-content: space-between;

		> .selected-colors {
			display: flex;
			align-items: center;
			gap: 1rem;
			> .selected-color {
				width: 2rem;
				height: 2rem;
			}
		}
	}

	> main {
		width: 100%;
		max-width: 900px;

		margin: 0 auto;

		> canvas#uploaded {
			width: 300px;
			/* background-color: red; */
		}
	}
`
