import React from 'react';

const Main = class extends React.Component {
  render() {
    const attrs = {
      main: {
        className: styled`
          background: #000 url(../img/space.jpg) no-repeat;
          background-size: cover;
          bottom: 0;
          left: 0;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
        `
      },
      canvas: {
        className: styled`
          bottom: 0;
          left: 0;
          opacity: 0.2;
          position: absolute;
          right: 0;
          top: 0;
        `,
        ref: (node) => { this.canvas = node; }
      },
      h1: {
        className: styled`
          color: #fff;
          font-size: 3em;
          left: 50%;
          letter-spacing: 2px;
          margin: 0;
          position: absolute;
          text-align: center;
          text-transform: uppercase;
          top: 50%;
          transform: translate(-50%, -50%);
        `
      },
      div: {
        className: ''
      },
      span: {
        className: ''
      },
    };

    const bibleVerse = [['Now', 'the', 'earth'], ['was', 'formless'], ['and', 'empty…'], ['Genesis 1:2']];

    return (
      <main {...attrs.main}>
        <canvas {...attrs.canvas} />
        <h1 {...attrs.h1}>
          {
            bibleVerse
              .map((line, i) => <div key={i} {...attrs.div}>
                {
                  line.map(word => <span key={word} {...attrs.span}>
                    {word}
                  </span>)
                }
              </div>)
          }
        </h1>
      </main>
    );
  }
  componentDidMount() {
    //These pens were used for inspiration and/or plagiarism depending on your conscience
    //http://codepen.io/RobinTreur/pen/pyWLeB
    //http://codepen.io/apsolut/pen/EhmeL
    //http://codepen.io/wheately/pen/VLjgyR?editors=0010
    const canvas = this.canvas;
    const context = canvas.getContext('2d');
    const particles = [];

    function drawCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'hsla(332, 95%, 5%, 1)';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
      drawCanvas();

      for (let i = 0; i < particles.length; i++) {
        if (particles[i].dead) particles.splice(i, 1);

        context.globalCompositeOperation = 'lighter';
        context.beginPath();

        const gradient = context.createRadialGradient(particles[i].x, particles[i].y, 0, particles[i].x, particles[i].y, particles[i].size);
        gradient.addColorStop(1, 'transparent');
        gradient.addColorStop(0, particles[i].color);

        context.fillStyle = gradient;
        context.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        //Do gravity stuff.
        particles[i].x += particles[i].Hvelocity;
        particles[i].y += particles[i].Vvelocity;

        if (particles[i].x - particles[i].size > canvas.width || particles[i].y - particles[i].size > canvas.height) particles[i].dead = true;
      }

      if (particles.length < 1000) {
        for (let i = 0; i < 10; i++) generateParticle();
      }

      requestAnimationFrame(draw);
    }

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.globalCompositeOperation = 'lighten';

      drawCanvas();

      for (let i = 0; i < 50; i++) generateParticle();

      draw();
    }

    function generateParticle() {
      const colors = [
        'rgba(142, 68, 173,0.3)',
        'rgba(41, 128, 185, 0.3)',
      ];
      const color = Math.floor(Math.random() * colors.length) + 0;
      const particle = {
        x: Math.floor(Math.random() * -100) + 0,
        y: Math.floor(Math.random() * -100) + 0,
        size: Math.floor(Math.random() * 150) + 30,
        color: colors[color],
        Hvelocity: Math.floor(Math.random() * 10) + 1,
        Vvelocity: Math.floor(Math.random() * 10) + 1,
        dead: false
      };

      particles.push(particle);
    }

    init();
  }
};

export default Main;
