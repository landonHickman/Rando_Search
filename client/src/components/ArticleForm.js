import React from "react";
import ReactDOM from "react-dom";

class ArticleForm extends React.Component {
  
    
  state = {
    title: "",
    body: '',
  };
  add = (e) => {
    e.preventDefault();
    if (this.state.title === "" || this.state.body === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
  
  }

    changeHandler = (event) => {
      let title = event.target.title;
      let val = event.target.value;
      this.setState({ [title]: val });
    };
    render() {
      return (
        <form>
          <h1>
            {this.state.title} {this.state.body}
          </h1>
          <p>title:</p>
          <input type="text" title="title" onChange={this.changeHandler} />
          <p>body:</p>
          <input type="text" name="body" onChange={this.changeHandler} />
        </form>
      );
    }
  
}
export default ArticleForm

ReactDOM.render(<ArticleForm />, document.getElementById("root"));
