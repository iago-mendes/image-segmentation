import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'

import {Container} from './styles'

interface Props {
	onFileUploaded: (file: File) => void

	name?: string
	id?: string
}

export function Dropzone({onFileUploaded, name, id}: Props) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0]
			onFileUploaded(file)
		},
		[onFileUploaded]
	)

	const {getRootProps, getInputProps} = useDropzone({
		onDrop,
		accept: {multiple: ['image/*']}
	})

	return (
		<Container {...getRootProps()}>
			<input {...getInputProps()} accept="image/*" name={name} id={id} />
			<p>
				<FiUpload />
				Select an image
			</p>
		</Container>
	)
}
