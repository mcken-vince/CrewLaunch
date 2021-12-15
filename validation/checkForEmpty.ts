const ifEmpty = (field: any): boolean | any => {
  try {
    let result: boolean = false;

    if (
      field === undefined ||
      field === null ||
      (typeof field === 'string' && field.trim().length === 0) ||
      (typeof field === 'object' && Object.keys(field).length === 0)
    )
    result = true;

    return result;
  } catch (err) {
    return err;
  }
};

export default ifEmpty;
