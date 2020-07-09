import React from "react";
import { Modal, Form, Input, Upload, Icon } from "antd";
const { TextArea } = Input;


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class EditProfile extends React.Component {

  state = {
    fileList: [],
    uploading: false,
    previewVisible: false,
    loading: false,
    previewImage: "",
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    const { fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };


    const { previewVisible, previewImage } = this.state;
    return (
      <Modal
        visible={visible}
        title="Edit profile"
        okText="Edit"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">

          <Form.Item label="Profile">
            {getFieldDecorator("profile", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload.Dragger
                name="profile"
                {...props}
                listType="picture-card"
                onPreview={this.handlePreview}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single only.</p>
              </Upload.Dragger>
            )}
            {
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
              </Modal>
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedAddCategory = Form.create({ name: "edit_category_profile_form" })(EditProfile);
export default WrappedAddCategory;
