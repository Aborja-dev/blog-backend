export interface ForInsertBlog {
    title: String,
    author: String,
    url: String,
    likes: Number
}

export interface IBlog {
    title: String,
    author: String,
    url: String,
    likes: Number
    id: String
    user?: any
}