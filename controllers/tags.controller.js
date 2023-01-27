const TagsService = require('../services/tags.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const tagService = new TagsService()

const getTags = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let tags = await tagService.findAndCount(query)
    const results = getPagingData(tags, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addTag = async (request, response, next) => {
  try {
    let { body } = request
    let tags = await tagService.createTag(body)
    if (tags) {
      return response.status(201).json({ results: tags })
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

const getTag = async (request, response, next) => {
  try {
    let { id } = request.params
    let tags = await tagService.getTagOr404(id)
    return response.json({ results: tags })
  } catch (error) {
    next(error)
  }
}

const updateTag = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let tag = await tagService.updateTag(id, body)
    return response.json({ results: tag })
  } catch (error) {
    next(error)
  }
}

const removeTag = async (request, response, next) => {
  try {
    let { id } = request.params
    let tag = await tagService.removeTag(id)
    return response.json({ results: tag, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTags,
  addTag,
  getTag,
  updateTag,
  removeTag,
}
