import {AppProps} from 'next/app'
import {ThemeProvider} from 'styled-components'
import {Menu} from '../components/Menu'

import GlobalStyle from '../styles/global'
import {theme} from '../styles/theme'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
	return (
		<ThemeProvider theme={theme}>
			<>
				<Menu />
				<Component {...pageProps} />
			</>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default MyApp
