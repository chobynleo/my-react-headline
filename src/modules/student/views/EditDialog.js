import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

import EditForm from './EditForm';
import Constants from '../../../common/Constants';
import { SELECT_CLASS_TYPE } from '../constants/Constants';

class EditDialog extends Component {
  /**
   * 属性由父组件ListContainer 传递
   */
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    editType: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
  };

  getModalTitle() {
    let titlePrefix = '';
    if (this.props.editType === Constants.CREATE_TYPE) {
      titlePrefix = Constants.CREATE_LABEL;
    } else if (this.props.editType === Constants.UPDATE_TYPE) {
      titlePrefix = Constants.UPDATE_LABEL;
    } else if (this.props.editType === SELECT_CLASS_TYPE) {
      titlePrefix = Constants.UPDATE_LABEL;
    }
    return `${titlePrefix}学生信息`;
  }
  render() {
    return (
      <Modal
        // 将当前时间作为key值，使得每次Modal 都是新创建的
        key={new Date().getTime()}
        title={this.getModalTitle()}
        visible={this.props.modalVisible}
        onCancel={this.props.onCancel}
        footer={null}>
        <EditForm
          ref={(ref) => {
            this.editForm = ref;
          }}
          studentClassTypes={this.props.studentClassTypes}
          studentSexTypes={this.props.studentSexTypes}
          {...this.props}
        />
      </Modal>
    );
  }
}

export default EditDialog;
