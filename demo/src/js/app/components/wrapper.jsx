import React, { PropTypes } from 'react';

const Main = class extends React.Component {
  render() {
    const attrs = {
      main: {
        className: styled`
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        `
      },
      h1: {
        className: styled`
          text-align: center;
        `
      }
    };

    return (
      <div>
        <main {...attrs.main}>
          <h1 {...attrs.h1}>Welcome to my demo!</h1>
        </main>
      </div>
    );
  }
};

Main.propTypes = {};

export default Main;
