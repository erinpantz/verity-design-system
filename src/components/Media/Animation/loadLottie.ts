// The one place Verity loads the Lottie player. Animation imports this file
// only when an animation is about to come into view, so pages without one
// never download the player.
//
// The player is lottie-web's light build, which draws with SVG and doesn't
// run expressions (code inside a Lottie file). Verity's files use none. If a
// file ever needs them, change the import below to
// 'lottie-web/build/player/lottie_svg', the full SVG build.

import { strFromU8, unzipSync } from 'fflate';
import lottie, { type AnimationItem } from 'lottie-web/build/player/lottie_light';

export type { AnimationItem };

// A .lottie file is a zip. The animation itself is a JSON file in its a/
// folder (animations/ in older files); the file name can contain slashes.
const ANIMATION_JSON = /^(a|animations)\/.+\.json$/;

async function readAnimationData(src: string): Promise<unknown> {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Couldn’t load ${src} (${response.status})`);
  const zip = new Uint8Array(await response.arrayBuffer());
  const files = unzipSync(zip, { filter: (file) => ANIMATION_JSON.test(file.name) });
  const [json] = Object.values(files);
  if (!json) throw new Error(`${src} has no animation in it`);
  return JSON.parse(strFromU8(json));
}

// Loads the file and draws its first frame into the container, paused and set
// to loop. It resolves once the animation is ready to play, and rejects if the
// file can't be loaded or read.
export async function loadLottie(container: HTMLElement, src: string): Promise<AnimationItem> {
  const animationData = await readAnimationData(src);
  return new Promise((resolve, reject) => {
    const animation = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData,
      // Fills the frame and crops what doesn't fit, like an Image's cover
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    });
    // The player can finish setting up before a listener is added
    if (animation.isLoaded) resolve(animation);
    else animation.addEventListener('DOMLoaded', () => resolve(animation));
    animation.addEventListener('data_failed', () => {
      animation.destroy();
      reject(new Error(`Couldn’t read ${src}`));
    });
  });
}
