export const setPosition = (position) => {
  if(!position) {
    return null;
  }

  if(typeof position === 'object') {
    const positionTop = position['top'] ? position['top'] : "auto";
    const positionRight = position['right'] ? position['right'] : "auto";
    const positionBottom = position['bottom'] ? position['bottom'] : "auto";
    const positionLeft = position['left'] ? position['left'] : "auto";

    return `top: ${positionTop};
      right: ${positionRight};
      bottom: ${positionBottom};
      left: ${positionLeft};`;
  } else {
    return null;
  }
};
