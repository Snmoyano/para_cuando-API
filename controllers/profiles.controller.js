const { request } = require('express')
const ProfilesService = require('../services/profiles.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const profilesService = new ProfilesService()

const getProfiles = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let profiles = await profilesService.findAndCount(query)
    const results = getPagingData(profiles, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addProfile = async (request, response, next) => {
  try {
    let { body } = request
    let profile = await profilesService.createProfile(body)
    return response.status(201).json({ results: profile })
  } catch (error) {
    next(error)
  }
}

const getProfile = async (request, response, next) => {
  try {
    let { id } = request.params
    let profiles = await profilesService.getProfileOr404(id)
    return response.json({ results: profiles })
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let profile = await profilesService.updateProfile(id, body)
    return response.json({ results: profile })
  } catch (error) {
    next(error)
  }
}

const removeProfile = async (request, response, next) => {
  try {
    let { id } = request.params
    let profile = await profilesService.removeProfile(id)
    return response.json({ results: profile, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

const getOwnProfile = async(request , response , next) => {
  const id = request.user.id
  console.log(id)
  try {
    const profile = await profilesService.findOwnProfileByUserID(id)
    return response.json(profile)
  } catch (error) {
    next(error)
  }
    
}

module.exports = {
  getProfiles,
  addProfile,
  getProfile,
  updateProfile,
  removeProfile,
  getOwnProfile
}
