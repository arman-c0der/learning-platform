export const replaceMongoIdInArray = (array) => {
  return array.map((item) => replaceMongoIdInObject(item));
};

const isObjectId = (value) => {
  return (
    value &&
    typeof value === "object" &&
    (typeof value.toHexString === "function" ||
      value._bsontype === "ObjectId" ||
      value.constructor?.name === "ObjectId")
  );
};

export const replaceMongoIdInObject = (obj) => {
  if (!obj) return null;

  // Date হলে ISO string return করবে
  if (obj instanceof Date) {
    return obj.toISOString();
  }

  const updatedObj = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object") {

      // Date
      if (value instanceof Date) {
        updatedObj[key] = value.toISOString();
      }

      // MongoDB ObjectId
      else if (isObjectId(value)) {
        updatedObj[key] = value.toString();
      }

      // Array
      else if (Array.isArray(value)) {
        updatedObj[key] = value.map((item) =>
          typeof item === "object"
            ? isObjectId(item)
              ? item.toString()
              : replaceMongoIdInObject(item)
            : item
        );
      }

      // Nested object
      else {
        updatedObj[key] = replaceMongoIdInObject(value);
      }

    } else {
      updatedObj[key] = value;
    }
  }

  // Convert top-level _id → id
  if (obj._id) {
    updatedObj.id = obj._id.toString();
    delete updatedObj._id;
  }

  return updatedObj;
};

export const getSlug = (title) => {
  if (!title) return null;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return slug;
};