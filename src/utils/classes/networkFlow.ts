import {PixelNode} from './pixelNode'

const sourceNode: PixelNode = new PixelNode(0, 0, 0, 0, 0, 0)
const sinkNode: PixelNode = new PixelNode(0, 0, 0, 0, 0, 0)

export class NetworkFlow {
	constructor(image: ImageData) {
		for (let row = 0; row < image.height; row++) {
			for (let column = 0; column < image.width; column++) {
				const pixelBaseIndex = row * image.height + column

				const redValue = image.data[pixelBaseIndex + 0]
				const greenValue = image.data[pixelBaseIndex + 1]
				const blueValue = image.data[pixelBaseIndex + 2]
				const alphaValue = image.data[pixelBaseIndex + 3]

				const pixelNode = new PixelNode(
					redValue,
					greenValue,
					blueValue,
					alphaValue,
					row,
					column
				)
				console.log('<< pixelNode >>', JSON.stringify(pixelNode))
			}
		}
	}
}
