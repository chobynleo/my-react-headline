import { message } from 'antd';
import { config } from '../../common/config';

message.config({
  maxCount: config.massageMaxCount
});

const Message = {
  msg({ type, content, duration = config.messageDuration, onClose }) {
    message[type](content, duration, onClose);
  }
};

export { Message };
