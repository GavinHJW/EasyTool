import React, { useState, useEffect } from 'react'

function LikeButton() {
	// const [likeObj, setLikeObj] = useState({ like: 0, on: true });
	const [like, setLike] = useState(0)
	const [on, setOn] = useState(true)
	useEffect(() => {
		document.title = `helle  ${like} `
		const updateLike = (event: MouseEvent) => {
			window.console.log(like)
			setLike(like + event.clientX)
		}
		document.addEventListener('click', updateLike)
		return () => {
			document.removeEventListener('click', updateLike)
		}
	}) // 第一次渲染和每次刷新执行
	return (
		<>
			<button
				type="button"
				onClick={() => {
					setLike(like + 1)
				}}
			>
				{like}
			</button>
			<button
				type="button"
				onClick={() => {
					setOn(!on)
				}}
			>
				{on ? 'on' : 'off'}
			</button>
		</>
	)
}

export default LikeButton
