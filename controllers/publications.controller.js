const PublicationsService = require('../services/publications.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationsService = new PublicationsService()

const getPublications = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publications = await publicationsService.findAndCount(query)
    const results = getPagingData(publications, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addPublication = async (request, response, next) => {
  try {
    let { body } = request
    const userId = request.user.id
    let publication = await publicationsService.createPublication(body , userId)
    return response.status(201).json({ results: publication })
  } catch (error) {
    next(
      response.status(400).json({
        message: error.message,
        fields: {
          profile_id: 'String',
          publication_type_id: 'String',
          title: 'String',
          description: 'String',
          content: 'String',
          picture: 'String',
          city_id: 'String',
          image_url: 'String',
        },
      })
    )
  }
}

const getPublication = async (request, response, next) => {
  try {
    let { publication_id } = request.params
    let publication = await publicationsService.getPublicationOr404(publication_id)
    if (publication) {
      return response.status(200).json({ results: publication })
    } else {
      return response.status(404).json({message: 'Invalid ID'})
    }
  } catch (error) {
    next(error)
  }
}

const updatePublication = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let publication = await publicationsService.updatePublication(id, body)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const removePublication = async (request, response, next) => {
  try {
    let { id } = request.params
    let publication = await publicationsService.removePublication(id)
    return response.json({ results: publication, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublications,
  addPublication,
  getPublication,
  updatePublication,
  removePublication,
}
