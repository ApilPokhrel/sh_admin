import React from "react";
import { Call } from "./Services";
import {
  Form,
  Icon,
  Button,
  Upload,
  Modal,
  Spin,
  message
} from "antd";



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class EditProductProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtypes: undefined,
      desc: "",
      size: "",
      priceUnit: "NPR",
      fileList: [],
      uploading: false,
      previewVisible: false,
      loading: false,
      previewImage: "",
      profile: this.props.profile,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ loading: true })

        Call.updateProfile(this.props._id, values).then(d => {
          this.setState({ loading: false, profile: d.data.profile })
        }).catch(error => {
          this.setState({ loading: false })
          message.error(error.message)
        });
      }
    });
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (this.state.profile !== this.props.profile) {
      this.setState({ profile: this.props.profile });
    }
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
      <Form
        onSubmit={this.handleSubmit}
        className="login-form col-md-8 col-xs-11 col-sm-10 col-lg-8"
      >
        <Spin tip="Updating..." spinning={this.state.loading}>

          <img src={`${this.state.profile.url}${this.state.profile.name}_medium.jpg`} style={{ border: "1px solid grey" }} alt="Profile Image" />
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              className="login-form-button"
            >
              Update
          </Button>
          </Form.Item>
        </Spin>
      </Form>
    );
  }
}
EditProductProfile.defaultProps = {
  profile: {}
}


export default Form.create({ name: "edit_product_profile" })(EditProductProfile);
