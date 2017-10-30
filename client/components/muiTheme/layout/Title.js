import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import compose from 'recompose/compose';

const Title = ({ defaultTitle, record, title }) => {
  if (!title) {
    return <span>{defaultTitle}</span>;
  }
  if (typeof title === 'string') {
    return <span>{title}</span>;
  }
  return React.cloneElement(title, { record });
};

Title.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  record: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const enhance = compose(onlyUpdateForKeys('defaultTitle', 'record', 'title'));

export default enhance(Title);
