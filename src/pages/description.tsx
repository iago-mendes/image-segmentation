import type {NextPage} from 'next'

const Description: NextPage = () => {
	return (
		<div className="page">
			<section>
				<h1>Algorithm</h1>

				<p>
					The algorithm for this project follows the description of the{' '}
					<a
						href="https://www.cs.cmu.edu/~ckingsf/class/02713-s13/lectures/lec21-imageseg.pdf"
						target="_blank"
						rel="nonreferrer noreferrer"
					>
						slides by Carl Kingsford
					</a>
					. Basically, we represent an image as a network flow and find a
					minimum cut, which we use to determine the foreground and background
					pixels.
				</p>

				<p>
					For the construction of the network flow, we create a node for every
					pixel and add 2 extra nodes for the source and the sink. Besides, we
					connect every pixel node to its neighbors with directed edges. We also
					add edges from the source to every pixel node and from the every pixel
					node to the sink. Additionally, we define a penalty for separating
					every pair of pixel nodes and use it for the capacity of the edges
					connecting them. Finally, we define foreground and background
					likehoods for every pixel node and use it for the capacities
					connecting them to the source and sink nodes, respectively.
				</p>

				<p>
					The goal is to use the source (s) to represent the foreground of the
					image and the sink (t) to represent the background. Hence, once the
					network flow is construted, we can find a minimum s-t cut (S, T). The
					nodes in S should be set to the foreground of the image, and the nodes
					in T should be set to the background. With that, the image has been
					segmented.
				</p>
			</section>

			<section>
				<h1>Implementation</h1>
			</section>

			<section>
				<h1>Results</h1>
			</section>
		</div>
	)
}

export default Description
