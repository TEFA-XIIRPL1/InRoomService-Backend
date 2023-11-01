const inRoomService = require('../services/inRoomService.service');

async function get(req, res, next) {
  try {
      res.json(await inRoomService.getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting inRoomService`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await inRoomService.create(req.body));
  } catch (err) {
    console.error(`Error while creating inRoomService`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await inRoomService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating inRoomService`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await inRoomService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting inRoomService`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};
