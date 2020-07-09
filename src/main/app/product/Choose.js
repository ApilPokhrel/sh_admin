import React, { Component } from "react";
import { Spin, message } from "antd";
import { apiRoutes } from "../category/Services";
import { withRouter } from "react-router-dom";

import Api from "../../services/ApiService";

class Choose extends Component {
  state = {
    loading: true,
    categories: []
  }

  componentDidMount() {
    this.getCategories();
  }

  handleRoute = url => {
    this.props.history.push(url);
  };


  getCategories = () => {
    let params = { limit: 10, page: 1, start: 0 };
    Api(apiRoutes.list, params)
      .then(data => {
        this.setState({
          categories: data.data,
          loading: false
        })
      })
      .catch(err => message.error(err.message));
  }


  render() {
    return (
      <Spin tip="Loading..." spinning={this.state.loading} >
        <div style={{ backgroundColor: "#2196f3" }}>
          <div className="wraper-category">
            <div className="category-container">
              {this.state.categories.map((e, i) => (
                <div
                  className="center category"
                  key={i}
                  onClick={() => {
                    this.handleRoute("/add_product" + "?c=" + e._id);
                  }}
                  style={{
                    backgroundImage: `url(${e.profile.url}${e.profile.name}_large.jpg)`,
                    objectFit: "fill"
                  }}
                >
                  <h1>{e.name}</h1>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
        .category-container {
          display: grid;
          grid-column-gap: 20px;
          justify-content: space-evenly;
          grid-row-gap: 20px;
          grid-template-columns: repeat(2, 1fr);
          padding: 10px;
        }

        .center {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .category {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 20px;
          font-size: 30px;
          text-align: center;
          margin: 40px;
          border-radius: 20px;
          color: #888;
          box-shadow: 0px 0px 15px #aaaaaa;
          cursor: pointer;
        }

        .category:hover {
          border: none;
          color: #fff;
          backgoundcolor: #999;
          box-shadow: 0px 0px 25px #111;
        }

        .category h1 {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
            Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: inherit;
        }

        .wraper-category {
          background-color: #2196f3;
          padding-top: 50px;
        }

        @media only screen and (max-width: 600px) {
          .category {
            margin: 0px;
            font-size: 20px;
          }

          .category-container {
            grid-column-gap: 9px;
            grid-row-gap: 9px;
          }

          .wraper-category {
            padding-top: 100px;
          }
        }
      `}</style>
        </div>
      </Spin>
    );
  }
}

export default withRouter(Choose);
