const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

class CountriesService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: ['updated_at', 'created_at'],
      },
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const countries = await models.Countries.findAndCountAll(options)
    return countries
  }

  async createCountry({ name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let newCountry = await models.Countries.create(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()
      return newCountry
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getCountryOr404(id) {
    let country = await models.Countries.findByPk(id)

    if (!country) throw new CustomError('Not found Country', 404, 'Not Found')

    return country
  }

  //Return not an Instance raw:true | we also can convert it to Json instead
  async getCountry(id) {
    let country = await models.Countries.findByPk(id, { raw: true })
    return country
  }

  async updateCountry(id, { name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let country = await models.Countries.findByPk(id)

      if (!country) throw new CustomError('Not found country', 404, 'Not Found')

      let updatedCountry = await country.update(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedCountry
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeCountry(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let country = await models.Countries.findByPk(id)

      if (!country) throw new CustomError('Not found country', 404, 'Not Found')

      await country.destroy({ transaction })

      await transaction.commit()

      return country
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // For seeders <----------------------------- 
  async findCountryByName(name) {
    return await models.Countries.findOne({
      where: {
        name
      }
    })
  }
}

module.exports = CountriesService