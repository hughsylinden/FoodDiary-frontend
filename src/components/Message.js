import React from "react";
import PropTypes from "prop-types";

function Message({ messageText }) {
  return <div>{messageText}</div>;
}

Message.propTypes = {
  messageText: PropTypes.string.isRequired,
};

export default Message;
