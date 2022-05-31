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
					minimum cut, which we then use to determine the foreground and
					background pixels.
				</p>

				<p>
					For the construction of the network flow, we create a node for every
					pixel and add 2 extra nodes for the source and the sink. Besides, we
					connect every pixel node to its neighbors with directed edges. We also
					add edges from the source to every pixel node and from every pixel
					node to the sink. Additionally, we define a penalty for separating
					every pair of pixel nodes and use it for the capacity of the edges
					connecting them. Finally, we define foreground and background
					likelihoods for every pixel node and use it for the capacities
					connecting them to the source and sink nodes, respectively.
				</p>

				<p>
					The goal is to use the source (s) to represent the foreground of the
					image and the sink (t) to represent the background. Hence, once the
					network flow is constructed, we can find a minimum s-t cut (S, T). The
					nodes in S should be set to the foreground of the image, and the nodes
					in T should be set to the background. With that, the image has been
					segmented.
				</p>
			</section>

			<section>
				<h1>Implementation</h1>

				<p>
					Individual classes were created to represent nodes, edges and network
					flows for this problem. The <code>PixelNode</code> class represents
					the nodes and holds information about its color value, foreground and
					background likelihoods, and forward (out of node) and backward (into
					node) edges. Besides, the <code>Edge</code> class represents the edges
					and holds information about its origin and destination nodes, its
					capacity, and its forward and backward residual values. Finally, the{' '}
					<code>NetworkFlow</code> class represents the network flow and holds
					information about its pixel nodes, edges, source and sink nodes, and
					the original image based on which it was created. Note that, by having
					the residual values within the edges, we can use the network flow to
					represents its own residual graph, without having to create a separate
					data structure.
				</p>

				<p>
					Moreover, it was necessary to make use of additional data structures
					in the implementation of this project in order to make it more
					efficient. For instance, the flow is represented by a{' '}
					<code>HashMap</code> (<code>Map</code>) that maps edges of type{' '}
					<code>Edge</code> to numbers. Another example is a group of pixel
					nodes used across the project (such as to represent a minimum cut),
					which is represented as a <code>Set&lt;PixelNode&gt;</code>, which
					makes checking if a node is included in such a group much faster (
					<code>O(1)</code> instead of the linear time complexity in lists).
				</p>

				<p>
					The most complex computations happen when finding the minimum cut. To
					do so, we use the Ford-Fulkerson algorithm, which can be represented
					in pseudocode as follows:
					<br />
					<code>
						For all edges e, set the flow f(e) = 0
						<br />
						Form residual graph
						<br />
						P = augmenting path
						<br />
						while P is an augmenting path
						<br />
						&nbsp;&nbsp; augment f using P
						<br />
						&nbsp;&nbsp; update residual graph
						<br />
						&nbsp;&nbsp; P = new augmenting path
						<br />
						S = minimum cut constructed from f
						<br />
						return S.
					</code>
				</p>

				<p>
					In the process described above, most of the steps had straightforward
					implementations, except for finding augmenting paths. To find an
					augmenting path, we use a backtracking algorithm that attempts to find
					a valid path in the residual graph from the source to the sink. It
					returns the first valid path that it finds or <code>null</code> if no
					path was found.
				</p>

				<p>
					Finally, it was necessary to define the penalty for the pairs of pixel
					nodes, as well as the foreground and background likelihoods. Foremost,
					it was important to keep all of those values as integers so that the
					computed maximum flow was also integral. That said, the background
					likelihood is computed by comparing the color values of each pixel
					node with the background colors (selected by the user), which results
					in a value between 0 and 255. The foreground likelihood (
					<code>a</code>) is defined to be the complement of the background one
					( <code>b</code> ); that is, <code>a = 255 - b</code>. Lastly, the
					separation penalty for two neighboring pixel nodes is computed by
					checking their foreground and background likelihoods; that is, two
					background nodes and two foreground nodes should be together (high
					penalty), but a background node and a foreground node should be
					separate (low penalty).
				</p>
			</section>

			<section>
				<h1>Results</h1>

				<p>
					The code for this project is available on{' '}
					<a
						href="https://github.com/iago-mendes/image-segmentation"
						target="_blank"
						rel="nonreferrer noreferrer"
					>
						GitHub
					</a>
					.
				</p>

				<p>
					There are a lot of improvement opportunities remaining in this
					project. The most crucial ones involve making it actually work in
					different scenarios, focusing on more complex images. In the tests,
					simplistic images (less than 10x10 pixels) were used to make the
					analysis and debugging easier. Even then, the results are not always
					what we would expect.
				</p>
				<p>Consider the following simplistic image for testing purposes:</p>
				<img src="/images/tests/original.png" alt="" style={{width: '10rem'}} />
				<p>
					When running the algorithm on the above image (selecting the color red
					for the background) we get the following foreground and background
					images, respectively:
				</p>
				<div>
					<img
						src="/images/tests/red-foreground.png"
						alt=""
						style={{width: '10rem', marginRight: '1rem'}}
					/>

					<img
						src="/images/tests/red-background.png"
						alt=""
						style={{width: '10rem'}}
					/>
				</div>

				<p>
					This is expected because we have basically separated warm and cold
					colors. Be as it may, we get unexpected results when using any of the
					other 3 colors present in the test image. In those cases, the entire
					image is set to either foreground or background. The same goes for
					larger and more complex images. This is probably associated with the
					definition for foreground and background likelihoods for every pixel
					node and the computation of the separation penalty for all pairs of
					pixel nodes. For that, I used what intuitively made sense, but further
					research should be done to find the most appropriate way to compute
					those quantities.
				</p>

				<p>
					Another problem is the limit size of the original image. For any
					images with a reasonable size (greater than 100x100 pixels), the whole
					website crashes due to a{' '}
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion"
						target="_blank"
						rel="nonreferrer noreferrer"
					>
						"too much recursion" error
					</a>
					. This is likely related to the computation of augmenting paths, which
					makes use of backtracking.
				</p>

				<p>
					With more time, I would focus on solving the problems mentioned above,
					among other improvements. That said, this project was a good
					opportunity for me to apply concepts learned from class in a real-life
					application.
				</p>
			</section>
		</div>
	)
}

export default Description
