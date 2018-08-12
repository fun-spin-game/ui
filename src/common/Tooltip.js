import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { pure, compose } from 'recompose';

const TooltipComp = (props) => !props.disable ?
  <Tooltip {...props}>{props.children}</Tooltip> :
  props.children;

export default compose(pure)(TooltipComp);

TooltipComp.propTypes = {
  children: PropTypes.node.isRequired,
  disable: PropTypes.bool.isRequired,
};
