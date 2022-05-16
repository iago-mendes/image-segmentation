import type {NextPage} from 'next'

import {Dropzone} from '../components/Dropzone'
import {Container} from '../styles/pages/index'

const Home: NextPage = () => {
	return (
		<Container>
			<h1>Home</h1>
			<Dropzone onFileUploaded={() => {}} />
		</Container>
	)
}

export default Home
