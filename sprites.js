// Falling Spongebob/Patrick sprites: gravity physics, drag-to-move, device-tilt
// gravity, and shake-to-scatter — all tuned for fast, snappy movement.

const SPRITE_LAYER = document.getElementById('sprite-layer');
const TILT_BUTTON = document.getElementById('tilt-button');

const SPRITE_IMAGES = ['sprites/spongebob.png', 'sprites/patrick.png'];
const SPRITE_COUNT = 4; // 2 Spongebob + 2 Patrick, alternating — half of the previous 9
const GRAVITY = 1300; // px/s^2, base downward acceleration
const RESTITUTION = 0.4; // bounce energy retained on wall/floor hits
const MAX_SPEED = 1900;
const COLLISION_RESTITUTION = 0.6; // bounce energy when two sprites collide with each other
const AIR_DRAG = 0.998; // tiny per-frame velocity decay so shake energy settles afterward
const ANGULAR_DRAG = 0.96; // per-frame spin decay so tumbling winds back down
const JITTER = 220; // px/s^2 of small continuous random noise, prevents identical resting spots

let gravityX = 0;
let gravityY = GRAVITY;

const sprites = [];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createSprite(index) {
  const src = SPRITE_IMAGES[index % SPRITE_IMAGES.length];
  const el = document.createElement('img');
  el.className = 'sprite';
  el.draggable = false;
  el.alt = '';

  const width = randomBetween(70, 125);
  el.style.width = `${width}px`;
  el.style.height = 'auto';

  SPRITE_LAYER.appendChild(el);

  const sprite = {
    el,
    width,
    height: width, // corrected once real image dimensions are known
    x: randomBetween(0, Math.max(0, window.innerWidth - width)),
    y: randomBetween(-window.innerHeight, -width),
    vx: randomBetween(-80, 80),
    vy: 0,
    angle: randomBetween(-18, 18),
    angularVelocity: randomBetween(-40, 40),
    dragging: false,
    pointerId: null,
    dragOffsetX: 0,
    dragOffsetY: 0,
    lastMoveTime: 0,
    // Per-sprite variation so a uniform force (tilt, shake) doesn't send
    // every character to the exact same spot at the exact same time —
    // real objects in a jar differ slightly in how they catch, slide, and settle.
    massScale: randomBetween(0.7, 1.4),
    floorFriction: randomBetween(0.82, 0.94),
    restitutionScale: randomBetween(0.8, 1.2),
  };

  function applyNaturalSize() {
    if (el.naturalWidth > 0 && el.naturalHeight > 0) {
      sprite.height = width * (el.naturalHeight / el.naturalWidth);
    }
  }

  el.addEventListener('load', applyNaturalSize);
  el.src = src;
  // Cached images can fire 'load' before the listener above attaches, or
  // never fire it at all in some browsers — check the already-decoded state too.
  if (el.complete) applyNaturalSize();

  attachDragHandlers(sprite);
  sprites.push(sprite);
}

function attachDragHandlers(sprite) {
  const { el } = sprite;

  el.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    sprite.dragging = true;
    sprite.pointerId = event.pointerId;
    sprite.dragOffsetX = event.clientX - sprite.x;
    sprite.dragOffsetY = event.clientY - sprite.y;
    sprite.lastMoveTime = performance.now();
    sprite.vx = 0;
    sprite.vy = 0;

    el.style.cursor = 'grabbing';
    el.style.zIndex = '100';
    try {
      el.setPointerCapture(event.pointerId);
    } catch (err) {
      // Some browsers reject capture for synthetic or already-released pointers;
      // dragging still works via document-level move/up listeners below.
    }
  });

  el.addEventListener('pointermove', (event) => {
    if (!sprite.dragging || event.pointerId !== sprite.pointerId) return;
    event.preventDefault();

    const now = performance.now();
    const dt = Math.max((now - sprite.lastMoveTime) / 1000, 1 / 120);

    const newX = event.clientX - sprite.dragOffsetX;
    const newY = event.clientY - sprite.dragOffsetY;

    sprite.vx = (newX - sprite.x) / dt;
    sprite.vy = (newY - sprite.y) / dt;

    sprite.x = newX;
    sprite.y = newY;

    sprite.lastMoveTime = now;
  });

  function endDrag(event) {
    if (event.pointerId !== sprite.pointerId) return;
    sprite.dragging = false;
    sprite.pointerId = null;
    el.style.cursor = 'grab';
    el.style.zIndex = '';
  }

  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
}

// Two sprites collide as circles somewhat smaller than their bounding boxes
// (the images have transparent margins, so a tight box would feel like
// invisible walls between characters that visually aren't touching yet).
function collisionRadius(sprite) {
  return Math.min(sprite.width, sprite.height) * 0.32;
}

function resolveCollisions() {
  for (let i = 0; i < sprites.length; i++) {
    const a = sprites[i];
    if (a.dragging) continue;
    const ax = a.x + a.width / 2;
    const ay = a.y + a.height / 2;
    const ra = collisionRadius(a);

    for (let j = i + 1; j < sprites.length; j++) {
      const b = sprites[j];
      if (b.dragging) continue;
      const bx = b.x + b.width / 2;
      const by = b.y + b.height / 2;
      const rb = collisionRadius(b);

      const dx = bx - ax;
      const dy = by - ay;
      const dist = Math.hypot(dx, dy) || 0.0001;
      const minDist = ra + rb;
      if (dist >= minDist) continue;

      const nx = dx / dist;
      const ny = dy / dist;

      // Separate so they stop overlapping.
      const overlap = minDist - dist;
      a.x -= (nx * overlap) / 2;
      a.y -= (ny * overlap) / 2;
      b.x += (nx * overlap) / 2;
      b.y += (ny * overlap) / 2;

      // Exchange velocity along the collision normal (equal-mass elastic-ish bounce).
      const relVx = b.vx - a.vx;
      const relVy = b.vy - a.vy;
      const relDot = relVx * nx + relVy * ny;
      if (relDot < 0) {
        const impulse = -relDot * COLLISION_RESTITUTION;
        a.vx -= impulse * nx;
        a.vy -= impulse * ny;
        b.vx += impulse * nx;
        b.vy += impulse * ny;

        // A glancing hit should also set them tumbling, not just bounce in a
        // straight line — nudge spin from the sideways (tangential) part of the hit.
        const tangentX = -ny;
        const tangentY = nx;
        const tangentDot = relVx * tangentX + relVy * tangentY;
        a.angularVelocity -= tangentDot * 0.15;
        b.angularVelocity += tangentDot * 0.15;
      }
    }
  }
}

function stepPhysics(dt) {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  for (const sprite of sprites) {
    if (sprite.dragging) continue;
    if (!Number.isFinite(sprite.x) || !Number.isFinite(sprite.y)) continue;

    sprite.vx += gravityX * dt * sprite.massScale;
    sprite.vy += gravityY * dt * sprite.massScale;

    // A little constant random jitter (like uneven friction / air currents)
    // so sprites never all converge on the exact same resting point.
    sprite.vx += randomBetween(-JITTER, JITTER) * dt;
    sprite.vy += randomBetween(-JITTER, JITTER) * dt;

    // Gentle air drag so energy from a shake settles back down afterward
    // instead of sliding around at top speed forever.
    sprite.vx *= AIR_DRAG;
    sprite.vy *= AIR_DRAG;
    sprite.angularVelocity *= ANGULAR_DRAG;

    sprite.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, sprite.vx));
    sprite.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, sprite.vy));

    sprite.x += sprite.vx * dt;
    sprite.y += sprite.vy * dt;
    sprite.angle += sprite.angularVelocity * dt;

    const minX = 0;
    const maxX = Math.max(0, viewportW - sprite.width);
    const minY = 0;
    const maxY = Math.max(0, viewportH - sprite.height);
    const restitution = RESTITUTION * sprite.restitutionScale;

    if (sprite.x < minX) {
      sprite.x = minX;
      sprite.vx = -sprite.vx * restitution;
      sprite.angularVelocity += sprite.vy * 0.05;
    } else if (sprite.x > maxX) {
      sprite.x = maxX;
      sprite.vx = -sprite.vx * restitution;
      sprite.angularVelocity -= sprite.vy * 0.05;
    }

    if (sprite.y > maxY) {
      sprite.y = maxY;
      sprite.vy = -sprite.vy * restitution;
      sprite.vx *= sprite.floorFriction;
      // Landing on the floor while moving sideways sets it rolling/tumbling.
      sprite.angularVelocity += sprite.vx * 0.12;
      if (Math.abs(sprite.vy) < 40) sprite.vy = 0;
    } else if (sprite.y < minY) {
      sprite.y = minY;
      sprite.vy = -sprite.vy * restitution;
    }
  }

  resolveCollisions();
}

function render() {
  for (const sprite of sprites) {
    sprite.el.style.left = `${sprite.x}px`;
    sprite.el.style.top = `${sprite.y}px`;
    sprite.el.style.transform = `rotate(${sprite.angle}deg)`;
  }
}

let lastFrameTime = null;

function frame(now) {
  if (lastFrameTime === null) lastFrameTime = now;
  const dt = Math.min((now - lastFrameTime) / 1000, 1 / 30);
  lastFrameTime = now;

  stepPhysics(dt);
  render();

  requestAnimationFrame(frame);
}

// --- Device tilt controls gravity direction on mobile ---
// Gravity is a full directional vector (not a small offset on a fixed pull),
// so tilting far enough in any direction sends sprites flying that way —
// left/right/up/down all respond as strongly as the default downward pull.
let baselineBeta = null;
let baselineGamma = null;
const TILT_MAX_DEG = 32; // tilt angle (from resting position) for full-strength gravity
const TILT_STRENGTH = 1.0; // multiplier vs. base GRAVITY; kept at 1 so tilt redirects gravity rather than overpowering it into one hard pull

function handleOrientation(event) {
  if (event.beta === null || event.gamma === null) return;
  if (baselineBeta === null) {
    baselineBeta = event.beta;
    baselineGamma = event.gamma;
  }
  const deltaBeta = clamp((event.beta - baselineBeta) / TILT_MAX_DEG, -1, 1);
  const deltaGamma = clamp((event.gamma - baselineGamma) / TILT_MAX_DEG, -1, 1);

  gravityX = deltaGamma * GRAVITY * TILT_STRENGTH;
  gravityY = GRAVITY + deltaBeta * GRAVITY * TILT_STRENGTH;
}

function enableTilt() {
  window.addEventListener('deviceorientation', handleOrientation, true);
}

// --- Shaking the phone jostles every sprite continuously, like a jar ---
// Every motion reading injects force straight into each sprite's velocity in
// real time (no threshold/cooldown gating a single "pop") — combined with
// sprite-vs-sprite collisions, this is what makes it read as shaking a jar
// full of characters rather than launching a single firework per shake.
const SHAKE_FORCE = 32; // px/s velocity added per unit of device acceleration (m/s^2), per reading
const SHAKE_MAX_PER_EVENT = 650; // cap per single reading so one spike can't fling something off-screen instantly

let lastAcceleration = null;

function handleMotion(event) {
  let fx = 0;
  let fy = 0;

  if (event.acceleration && event.acceleration.x != null) {
    // Gravity already excluded — this is purely the shake motion.
    fx = event.acceleration.x;
    fy = event.acceleration.y;
  } else if (event.accelerationIncludingGravity && event.accelerationIncludingGravity.x != null) {
    // Fall back to the change between readings, which cancels out the
    // constant gravity component and leaves just the shake motion.
    const acc = event.accelerationIncludingGravity;
    if (lastAcceleration) {
      fx = acc.x - lastAcceleration.x;
      fy = acc.y - lastAcceleration.y;
    }
    lastAcceleration = { x: acc.x, y: acc.y, z: acc.z };
  } else {
    return;
  }

  // Device +x is to the right and matches screen x when the phone is held
  // upright; device +y points toward the top of the phone, opposite of
  // screen y (which grows downward), so it's flipped here.
  const forceX = clamp(fx * SHAKE_FORCE, -SHAKE_MAX_PER_EVENT, SHAKE_MAX_PER_EVENT);
  const forceY = clamp(-fy * SHAKE_FORCE, -SHAKE_MAX_PER_EVENT, SHAKE_MAX_PER_EVENT);

  if (forceX === 0 && forceY === 0) return;

  for (const sprite of sprites) {
    if (sprite.dragging) continue;
    // Slight per-sprite variation so a jar full of characters jostles
    // unevenly instead of all moving in perfect lockstep.
    sprite.vx += forceX * randomBetween(0.7, 1.3);
    sprite.vy += forceY * randomBetween(0.7, 1.3);
  }
}

function enableMotion() {
  window.addEventListener('devicemotion', handleMotion, true);
}

const needsOrientationPermission =
  typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
const needsMotionPermission =
  typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function';

if (needsOrientationPermission || needsMotionPermission) {
  // iOS 13+ requires an explicit user gesture to grant motion/orientation access.
  TILT_BUTTON.classList.remove('hidden');
  TILT_BUTTON.addEventListener('click', () => {
    const requests = [];
    if (needsOrientationPermission) {
      requests.push(DeviceOrientationEvent.requestPermission().then((state) => {
        if (state === 'granted') enableTilt();
      }));
    } else {
      enableTilt();
    }
    if (needsMotionPermission) {
      requests.push(DeviceMotionEvent.requestPermission().then((state) => {
        if (state === 'granted') enableMotion();
      }));
    } else {
      enableMotion();
    }
    Promise.all(requests).catch(() => {}).finally(() => {
      TILT_BUTTON.classList.add('hidden');
    });
  });
} else {
  if (typeof DeviceOrientationEvent !== 'undefined') enableTilt();
  if (typeof DeviceMotionEvent !== 'undefined') enableMotion();
}

window.addEventListener('resize', () => {
  for (const sprite of sprites) {
    sprite.x = Math.min(sprite.x, Math.max(0, window.innerWidth - sprite.width));
    sprite.y = Math.min(sprite.y, Math.max(0, window.innerHeight - sprite.height));
  }
});

for (let i = 0; i < SPRITE_COUNT; i++) {
  createSprite(i);
}

requestAnimationFrame(frame);
