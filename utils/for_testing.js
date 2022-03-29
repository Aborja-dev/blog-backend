const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	const likes = blogs.map(({ likes }) => likes)
	return likes.reduce((total, like) => total + like)
}

const favoriteBlog = (blogs) => {
	const favorite = blogs.sort((a, b) => b.likes - a.likes)[0]
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}
}


module.exports = { dummy, totalLikes, favoriteBlog }