import React from 'react';
import Svg, {
  Polygon
} from 'react-native-svg';

const Triangle: React.SFC<any> = () => (
  <Svg height="20" width="20">
    <Polygon
        points="20,0 0,0 20,20"
        fill="white"
        stroke="white"
        strokeWidth="1"
    />
  </Svg>
);

export default Triangle;
