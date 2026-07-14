// August 22, 2026, 12:00 AM Eastern (EDT, UTC-4 — daylight time is in effect in August)
const TARGET_DATE = new Date('2026-08-22T00:00:00-04:00');

// One song per remaining day, no repeats. Index 0 = day 42 (today), last index = day 0.
// The final entry (day 0, "today is the day!!") is a specific pinned song, not part
// of the sequential playlist pull.
const SONGS = [
  { title: 'Video Games', artist: 'Lana Del Rey', url: 'https://open.spotify.com/track/24jvD83UgLmrdGjhWTFslY' },
  { title: '12 to 12', artist: 'sombr', url: 'https://open.spotify.com/track/05od2qm2MTSKCHxy1GBp5W' },
  { title: 'Homewrecker', artist: 'sombr', url: 'https://open.spotify.com/track/7tICCrK3CcyRFKza7yrR0z' },
  { title: 'The Color Violet', artist: 'Tory Lanez', url: 'https://open.spotify.com/track/3azJifCSqg9fRij2yKIbWz' },
  { title: 'Closer', artist: 'Ne-Yo', url: 'https://open.spotify.com/track/2XbfY2O2v3xwedUJ0J2kkr' },
  { title: 'Espresso', artist: 'Sabrina Carpenter', url: 'https://open.spotify.com/track/2qSkIjg1o9h3YT9RAgYN75' },
  { title: 'PIXELATED KISSES', artist: 'Joji', url: 'https://open.spotify.com/track/0XpxBV69JUDfqyzrJbndsw' },
  { title: 'Nonsense', artist: 'Sabrina Carpenter', url: 'https://open.spotify.com/track/6dgUya35uo964z7GZXM07g' },
  { title: 'Stateside (with Zara Larsson)', artist: 'PinkPantheress, Zara Larsson', url: 'https://open.spotify.com/track/1DwscornXpj8fmOmYVlqZt' },
  { title: 'No Scrubs', artist: 'TLC', url: 'https://open.spotify.com/track/1KGi9sZVMeszgZOWivFpxs' },
  { title: "If I Ain't Got You", artist: 'Alicia Keys', url: 'https://open.spotify.com/track/3XVBdLihbNbxUwZosxcGuJ' },
  { title: 'Love On The Brain', artist: 'Rihanna', url: 'https://open.spotify.com/track/5oO3drDxtziYU2H1X23ZIp' },
  { title: 'Starboy', artist: 'The Weeknd, Daft Punk', url: 'https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB' },
  { title: 'Die For You', artist: 'The Weeknd', url: 'https://open.spotify.com/track/2Ch7LmS7r2Gy2kc64wv3Bz' },
  { title: 'Crush', artist: 'Duckwrth', url: 'https://open.spotify.com/track/3aUviSdBVbsdmH406j5GZC' },
  { title: 'Everywhere (2017 Remaster)', artist: 'Fleetwood Mac', url: 'https://open.spotify.com/track/254bXAqt3zP6P50BdQvEsq' },
  { title: 'No One Noticed', artist: 'The Marías', url: 'https://open.spotify.com/track/3siwsiaEoU4Kuuc9WKMUy5' },
  { title: 'Love Me Not', artist: 'Ravyn Lenae', url: 'https://open.spotify.com/track/4WFgvKVfEhb3IUAFGrutTR' },
  { title: 'Circus', artist: 'Britney Spears', url: 'https://open.spotify.com/track/7jk7gqyEonmVVYahZN5zhW' },
  { title: 'I Wanna Go', artist: 'Britney Spears', url: 'https://open.spotify.com/track/5cCAZS9VhLGEDV4NCfieeg' },
  { title: 'Gimme More', artist: 'Britney Spears', url: 'https://open.spotify.com/track/6ic8OlLUNEATToEFU3xmaH' },
  { title: 'Snap Out Of It', artist: 'Arctic Monkeys', url: 'https://open.spotify.com/track/0NdTUS4UiNYCNn5FgVqKQY' },
  { title: 'If U Seek Amy', artist: 'Britney Spears', url: 'https://open.spotify.com/track/2hdy9Wt9qp7M7d0U3ossu2' },
  { title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', url: 'https://open.spotify.com/track/5FVd6KXrgO9B3JPmC8OPst' },
  { title: 'Do I Wanna Know? (BBC Live Lounge)', artist: 'Hozier', url: 'https://open.spotify.com/track/32btQnrL0HR6M1KKAPf3D3' },
  { title: 'Maria', artist: 'Justin Bieber', url: 'https://open.spotify.com/track/7E1dQbOk1qcx9gEPUMBKsk' },
  { title: 'Work Song', artist: 'Hozier', url: 'https://open.spotify.com/track/5TgEJ62DOzBpGxZ7WRsrqb' },
  { title: 'Stick Season', artist: 'Noah Kahan', url: 'https://open.spotify.com/track/0mflMxspEfB0VbI1kyLiAv' },
  { title: 'Clarity', artist: 'Zedd, Foxes', url: 'https://open.spotify.com/track/60wwxj6Dd9NJlirf84wr2c' },
  { title: 'Maps', artist: 'Maroon 5', url: 'https://open.spotify.com/track/4gbVRS8gloEluzf0GzDOFc' },
  { title: 'She Will Be Loved', artist: 'Maroon 5', url: 'https://open.spotify.com/track/7sapKrjDij2fpDVj0GxP66' },
  { title: 'Moves Like Jagger', artist: 'Maroon 5, Christina Aguilera', url: 'https://open.spotify.com/track/7LcfRTgAVTs5pQGEQgUEzN' },
  { title: 'Let Me Inside', artist: 'Iration', url: 'https://open.spotify.com/track/08maIvh0evLsn4xFkVvLtw' },
  { title: 'Keep on Loving You', artist: 'Cigarettes After Sex', url: 'https://open.spotify.com/track/3GUSidbQwd7xuvU6AQorRh' },
  { title: 'Billie Bossa Nova', artist: 'Billie Eilish', url: 'https://open.spotify.com/track/2KnuaZYoGzDoHiBTNYOTXG' },
  { title: 'THEMSELVES', artist: 'Jordan Ward', url: 'https://open.spotify.com/track/3vzSGr8Anj3SLaMrp613Gm' },
  { title: 'Big Black Car', artist: 'Gregory Alan Isakov', url: 'https://open.spotify.com/track/3Kj2EWpIBnvETsYq4cq0IH' },
  { title: 'Legendary Lovers', artist: 'Katy Perry', url: 'https://open.spotify.com/track/0pOZYYEJawmTAPtkzYKSa2' },
  { title: 'Harleys In Hawaii', artist: 'Katy Perry', url: 'https://open.spotify.com/track/5nCthAh3jt4xKuLJAifAaR' },
  { title: 'Sunny day', artist: 'beabadoobee', url: 'https://open.spotify.com/track/12UQIJePnGeLmpVReYpG2w' },
  // Pinned final song for day 0 ("today is the day!!") — not part of the sequential pull.
  { title: 'Those Eyes', artist: 'New West', url: 'https://open.spotify.com/track/50x1Ic8CaXkYNvjmxe3WXy' },
];
const FIRST_DAY = 42; // SONGS[0] corresponds to this many days remaining (today, as of building this)

function getSongForDay(days) {
  const index = FIRST_DAY - days;
  if (index < 0 || index >= SONGS.length) return null;
  return SONGS[index];
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
  iframe.width = '300';
  iframe.height = '152';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.loading = 'lazy';

  songEmbedEl.innerHTML = '';
  songEmbedEl.appendChild(iframe);
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
  'photos/photo73.jpg',
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
