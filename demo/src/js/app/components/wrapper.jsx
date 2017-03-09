import React, { PropTypes } from 'react';

const Main = class extends React.Component {
  render() {
    const attrs = {
      main: {
        className: styled`
          color: red;
          font-weight: bold;
        `
      }
    };

    return (
      <div>
        <main {...attrs.main}>
          Main Content Here!
        </main>
      </div>
    );
  }
};

Main.propTypes = {};

export default Main;
