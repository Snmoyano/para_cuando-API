const RolesService = require('../services/roles.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const rolesService = new RolesService()

const getRoles = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await rolesService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addRol = async (request, response, next) => {
  try {
    let { body } = request
    let rol = await rolesService.createRol(body)
    return response.status(201).json({ results: rol })
  } catch (error) {
    next(error)
  }
}

const getRol = async (request, response, next) => {
  try {
    let { id } = request.params
    let roles = await rolesService.getRolOr404(id)
    return response.json({ results: roles })
  } catch (error) {
    next(error)
  }
}

const updateRol = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let rol = await rolesService.updateRol(id, body)
    return response.json({ results: rol })
  } catch (error) {
    next(error)
  }
}

const removeRol = async (request, response, next) => {
  try {
    let { id } = request.params
    let rol = await rolesService.removeRol(id)
    return response.json({ results: rol, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getRoles,
  addRol,
  getRol,
  updateRol,
  removeRol,
}
