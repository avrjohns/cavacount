// October 28, 2026, 12:00 AM Pacific
const TARGET_DATE = new Date('2026-10-28T00:00:00-07:00');

const SONGS = [
  { title: 'Time Bomb', artist: 'Iration', url: 'https://open.spotify.com/track/0KtKac3tvjeGjg6FXcUy7X' },
  { title: 'kisses', artist: 'Slowdive', url: 'https://open.spotify.com/track/7LuPjGUfJqxuW14W4gMrU2' },
  { title: 'Peach', artist: 'Kevin Abstract', url: 'https://open.spotify.com/track/5JRMqkR82k2fdDEAim9SCN' },
  { title: 'Pretty Lady', artist: 'Rebelution', url: 'https://open.spotify.com/track/7yY9c4KkIqwqDy2EhgcJkv' },
  { title: 'Keep on Loving You', artist: 'Cigarettes After Sex', url: 'https://open.spotify.com/track/3GUSidbQwd7xuvU6AQorRh' },
  { title: 'Big Black Car', artist: 'Gregory Alan Isakov', url: 'https://open.spotify.com/track/3Kj2EWpIBnvETsYq4cq0IH' },
  { title: '4Me 4Me', artist: 'Malcolm Todd', url: 'https://open.spotify.com/track/07oVB2BTnBp1RBQ5gdbWLA' },
  { title: 'Without You', artist: 'Lana Del Rey', url: 'https://open.spotify.com/track/7cpHPzPgqKor6gv6nTkJ4R' },
  { title: 'Sunny day', artist: 'beabadoobee', url: 'https://open.spotify.com/track/12UQIJePnGeLmpVReYpG2w' },
  { title: 'Fooled Around And Fell In Love', artist: 'Elvin Bishop', url: 'https://open.spotify.com/track/2hE5Lm5XOHR4t3xlhIFauP' },
  { title: 'touch tank', artist: 'quinnie', url: 'https://open.spotify.com/track/1TgCchWmdmmhGrtsa8NHwY' },
  { title: 'In The Dark', artist: 'DEV', url: 'https://open.spotify.com/track/1pbHy9VBpSyZh56xuujZz0' },
  { title: 'Stay', artist: 'Rihanna, Mikky Ekko', url: 'https://open.spotify.com/track/1dEy9Pl81QopSxNsPxXQxv' },
  { title: 'Only One', artist: 'Blake Ruby', url: 'https://open.spotify.com/track/5YfiLxUDxi1GnGR1oca56V' },
  { title: 'Under Your Spell', artist: 'Desire', url: 'https://open.spotify.com/track/2cSRuejq6DU9U6OkSmUw17' },
  { title: 'Mykonos', artist: 'Fleet Foxes', url: 'https://open.spotify.com/track/3Ck96jIZdVzpWbbZ6mojsE' },
  { title: "It's Not Living (If It's Not With You)", artist: 'The 1975', url: 'https://open.spotify.com/track/3TgMcrV32NUKjEG2ujn9eh' },
  { title: 'Steal My Girl', artist: 'One Direction', url: 'https://open.spotify.com/track/2Bs4jQEGMycglOfWPBqrVG' },
  { title: 'Debonair', artist: 'flowerovlove', url: 'https://open.spotify.com/track/3ZtasC1dw8fTMcsckkgSyx' },
  { title: 'Haunt Me', artist: 'Matilda Mann', url: 'https://open.spotify.com/track/2LDLjL9TEy9HQqznnDaH3M' },
  { title: 'CHERIE', artist: 'Darius, Darianna Everett', url: 'https://open.spotify.com/track/2bmN1B9HIZTGdaFqMYrgOR' },
  { title: 'Ayonha', artist: 'Hamid Al Shaeri', url: 'https://open.spotify.com/track/7j3758mGOPLkd7UQsmbWYg' },
  { title: 'Ragged Wood', artist: 'Fleet Foxes', url: 'https://open.spotify.com/track/2qvToeBdYliw6n0nEsKJQa' },
  { title: 'Dandelion', artist: 'New Constellations', url: 'https://open.spotify.com/track/1kVi0hwmHSPIYh6Z5srTDk' },
  { title: 'Nonsense', artist: 'Sabrina Carpenter', url: 'https://open.spotify.com/track/6dgUya35uo964z7GZXM07g' },
  { title: 'Closer', artist: 'Ne-Yo', url: 'https://open.spotify.com/track/2XbfY2O2v3xwedUJ0J2kkr' },
  { title: 'Dive', artist: 'Olivia Dean', url: 'https://open.spotify.com/track/36vmaZyO0iAE6FZ7287fg2' },
  { title: "Nobody's Business", artist: 'Rihanna, Chris Brown', url: 'https://open.spotify.com/track/0qJWmTaT1qvCq0brgx8k2P' },
  { title: 'Love You Like A Love Song', artist: 'Selena Gomez & The Scene', url: 'https://open.spotify.com/track/0laYHRpNTS6i8FXdupHkJ4' },
  { title: 'Falling', artist: 'Iration', url: 'https://open.spotify.com/track/2tP2rytUFVm6lhCznfLbv6' },
  { title: 'Powerlines', artist: 'Wells Ferrari', url: 'https://open.spotify.com/track/6DIaQqnqSNhVAQJXckAEUy' },
  { title: 'Wasted Time', artist: 'Wells Ferrari, Mikey Ferrari, Will Wells', url: 'https://open.spotify.com/track/67rhdKBk5sEWM7dYtgsUuM' },
  { title: 'Dancing in the Moonlight', artist: 'King Harvest', url: 'https://open.spotify.com/track/0q21FNwES2bbtcduB6kjEU' },
  { title: 'To Be Alone With You', artist: 'Sufjan Stevens', url: 'https://open.spotify.com/track/12homE4JpBey5cckgoepR7' },
  { title: 'All I Really Want Is You', artist: 'The Marías', url: 'https://open.spotify.com/track/410rGaFDJPwjsr9m9RPCkz' },
  { title: 'Work Song', artist: 'Hozier', url: 'https://open.spotify.com/track/5TgEJ62DOzBpGxZ7WRsrqb' },
  { title: 'Those Eyes', artist: 'New West', url: 'https://open.spotify.com/track/50x1Ic8CaXkYNvjmxe3WXy' },
  { title: 'The Things We Do For Love', artist: '10cc', url: 'https://open.spotify.com/track/6KEWtSOGKpIXGw6l1uJgsR' },
  { title: 'I Got You', artist: 'Jack Johnson', url: 'https://open.spotify.com/track/12jjuxN1gxlm29cqL5M6MW' },
  { title: 'Body & Soul (feat. Biig Piig)', artist: 'Emotional Oranges, Biig Piig', url: 'https://open.spotify.com/track/6ltcWFTmyRQbSNCNOTK0uM' },
  { title: 'Sweet Disposition', artist: 'The Temper Trap', url: 'https://open.spotify.com/track/0fIDUXVyJ1JISqB4HP4D5H' },
  { title: 'Toothbrush', artist: 'DNCE', url: 'https://open.spotify.com/track/7ciLq0Cip0yxiz6KANrOUq' },
  { title: 'crystallized (feat. Inéz)', artist: 'John Summit, Inéz', url: 'https://open.spotify.com/track/6YiIWuVXS4AqF1KvUGMwyx' },
];

// Picks a song for a given day using a deterministic hash of the day number,
// so the same day always shows the same song on reload, but which song
// lands on which day looks random rather than following playlist order.
function getSongForDay(days) {
  if (SONGS.length === 0) return null;
  let seed = (days * 2654435761) % 2147483647;
  if (seed <= 0) seed += 2147483646;
  return SONGS[seed % SONGS.length];
}

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownEl = document.getElementById('countdown');
const doneMessageEl = document.getElementById('done-message');
const songSectionEl = document.getElementById('song-section');
const songLinkEl = document.getElementById('song-link');
const songEmbedEl = document.getElementById('song-embed');
const mediaCardEl = document.querySelector('.media-card');

function pad(num) {
  return String(num).padStart(2, '0');
}

function trackIdFromUrl(url) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

let lastDayShown = null;

function updateSong(days) {
  if (days === lastDayShown) return;
  lastDayShown = days;
  songEmbedEl.innerHTML = '';
  mediaCardEl.classList.remove('playing');
  const song = getSongForDay(days);
  if (song) {
    songLinkEl.href = song.url;
    songLinkEl.textContent = `${song.title} - ${song.artist}`;
    songLinkEl.dataset.url = song.url;
    songSectionEl.classList.remove('hidden');
  } else {
    songSectionEl.classList.add('hidden');
  }
}

// Clicking the song swaps in Spotify's embed player with autoplay enabled,
// so the track starts playing right on the page instead of just linking out.
songLinkEl.addEventListener('click', (event) => {
  event.preventDefault();
  const url = songLinkEl.dataset.url;
  const trackId = trackIdFromUrl(url);
  if (!trackId) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&autoplay=1`;
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.loading = 'lazy';

  songEmbedEl.innerHTML = '';
  songEmbedEl.appendChild(iframe);
  mediaCardEl.classList.add('playing');
});

function tick() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    countdownEl.classList.add('hidden');
    songSectionEl.classList.add('hidden');
    doneMessageEl.classList.remove('hidden');
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
  updateSong(days);
}

tick();
const timer = setInterval(tick, 1000);

// Photo cover rotation. Listed explicitly (rather than probed at runtime) so the
// first photo appears immediately instead of waiting on network round-trips.
const PHOTOS = [
  'photos/photo1.jpg', 'photos/photo2.jpg', 'photos/photo3.jpg', 'photos/photo4.jpg',
  'photos/photo5.jpg', 'photos/photo6.jpg', 'photos/photo7.jpg', 'photos/photo8.jpg',
  'photos/photo9.jpg', 'photos/photo10.jpg', 'photos/photo11.jpg', 'photos/photo12.jpg',
  'photos/photo13.png', 'photos/photo14.jpg', 'photos/photo15.jpg', 'photos/photo16.jpg',
  'photos/photo17.jpg', 'photos/photo18.jpg', 'photos/photo19.jpg', 'photos/photo20.jpg',
  'photos/photo21.jpg', 'photos/photo22.jpg', 'photos/photo23.jpg', 'photos/photo24.jpg',
  'photos/photo25.jpg', 'photos/photo26.jpg', 'photos/photo27.png', 'photos/photo28.jpg',
  'photos/photo29.jpg', 'photos/photo30.jpg', 'photos/photo31.jpg', 'photos/photo32.jpg',
  'photos/photo33.jpg', 'photos/photo34.png', 'photos/photo35.jpg', 'photos/photo36.jpg',
  'photos/photo37.png', 'photos/photo38.jpg', 'photos/photo39.png', 'photos/photo40.jpg',
  'photos/photo41.jpg', 'photos/photo42.jpg', 'photos/photo43.jpg', 'photos/photo44.jpg',
  'photos/photo45.png', 'photos/photo46.jpg', 'photos/photo47.jpg', 'photos/photo48.jpg',
  'photos/photo49.png', 'photos/photo50.png', 'photos/photo51.jpg', 'photos/photo52.png',
  'photos/photo53.jpg', 'photos/photo54.jpg', 'photos/photo55.jpg', 'photos/photo56.jpg',
  'photos/photo57.jpg', 'photos/photo58.jpg', 'photos/photo59.jpg', 'photos/photo60.jpg',
  'photos/photo61.jpg', 'photos/photo62.jpg', 'photos/photo63.jpg', 'photos/photo64.jpg',
  'photos/photo65.jpg', 'photos/photo66.jpg', 'photos/photo67.jpg', 'photos/photo68.jpg',
  'photos/photo69.jpg', 'photos/photo70.jpg', 'photos/photo71.jpg', 'photos/photo72.jpg',
  'photos/photo73.jpg', 'photos/photo74.jpg', 'photos/photo75.jpg', 'photos/photo76.jpg',
  'photos/photo77.jpg', 'photos/photo78.jpg', 'photos/photo79.jpg', 'photos/photo80.jpg',
  'photos/photo81.jpg', 'photos/photo82.jpg', 'photos/photo83.jpg',
];

const coverImgEl = document.getElementById('cover-img');
const coverEl = document.getElementById('cover');

function startPhotoRotation() {
  const photos = PHOTOS;
  if (photos.length === 0) {
    coverEl.classList.add('hidden');
    return;
  }

  let current = Math.floor(Math.random() * photos.length);

  function showPhoto(i) {
    coverImgEl.classList.remove('loaded');
    const img = new Image();
    img.onload = () => {
      coverImgEl.src = photos[i];
      coverImgEl.classList.add('loaded');
    };
    img.src = photos[i];
  }

  function pickNext() {
    if (photos.length === 1) return current;
    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * photos.length);
    }
    return next;
  }

  showPhoto(current);
  if (photos.length > 1) {
    setInterval(() => {
      current = pickNext();
      showPhoto(current);
    }, 8000);
  }
}

startPhotoRotation();
