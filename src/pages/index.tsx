import type {NextPage} from 'next'
import {useState} from 'react'
import {BsArrowCounterclockwise} from 'react-icons/bs'

import {Dropzone} from '../components/Dropzone'
import {LoadingSpinner} from '../components/LoadingSpinner'
import {Container} from '../styles/pages/index'
import {NetworkFlow} from '../utils/classes/networkFlow'

const Home: NextPage = () => {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	function handleUploadImage(file: File) {
		setIsLoading(true)

		setUploadedImage(file)

		setIsLoading(false)
	}

	function handleReset() {
		setUploadedImage(null)
	}

	function testBuffer() {
		if (!uploadedImage) return

		const canvas = document.querySelector('#uploaded') as HTMLCanvasElement
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		setIsLoading(true)

		canvas.width = 500
		canvas.height = 500

		const img = new Image()
		const imageUrl = URL.createObjectURL(uploadedImage)

		img.onload = function () {
			canvas.width = img.width
			canvas.height = img.height

			ctx.drawImage(img, 0, 0)
			const imageData = ctx.getImageData(0, 0, img.width, img.height)
			console.log('<< imageData >>', imageData)
			const networkFlow = new NetworkFlow(imageData)
			console.log('<< networkFlow >>', networkFlow)

			setIsLoading(false)
		}

		img.src = imageUrl
	}

	return (
		<Container>
			<header>
				<div className="actions">
					<button onClick={handleReset}>
						<BsArrowCounterclockwise />
						Reset
					</button>
					<button onClick={testBuffer}>Test buffer</button>
				</div>
			</header>
			<main>
				{isLoading ? (
					<LoadingSpinner />
				) : !uploadedImage ? (
					<Dropzone onFileUploaded={handleUploadImage} />
				) : (
					<>
						<canvas id="uploaded"></canvas>
					</>
				)}
			</main>
		</Container>
	)
}

export default Home
