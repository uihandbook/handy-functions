export const getMargin = (margin) => {
  if(!margin) {
    return null;
  }

  if(typeof margin === 'object') {
    const marginTop = margin['top'] ? margin['top'] : 0;
    const marginRight = margin['right'] ? margin['right'] : 0;
    const marginBottom = margin['bottom'] ? margin['bottom'] : 0;
    const marginLeft = margin['left'] ? margin['left'] : 0;

    return `margin-top: ${marginTop};
      margin-right: ${marginRight};
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};`;
  } else {
    return `margin: ${margin};`;
  }
};
