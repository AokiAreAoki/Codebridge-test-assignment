function splitByKeywords(text: string, highlightKeywords: string[]): HighlightChunk[] {
	if (!text) {
		return []
	}

	highlightKeywords = highlightKeywords.filter(keyword => keyword.length > 0)

	if (highlightKeywords.length === 0) {
		return [{ prevText: text, keyword: '' }]
	}

	const lowercaseKeywords = highlightKeywords.map(keyword => keyword.toLowerCase())
	const chunks: HighlightChunk[] = []

	while (text.length > 0) {
		const lowercaseText = text.toLowerCase()

		const { pos, keyword } = lowercaseKeywords
			.map(lowercaseKeyword => {
				const pos = lowercaseText.indexOf(lowercaseKeyword)

				return pos === -1
					? { pos: text.length, keyword: '' }
					: { pos, keyword: text.slice(pos, pos + lowercaseKeyword.length) }
			})
			.reduce((a, b) => {
				if (a.pos !== b.pos)
					return a.pos < b.pos ? a : b

				return a.keyword.length > b.keyword.length ? a : b
			}, { pos: text.length, keyword: '' })

		const prevText = text.slice(0, pos)
		chunks.push({ prevText, keyword })

		text = text.slice(pos + keyword.length)
	}

	return chunks
}

export interface HighlightChunk {
	prevText: string
	keyword: string
}

export default splitByKeywords