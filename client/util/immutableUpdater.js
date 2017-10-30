// Updating an Item in an Array
export const updateObjectInArray = (array, action) => {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item,
    };
  });
};

export const insertItem = (array, action) => {
  const newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
};

export const removeItem = (array, action) => {
  return array.filter((item, index) => index !== action.index);
};
