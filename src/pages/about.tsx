import type {NextPage} from 'next'
import Link from 'next/link'

const About: NextPage = () => {
	return (
		<div className="page">
			<section>
				<p>
					This is a final project submitted by{' '}
					<a
						href="https://iago-mendes.me/"
						target="_blank"
						rel="nonreferrer noreferrer"
					>
						Iago Braz Mendes
					</a>{' '}
					for the course CSCI 280 (Algorithms), taken at{' '}
					<a
						href="https://www.oberlin.edu/"
						target="_blank"
						rel="nonreferrer noreferrer"
					>
						Oberlin College
					</a>{' '}
					in the Spring of 2022.
				</p>

				<p>
					If you would like to understand the algorithm and its implementation,
					you can go to the page <Link href="/description">"Description"</Link>.
				</p>
			</section>
		</div>
	)
}

export default About
