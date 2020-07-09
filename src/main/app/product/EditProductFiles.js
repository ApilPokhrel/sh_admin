import React from "react";

import {
  Form,
  Icon,
  Button,
  Upload,
  message,
  Spin
} from "antd";

import { Call } from "./Services";




class EditProductFiles extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    subtypes: undefined,
    desc: "",
    size: "",
    priceUnit: "NPR",
    fileList: [],
    uploading: false,
    previewVisible: false,
    previewImage: "",
    files: this.props.files,
    loading: false
  };

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
        this.setState({ loading: true })

        Call.updateFiles(this.props._id, values).then(d => {
          this.setState({ loading: false, files: d.data.files })
        }).catch(error => {
          this.setState({ loading: false })
          message.error(error.message)
        });
      }
    });
  };

  removeFile = file => {
    const index = this.state.files.indexOf(file);
    let newList = this.state.files;
    newList.splice(index, 1);

    Call.update(this.props._id, { files: newList }).then(d => {
      this.setState({ files: newList });
    }).catch(error => {
      message.error(error.message)
    });

  }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    if (this.state.files !== this.props.files) {
      this.setState({ files: this.props.files });
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



    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form col-md-8 col-xs-11 col-sm-10 col-lg-8"
      >
        <Spin tip="Updating" spinning={this.state.loading}>
          <div style={{
            display: "grid", gridTemplateColumns: "auto auto auto auto", padding: "10px"
          }}>
            {this.state.files.map(e => <div className="file-item" style={{ display: "block" }}>
              {e.type.startsWith("image") ? <img src={`${e.url}${e.name}_small.jpg`} style={{ width: "100px", height: "100px" }} />
                : <video autoPlay="true" loop="false" muted="true" data-reactid=".0.1.0.0">
                  <source type="video/*" data-reactid=".0.1.0.0.0" src={`${e.url}${e.name}`} />
                </video>
              }
              <Icon type="delete" onClick={() => { this.removeFile(e) }} />
            </div>)}

          </div>

          <Form.Item label="Files">
            {getFieldDecorator("files", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload {...props} listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
              </Button>
              </Upload>
            )}
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

EditProductFiles.defaultProps = {
  files: []
}

export default Form.create({ name: "edit_product_files" })(EditProductFiles);
