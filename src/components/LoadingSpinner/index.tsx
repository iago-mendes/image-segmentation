import {CSSProperties} from 'styled-components'

import {Container} from './styles'

type Props = {
	style?: CSSProperties
}

export function LoadingSpinner({style}: Props) {
	return (
		<Container style={style}>
			<svg>
				<circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
			</svg>
		</Container>
	)
}
