const BaseURL = 'https://api.spaceflightnewsapi.net'

function prefix(path: string) {
  return `${BaseURL}${path}`
}

export const EndPoints = {
  articles: () => prefix('/v4/articles'),
  article: (id: string) => prefix(`/v4/articles/${id}`),
}