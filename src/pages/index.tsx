import type {NextPage} from 'next'
import {useEffect, useState} from 'react'
import {BsArrowCounterclockwise} from 'react-icons/bs'
import {FiPlus, FiX, FiPlay} from 'react-icons/fi'

import {Dropzone} from '../components/Dropzone'
import {LoadingSpinner} from '../components/LoadingSpinner'
import {Container} from '../styles/pages/index'
import {NetworkFlow} from '../classes/networkFlow'

const Home: NextPage = () => {
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [networkFlow, setNetworkFlow] = useState<NetworkFlow | null>(null)

	const [selectedColors, setSelectedColors] = useState<string[]>([])
	const [tmpSelectedColor, setTmpSelectedColor] = useState('#ffffff')

	const isReady = networkFlow != null

	useEffect(() => {
		processUploadedImage(uploadedImage)
	}, [uploadedImage])

	function handleUploadImage(file: File) {
		setIsLoading(true)

		setUploadedImage(file)

		setIsLoading(false)
	}

	function handleReset() {
		setUploadedImage(null)
		setNetworkFlow(null)
		setSelectedColors([])

		resetCanvas('uploaded')
		resetCanvas('foreground')
		resetCanvas('background')
	}

	function processUploadedImage(uploadedImage: File | null) {
		const canvas = document.querySelector('#uploaded') as HTMLCanvasElement
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		if (!uploadedImage) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			return
		}

		setIsLoading(true)

		const img = new Image()
		const imageUrl = URL.createObjectURL(uploadedImage)
		img.src = imageUrl

		img.onload = function () {
			if (img.width > 100 || img.height > 100) {
				alert(
					'This algorithm only supports images smaller than 100x100 pixels.'
				)
				setUploadedImage(null)
			} else {
				canvas.width = img.width
				canvas.height = img.height

				ctx.drawImage(img, 0, 0)
				const imageData = ctx.getImageData(0, 0, img.width, img.height)
				const networkFlow = new NetworkFlow()
				networkFlow.computeNodes(imageData)
				setNetworkFlow(networkFlow)
			}

			setIsLoading(false)
		}
	}

	function handleAddSelectedColor() {
		setSelectedColors(previous => {
			if (previous.includes(tmpSelectedColor)) return previous
			else return [...previous, tmpSelectedColor]
		})
	}

	function handleRemoveSelectedColor(color: string) {
		setSelectedColors(previous =>
			previous.filter(selectedColor => selectedColor !== color)
		)
	}

	function renderImageToCanvas(image: ImageData, canvasId: string) {
		const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = image.width
		canvas.height = image.height

		ctx.putImageData(image, 0, 0)
	}

	function resetCanvas(canvasId: string) {
		const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		canvas.width = 0
		canvas.height = 0
	}

	async function handleRun() {
		if (selectedColors.length < 1)
			return alert('Select at least one background color.')

		if (!networkFlow) return

		setIsLoading(true)

		new Promise(resolve => {
			const {foregroundNodes, backgroundNodes} =
				networkFlow.separateForegroundAndBackground(selectedColors)

			const foregroundImage = networkFlow.getImage(foregroundNodes)
			renderImageToCanvas(foregroundImage, 'foreground')

			const backgroundImage = networkFlow.getImage(backgroundNodes)
			renderImageToCanvas(backgroundImage, 'background')

			setIsLoading(false)
			resolve(null)
		})
	}

	return (
		<Container className="page">
			<header>
				<div className="actions">
					<button onClick={handleReset}>
						<BsArrowCounterclockwise />
						Reset
					</button>

					{isReady && (
						<button onClick={handleRun}>
							<FiPlay />
							Run
						</button>
					)}
				</div>

				{isReady && (
					<div className="selected-colors">
						{selectedColors.map(color => (
							<div
								key={color}
								className="selected-color"
								style={{backgroundColor: color}}
							>
								<button
									title="Remove color"
									onClick={() => handleRemoveSelectedColor(color)}
								>
									<FiX />
								</button>
							</div>
						))}
						<div className="new-color">
							<input
								type="color"
								value={tmpSelectedColor}
								onChange={event => setTmpSelectedColor(event.target.value)}
							/>
							<button title="Add color" onClick={handleAddSelectedColor}>
								<FiPlus />
							</button>
						</div>
					</div>
				)}
			</header>

			<main>
				{isLoading && <LoadingSpinner />}
				{!uploadedImage && <Dropzone onFileUploaded={handleUploadImage} />}

				<div className="group">
					<aside>
						{isReady && <h2>Original</h2>}
						<canvas id="uploaded"></canvas>
					</aside>
					<aside>
						{isReady && (
							<div className="info">
								<h3>Instructions:</h3>
								<ol>
									<li>select a background color;</li>
									<li>add color; and</li>
									<li>run.</li>
								</ol>
							</div>
						)}
					</aside>
				</div>
				<div className="group">
					<aside>
						{isReady && <h2>Foreground</h2>}
						<canvas id="foreground"></canvas>
					</aside>
					<aside>
						{isReady && <h2>Background</h2>}
						<canvas id="background"></canvas>
					</aside>
				</div>
			</main>
		</Container>
	)
}

export default Home
