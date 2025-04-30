/**
 * Test Helpers for @kung-fu/components testing
 */

const createAudioPlayerDOM = () => {
  document.body.innerHTML = `
    <div id="audio-player">
      <audio></audio>
      <div id="audio-player-cover"></div>
      <div id="audio-player-title"></div>
      <div id="audio-player-date"></div>
      <div id="audio-player-summary"></div>
    </div>
    <dl id="playlist">
      <dt data-source="test.mp3" data-cover-img="test.jpg" data-title="Test Track" data-pub="2023-01-01" data-summary="Test summary">Test Track</dt>
      <dt data-source="test2.mp3" data-cover-img="test2.jpg" data-title="Test Track 2" data-pub="2023-01-02" data-summary="Test summary 2">Test Track 2</dt>
    </dl>
  `;
  return {
    container: document.getElementById('audio-player'),
    audio: document.querySelector('#audio-player audio'),
    cover: document.getElementById('audio-player-cover'),
    title: document.getElementById('audio-player-title'),
    date: document.getElementById('audio-player-date'),
    summary: document.getElementById('audio-player-summary'),
    playlist: document.getElementById('playlist'),
    playlistItems: document.querySelectorAll('#playlist dt')
  };
};

const createNestedListDOM = (levels = 4) => {
  let html = '<ul id="list-level-0"><li>Level 0';
  let closing = '';
  
  for (let i = 1; i < levels; i++) {
    html += `<ul id="list-level-${i}"><li>Level ${i}`;
    closing = `</li></ul>${closing}`;
  }
  
  html += closing + '</li></ul>';
  document.body.innerHTML = html;
  
  const lists = {};
  for (let i = 0; i < levels; i++) {
    lists[`level${i}`] = document.getElementById(`list-level-${i}`);
  }
  
  return lists;
};

const createImageDOM = () => {
  document.body.innerHTML = `
    <div id="image-container">
      <img id="img-complete" src="test.jpg" alt="Alt text" title="Title text">
      <img id="img-alt-only" src="test.jpg" alt="Alt only">
      <img id="img-title-only" src="test.jpg" title="Title only">
      <img id="img-no-caption" src="test.jpg" data-no-caption>
      <img id="img-empty" src="test.jpg">
    </div>
  `;
  
  return {
    container: document.getElementById('image-container'),
    complete: document.getElementById('img-complete'),
    altOnly: document.getElementById('img-alt-only'),
    titleOnly: document.getElementById('img-title-only'),
    noCaption: document.getElementById('img-no-caption'),
    empty: document.getElementById('img-empty')
  };
};

module.exports = {
  createAudioPlayerDOM,
  createNestedListDOM,
  createImageDOM
};