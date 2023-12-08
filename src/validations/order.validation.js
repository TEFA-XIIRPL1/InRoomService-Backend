const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object(
        {
          serviceId: z
            .number({
              required_error: 'Service ID is required',
            })
            .or(
              z.string({
                required_error: 'Service ID is required',
              }),
            ),
          qty: z
            .number({
              required_error: 'Quantity is required',
            })
            .or(
              z.string({
                required_error: 'Quantity is required',
              }),
            ),
        },
        {
          required_error: 'Items is must include at least one item (item and qty)',
        },
      ),
      {
        required_error: 'No items selected',
      },
    ),
  }),
});

const updateQtySchema = z.object({
  body: z.object({
    serviceId: z
      .number({
        required_error: 'Service ID is required',
      })
      .or(
        z.string({
          required_error: 'Service ID is required',
        }),
      ),
    qty: z
      .number({
        required_error: 'Quantity is required',
      })
      .or(
        z.string({
          required_error: 'Quantity is required',
        }),
      ),
  }),
});
const createOrderValidation = validate(createOrderSchema);
const updateQtyValidation = validate(updateQtySchema);

module.exports = { createOrderValidation, updateQtyValidation };
