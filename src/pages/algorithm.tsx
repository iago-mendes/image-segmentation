import type {NextPage} from 'next'

const Algorithm: NextPage = () => {
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
					node to the sink.
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

export default Algorithm
