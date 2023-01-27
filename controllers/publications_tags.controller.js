const PublicationsTagsService = require('../services/tags.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationTagService = new PublicationsTagsService()

const getPublicationsTags = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publicationsTags = await publicationTagService.findAndCount(query)
    const results = getPagingData(publicationsTags, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addPublicationTag = async (request, response, next) => {
  try {
    let { body } = request
    let publicationtag = await publicationTagService.createTag(body)
    if (publicationtag) {
      return response.status(201).json({ results: publicationtag })
    }
  } catch (error) {
    next(
      response.status(400).json({
        message: error.message,
        fields: {
          name: 'String',
        },
      })
    )
  }
}

const getPublicationTag = async (request, response, next) => {
  try {
    let { id } = request.params
    let publicationTag = await publicationTagService.getPublicationTagOr404(id)
    return response.json({ results: publicationTag })
  } catch (error) {
    next(error)
  }
}

const updatePublicationTag = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let publicationTag = await publicationTagService.updateTag(id, body)
    return response.json({ results: publicationTag })
  } catch (error) {
    next(error)
  }
}

const removePublicationTag = async (request, response, next) => {
  try {
    let { id } = request.params
    let publicationTag = await publicationTagService.removeTag(id)
    return response.json({ results: publicationTag, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublicationsTags,
  addPublicationTag,
  getPublicationTag,
  updatePublicationTag,
  removePublicationTag,
}
