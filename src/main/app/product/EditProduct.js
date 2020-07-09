import React from "react";
import { withRouter } from "react-router-dom";
import { PageHeader, Spin, message } from "antd";
import Detail from "./EditProductDetail";
import Files from "./EditProductFiles";
import Profile from "./EditProductProfile";
import Api from "../../services/ApiService";
import { apiRoutes } from "./Services";

class EditProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: {
        features: [],
        specs: [],
        prices: [],
        units: []
      }
    }

    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('p');
    Api(apiRoutes.get(id), {})
      .then(data => {
        console.log("Data:", data);
        this.setState({
          loading: false,
          product: data,
        });
      })
      .catch(err => message.error(err.message));
  }

  render() {
    return (
      <div style={this.props.style}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          onBack={() => {
            this.props.history.goBack();
          }}
          title="Go Back"
          subTitle=""

        />
        <Spin tip="Loading" spinning={this.state.loading}>
          <Detail _id={this.state.product._id} product={this.state.product} />
          <Profile _id={this.state.product._id} profile={this.state.product.profile} />
          <Files _id={this.state.product._id} files={this.state.product.files} />
        </Spin>
      </div>
    );
  }
}

export default withRouter(EditProduct);
