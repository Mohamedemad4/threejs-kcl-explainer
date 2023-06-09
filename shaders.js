const watervertexShader = `
uniform sampler2D heightmap;
#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
    varying vec3 vNormal;
#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

    vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );

    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>

    // # include <beginnormal_vertex>
    // Compute normal from heightmap
    vec3 objectNormal = vec3(
        ( texture2D( heightmap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( heightmap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
        ( texture2D( heightmap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( heightmap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
        1.0 );
    //<beginnormal_vertex>

    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

    vNormal = normalize( transformedNormal );

#endif

    //# include <begin_vertex>
    float heightValue = texture2D( heightmap, uv ).x;
    vec3 transformed = vec3( position.x, position.y, heightValue );
    //<begin_vertex>

    #include <displacementmap_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <shadowmap_vertex>

}
`

const heightMapShader = `			#include <common>

uniform vec2 mousePos;
uniform float mouseSize;
uniform float viscosityConstant;

#define deltaTime ( 1.0 / 60.0 )
#define GRAVITY_CONSTANT ( resolution.x * deltaTime * 3.0 )

void main()	{

    vec2 cellSize = 1.0 / resolution.xy;

    vec2 uv = gl_FragCoord.xy * cellSize;

    // heightmapValue.x == height
    // heightmapValue.y == velocity
    // heightmapValue.z, heightmapValue.w not used
    vec4 heightmapValue = texture2D( heightmap, uv );

    // Get neighbours
    vec4 north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) );
    vec4 south = texture2D( heightmap, uv + vec2( 0.0, - cellSize.y ) );
    vec4 east = texture2D( heightmap, uv + vec2( cellSize.x, 0.0 ) );
    vec4 west = texture2D( heightmap, uv + vec2( - cellSize.x, 0.0 ) );

    float sump = north.x + south.x + east.x + west.x - 4.0 * heightmapValue.x;

    float accel = sump * GRAVITY_CONSTANT;

    // Dynamics
    heightmapValue.y += accel;
    heightmapValue.x += heightmapValue.y * deltaTime;

    // Viscosity
    heightmapValue.x += sump * viscosityConstant;

    // Mouse influence
    float mousePhase = clamp( length( ( uv - vec2( 0.5 ) ) * BOUNDS - vec2( mousePos.x, - mousePos.y ) ) * PI / mouseSize, 0.0, PI );
    heightmapValue.x += cos( mousePhase ) + 1.0;

    gl_FragColor = heightmapValue;

}

`

const smoothShaderGLSL = `uniform sampler2D texture;

void main()	{

    vec2 cellSize = 1.0 / resolution.xy;

    vec2 uv = gl_FragCoord.xy * cellSize;

    // Computes the mean of texel and 4 neighbours
    vec4 textureValue = texture2D( texture, uv );
    textureValue += texture2D( texture, uv + vec2( 0.0, cellSize.y ) );
    textureValue += texture2D( texture, uv + vec2( 0.0, - cellSize.y ) );
    textureValue += texture2D( texture, uv + vec2( cellSize.x, 0.0 ) );
    textureValue += texture2D( texture, uv + vec2( - cellSize.x, 0.0 ) );

    textureValue /= 5.0;

    gl_FragColor = textureValue;

}`

export { watervertexShader,heightMapShader,smoothShaderGLSL }