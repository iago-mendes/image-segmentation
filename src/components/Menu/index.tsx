import Image from 'next/image'
import Link from 'next/link'
import {Container} from './styles'

export function Menu() {
	return (
		<Container>
			<Link href="/">
				<div>
					<figure>
						<Image src="/icon.svg" alt="Icon showing a graph" layout="fill" />
					</figure>
					<h1>Image segmentation</h1>
				</div>
			</Link>

			<ul>
				<Link href="/">
					<li>Home</li>
				</Link>
				<Link href="/description">
					<li>Description</li>
				</Link>
				<Link href="/about">
					<li>About</li>
				</Link>
			</ul>
		</Container>
	)
}
