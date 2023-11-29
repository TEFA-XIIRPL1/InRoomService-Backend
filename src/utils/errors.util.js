/**
 *
 * @param {PrismaClientKnownRequestError} err
 * @param {string | undefined} msg
 * @param {import ('express').Response} res
 */
function prismaError(err, msg, res) {
  let message = err.message ?? 'Internal server error';
  let statusCode = 500;
  let metaData = null;
  switch (err.code) {
    case 'P2000':
      message = msg ?? 'Value are too long';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2001':
      message = msg ?? 'The value is not found';
      statusCode = 404;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2002':
      message = msg ?? 'The value already exists';
      statusCode = 409;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2003':
      message = msg ?? 'The relation is not found';
      statusCode = 404;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2004':
      message = msg ?? 'The relation already exists / duplicate';
      statusCode = 409;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2005':
      message = msg ?? 'The type of value is invalid';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2006':
      message = msg ?? 'The field is not found';
      statusCode = 404;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2007':
      message = msg ?? 'Data validation error';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2008':
      message = msg ?? 'Query parsing error';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2009':
      message = msg ?? 'The operation is not supported';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2010':
      message = msg ?? 'Raw query parsing error';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2011':
      message = msg ?? 'Invalid connection string';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2012':
      message = msg ?? 'Missing required fields';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2013':
      message = msg ?? 'Invalid data';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2014':
      message = msg ?? 'Invalid data';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2015':
      message = msg ?? 'Required field could not be found';
      statusCode = 400;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2016':
      message = msg ?? 'Query interpretation error';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2017':
      message = msg ?? 'Invalid data';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2018':
      message = msg ?? 'Relation is invalid';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2019':
      message = msg ?? 'Input error';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2020':
      message = msg ?? 'Invalid data';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2021':
      message = msg ?? 'This Service is not avalable now';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2022':
      message = msg ?? 'This Service is not avalable now';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2023':
      message = msg ?? 'Incosistent data';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2024':
      message = msg ?? 'Request Timeout';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2025':
      message = msg ?? 'The value is not found';
      statusCode = 404;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2026':
      message = msg ?? 'Something went wrong on the server';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    case 'P2027':
      message = msg ?? 'Something went wrong on the server';
      statusCode = 500;
      metaData = err.meta?.target ?? null;
      break;
    default:
      break;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    data: metaData,
  });
}

module.exports = { prismaError };
