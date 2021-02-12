import React from "react";import { withAsyncAction } from "../../redux/HOCs";
import "./Messages.css";
import Button from "react-bootstrap/Button";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      count: 0,
      image: "",
    };
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    this.props.getMessage(this.props.username).then((res) => {
      console.log(res.payload);
      this.setState({
        messages: res.payload.messages,
        count: res.payload.count,
      });
    });
  };

  newMessageHandler = () => {
    
    let text = this.state.message;
    console.log(this.state.message)
    this.props.createMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: "",
      });
    });
  };

  newLikeHandler = (messageId) => {
    this.props.addLike(messageId).then(() => {
      this.fetchMessages()
    });
  };

  newDislikeHandler = (likeId) => {
    this.props.removeLike(likeId).then(() => {
      this.fetchMessages()
    });
  };

  delMessageHandler = (messageId) => {
    this.props.deleteMessage(messageId).then(() => {
      this.fetchMessages()
    });
  };


  handleChange = (event) => {
    let data = { ...this.state };

    data[event.target.name] = event.target.value;

    this.setState(data);
  };

  render() {
    let display = <div>No Messages Found</div>;
    if (this.state.messages) {
      display = this.state.messages.map((value) => {
        
        return (
          <li key={value.id}>
            {value.text} 
            <button onClick={() => this.newLikeHandler(value.id)}>Like</button>
            <button onClick={() => this.newDislikeHandler(value.likes[0].id)}>Dislike</button>
            <button onClick={() => this.delMessageHandler(value.id)}>Delete</button>
          </li>
        );
      });
    }

    return (
      <div className="Messages">
        <div className="ListMessage">{display}</div>
        <div className="NewMessage">
          <input
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <Button variant="primary" onClick={this.newMessageHandler}>
            {" "}
            Send Message{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default withAsyncAction("profile", "all")(Messages);
