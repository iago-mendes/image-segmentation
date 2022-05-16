import Link from "next/link";
import { Container } from "./styles";

export function Menu() {
	return (
		<Container>
			<h1>Image segmentation</h1>

			<ul>
				<Link href="/">
					<li>Home</li>
				</Link>
				<Link href="/algorithm">
					<li>Algorithm</li>
				</Link>
				<Link href="/about">
					<li>About</li>
				</Link>
			</ul>
		</Container>
	)
}