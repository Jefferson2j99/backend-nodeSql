const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.endsWith]: '%@rocketseat.com'
        }
      },
      include: [
        { association: 'addresses', where: { street: 'Rua Marvel' } },
        {
          association: 'techs',
          where: {
            name: {
              [Op.endsWith]: 'Native'
            }
          }
        }
      ]
    })

    return res.json(users);
  }
};