const { expect } = require('chai');
const sinon = require('sinon');
require('jsdom-global')();
const helpers = require('./test-helpers');

// Import the components
const components = require('../dist/index');

describe('Performance Tests', function() {
  this.timeout(5000); // Increase timeout for performance tests
  
  afterEach(function() {
    document.body.innerHTML = '';
    sinon.restore();
  });
  
  it('should handle large playlist efficiently', function() {
    // Create a large playlist
    document.body.innerHTML = `
      <div id="audio-player">
        <audio></audio>
      </div>
      <dl id="playlist"></dl>
    `;
    
    const playlist = document.getElementById('playlist');
    const NUM_ITEMS = 100;
    
    // Add many playlist items
    for (let i = 0; i < NUM_ITEMS; i++) {
      const dt = document.createElement('dt');
      dt.setAttribute('data-source', `track${i}.mp3`);
      dt.setAttribute('data-title', `Track ${i}`);
      dt.innerText = `Track ${i}`;
      playlist.appendChild(dt);
    }
    
    // Create player and add playlist
    const start = performance.now();
    const player = components.createAudioPlayer('audio-player');
    player.withPlaylist('playlist');
    const end = performance.now();
    
    // Attaching event listeners to 100 items should be reasonably fast (< 100ms)
    expect(end - start).to.be.lessThan(100);
    
    // Verify event listeners were attached by clicking an item
    const audioElement = document.querySelector('audio');
    const playSpy = sinon.spy();
    const pauseSpy = sinon.spy();
    audioElement.play = playSpy;
    audioElement.pause = pauseSpy;
    
    // Click a playlist item
    const item = document.querySelector('#playlist dt');
    item.click();
    
    expect(pauseSpy.calledOnce).to.be.true;
    expect(playSpy.calledOnce).to.be.true;
  });
  
  it('should handle large nested list structures efficiently', function() {
    // Create a wide and deep list structure
    document.body.innerHTML = '<div id="list-container"></div>';
    const container = document.getElementById('list-container');
    
    // Create 10 lists with 5 levels of nesting each
    for (let i = 0; i < 10; i++) {
      let html = `<ul id="list-${i}-level-0"><li>List ${i} Level 0`;
      let closing = '';
      
      for (let j = 1; j < 5; j++) {
        html += `<ul id="list-${i}-level-${j}"><li>List ${i} Level ${j}`;
        closing = `</li></ul>${closing}`;
      }
      
      html += closing + '</li></ul>';
      container.innerHTML += html;
    }
    
    // Measure performance of rotateListStyleType
    const start = performance.now();
    components.rotateListStyleType();
    const end = performance.now();
    
    // Processing many nested lists should be reasonably fast (< 100ms)
    expect(end - start).to.be.lessThan(100);
    
    // Verify styles were applied correctly
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        const list = document.getElementById(`list-${i}-level-${j}`);
        const expectedStyle = ['disc', 'circle', 'square'][j % 3];
        expect(list.style.listStyleType).to.equal(expectedStyle);
      }
    }
  });
  
  it('should handle many images efficiently', function() {
    // Create a container with many images
    document.body.innerHTML = '<div id="image-container"></div>';
    const container = document.getElementById('image-container');
    const NUM_IMAGES = 100;
    
    // Add many images with titles
    for (let i = 0; i < NUM_IMAGES; i++) {
      const img = document.createElement('img');
      img.id = `img-${i}`;
      img.src = `image${i}.jpg`;
      img.title = `Image ${i}`;
      container.appendChild(img);
    }
    
    // Measure performance of wrapImageWithFigure
    const start = performance.now();
    components.wrapImageWithFigure();
    const end = performance.now();
    
    // Processing many images should be reasonably fast (< 100ms)
    expect(end - start).to.be.lessThan(100);
    
    // Verify all images were wrapped
    const figures = document.querySelectorAll('figure');
    expect(figures.length).to.equal(NUM_IMAGES);
    
    // Check a sample figure to ensure it was correctly formed
    const sampleFigure = figures[0];
    const sampleImg = sampleFigure.querySelector('img');
    const sampleCaption = sampleFigure.querySelector('figcaption');
    
    expect(sampleImg).to.not.be.null;
    expect(sampleCaption).to.not.be.null;
    expect(sampleImg.src).to.include('image0.jpg');
    expect(sampleCaption.innerText).to.equal('Image 0');
  });
});