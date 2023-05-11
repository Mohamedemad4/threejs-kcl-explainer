import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [glsl()]
});

// i don't get it either https://github.com/bluwy/vite-plugin-warmup/issues/2#issuecomment-1519595598
// nor do i honestly care..
