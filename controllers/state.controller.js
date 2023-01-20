const StatesService = require('../services/state.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const statesService = new StatesService()

const getStates = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let states = await statesService.findAndCount(query)
    const results = getPagingData(states, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addState = async (request, response, next) => {
  try {
    let { body } = request
    let state = await statesService.createState(body)
    return response.status(201).json({ results: state })
  } catch (error) {
    next(
      response.status(400).json({
        message: error.message,
        fields: {
          name: 'String',
          country_id: 'String',
          city_id: 'String',
        },
      })
    )
  }
}

const getState = async (request, response, next) => {
  try {
    let { id } = request.params
    let states = await statesService.getStateOr404(id)
    return response.json({ results: states })
  } catch (error) {
    next(error)
  }
}

const updateState = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let state = await statesService.updateState(id, body)
    return response.json({ results: state })
  } catch (error) {
    next(error)
  }
}

const removeState = async (request, response, next) => {
  try {
    let { id } = request.params
    let state = await statesService.removeState(id)
    return response.json({ results: state, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getStates,
  addState,
  getState,
  updateState,
  removeState,
}
