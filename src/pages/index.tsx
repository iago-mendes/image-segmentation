import type {NextPage} from 'next'
import {useState} from 'react'
import {BsArrowCounterclockwise} from 'react-icons/bs'

import {Dropzone} from '../components/Dropzone'
import {LoadingSpinner} from '../components/LoadingSpinner'
import {Container} from '../styles/pages/index'

const Home: NextPage = () => {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const uploadedImageLink = uploadedImage
		? URL.createObjectURL(uploadedImage)
		: ''

	function handleUploadImage(file: File) {
		setIsLoading(true)

		setUploadedImage(file)

		setIsLoading(false)
	}

	function handleReset() {
		setUploadedImage(null)
	}

	return (
		<Container>
			<header>
				<div className="actions">
					<button onClick={handleReset}>
						<BsArrowCounterclockwise />
						Reset
					</button>
				</div>
			</header>
			<main>
				{isLoading ? (
					<LoadingSpinner />
				) : !uploadedImage ? (
					<Dropzone onFileUploaded={handleUploadImage} />
				) : (
					<>
						<img
							src={uploadedImageLink}
							alt="Uploaded image"
							className="uploaded"
						/>
					</>
				)}
			</main>
		</Container>
	)
}

export default Home
