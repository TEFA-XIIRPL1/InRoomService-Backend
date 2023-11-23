const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const roomInputScheme = z.object({
  body: z.object({
    roomType: z.enum(['DELUXE', 'STANDARD', 'FAMILY'], {
      required_error: 'Room Type is required',
    }),
    roomImage: z.unknown({
      required_error: 'Image is required',
    }),
    roomStatusId: z.string({
      required_error: 'Room Status ID is required',
    }),
    roomCapacityId: z.string({
      required_error: 'Room Capacity ID is required',
    }),
    floor: z.string({
      required_error: 'Floor is required',
    }),
    occupied_status: z.enum(['true', 'false'], {
      required_error: 'Occupied Status is Required',
    }),
    description: z.string({
      required_error: 'Description is Required',
    }),
    bedSetup: z.enum(['TWIN', 'KING', 'SINGLE'], {
      required_error: 'Bed Setup is Required',
    }),
    rate: z.string({
      required_error: 'Rate is Required',
    }),
  }),
});

const roomInputValidation = validate(roomInputScheme);

module.exports = { roomInputValidation };
