import React, {Component} from 'react';
import SideNav from 'components/SideNav';
import TopNav from 'components/TopNav';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Dashboard"
    }

    this.onTitleChange = this.onTitleChange.bind(this);
  }
  onTitleChange(title) {
    this.setState({title});
  }

  render() {
    return (
        <div>
          <TopNav/>
          <SideNav onTitleChange={this.onTitleChange}/>
          <div className="main">
            <div className="main__title">
              {this.state.title}
            </div>
            
            <div className="main__content">
              {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}