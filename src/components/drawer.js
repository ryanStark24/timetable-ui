import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

export default class DrawerMain extends React.Component {



  render() {
    return (
            <Drawer width={200} docked={true} swipeAreaWidth={400} open={this.props.open} >
          <AppBar title="Menu"  />
        </Drawer>
        );
  }
}
