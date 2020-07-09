import { message } from "antd";

class ErrorUtils {
  constructor(error, show) {
    this.error = error;
    this.status = 200;
    this.message = null;
    this.show = show;
    this.calculateError();
  }

  calculateError() {
    let e = this.error;
    if (e.status) this.status = e.status;
    if (this.status < 400) return;
    if (e.message) this.message = e.message;
    if (this.show) this.showMessage();
    return this.error;
  }

  showMessage() {
    if (typeof this.message === "object") {
      this.handleObject(this.message);
    }

    if (typeof this.message === "string") {
      this.handleString(this.message);
    }

    if (typeof this.message === "number") {
      message.error(this.message);
    }

    if (typeof this.message === "boolean") {
      if (!this.message) message.error("Sorry Try Again");
      else message.error("You are doing well");
    }

    if (typeof this.message === "function") {
      let m = () => {
        return this.message;
      };
      message.error(m);
    }
  }

  handleObject(msg) {
    if (!msg.length) return;
    for (var m in msg) {
      message.error(m);
    }
  }

  handleString(msg) {
    if (!msg.length) return;
    message.error(msg);
  }
}
