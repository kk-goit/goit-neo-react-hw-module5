import axios from "axios"

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
const theParams = {
  include_adult: false,
  language: 'en-US',
}
const theHeader = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2ZiYjNkYmYwMzQyZWNlMTMxNGRkYzQzOWM2N2ZjMCIsIm5iZiI6MTczNDI1NjMxNy42MTEsInN1YiI6IjY3NWVhNmJkZDZmNWU4NDU4YjhiMzRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X8L2A1qCtWpibcBuHIM_aBkdNx4PzMxVwIrBMC3AtoE',
}

const doRequest = async ({ url, params = theParams, emptyIsErr = true }) => {
  try {
    const res = await axios.get(url, { 
      headers: theHeader,
      params: params,
    })

    if (emptyIsErr && res.data.total_results == 0)
      throw new Error('Nothing found.')

    return res.data
  } catch (error) {
    if (error instanceof axios.AxiosError && error.status && error.response) 
      throw new Error(`${error.response.data.errors.join('; ')}; with status: ${error.status}`)
    else
      throw error;
  } 
}

const getTrends = async (page = 1) => { 
  return doRequest({ url: 'trending/movie/day', params: { ...theParams, page: page } })
}

const getDetails = async (mId = 0) => { 
  return doRequest({ url: `movie/${mId}` })
}

const getReviews = async (mId = 0, page = 1) => {
  return doRequest({ url: `movie/${mId}/reviews`, params: { ...theParams, page: page }, emptyIsErr: false })
}

const getCredits = async (mId = 0) => {
  return doRequest({ url: `movie/${mId}/credits`, emptyIsErr: false })
}

const doSearch = async (qStr = '', page = 1) => { 
  return doRequest({url: 'search/movie', params: { ...theParams, query: qStr, page: page}})
}

const getURL4Iamge = (img = null) => {
  if (img)
    return `https://image.tmdb.org/t/p/w500/${img}`
  else
    return "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
}

export { getTrends, getDetails, getURL4Iamge, getReviews, getCredits, doSearch }
