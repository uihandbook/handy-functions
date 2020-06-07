export const setPosition = (position) => {
  if(!position) {
    return null;
  }

  if(typeof position === 'object') {
    const positionTop = position['top'] ? position['top'] : 0;
    const positionRight = position['right'] ? position['right'] : 0;
    const positionBottom = position['bottom'] ? position['bottom'] : 0;
    const positionLeft = position['left'] ? position['left'] : 0;

    return `top: ${positionTop};
      right: ${positionRight};
      bottom: ${positionBottom};
      left: ${positionLeft};`;
  } else {
    return null;
  }
};
