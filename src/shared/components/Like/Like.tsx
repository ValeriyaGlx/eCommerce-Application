import React, { useState } from 'react';

import heartLine from '../../../assets/icons/icon-heart-line.svg';
import heartFull from '../../../assets/icons/icon-heart-black.svg';

const Like = () => {
  const [like, setLike] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    setLike(!like);
  }

  return (
    <img
      style={{ cursor: 'pointer' }}
      src={like ? heartFull : heartLine}
      onClick={handleClick}
      alt={'like'}
    />
  );
};

export default Like;
