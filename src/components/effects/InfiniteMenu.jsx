'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mat4, quat, vec2, vec3 } from 'gl-matrix';
import SocialButtons from '@/components/ui/SocialButtons';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './InfiniteMenu.css';


const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);

    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);

    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;
uniform int uFocusActive;
uniform int uFocusInstance;
uniform int uFocusItem;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    if (uFocusActive == 1) {
        // While a member dwells at his seat, his face shows on that instance only:
        // every other instance statically mapped to him borrows another member's face.
        if (vInstanceId != uFocusInstance && itemIndex == uFocusItem && uItemCount > 1) {
            int off = 1 + (vInstanceId % (uItemCount - 1));
            itemIndex = (uFocusItem + off) % uItemCount;
        }
    }
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    
    float scale = max(imageAspect / containerAspect, 
                     containerAspect / imageAspect);
    
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    
    st = clamp(st, 0.0, 1.0);
    
    st = st * cellSize + cellOffset;
    
    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

class Face {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Vertex {
  constructor(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  constructor() {
    this.vertices = [];
    this.faces = [];
  }

  addVertex(...args) {
    for (let i = 0; i < args.length; i += 3) {
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  addFace(...args) {
    for (let i = 0; i < args.length; i += 3) {
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  get lastVertex() {
    return this.vertices[this.vertices.length - 1];
  }

  subdivide(divisions = 1) {
    const midPointCache = {};
    let f = this.faces;

    for (let div = 0; div < divisions; ++div) {
      const newFaces = new Array(f.length * 4);

      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);

        const i = ndx * 4;
        newFaces[i + 0] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });

      f = newFaces;
    }

    this.faces = f;
    return this;
  }

  spherize(radius = 1) {
    this.vertices.forEach(vertex => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }

  get data() {
    return {
      vertices: this.vertexData,
      indices: this.indexData,
      normals: this.normalData,
      uvs: this.uvData
    };
  }

  get vertexData() {
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.position)));
  }

  get normalData() {
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal)));
  }

  get uvData() {
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)));
  }

  get indexData() {
    return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c]));
  }

  getMidPoint(ndxA, ndxB, cache) {
    const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
      return cache[cacheKey];
    }
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[cacheKey] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      0,
      0,
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      t,
      0,
      -1,
      t,
      0,
      1,
      -t,
      0,
      -1,
      -t,
      0,
      1
    ).addFace(
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1
    );
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    steps = Math.max(4, steps);

    const alpha = (2 * Math.PI) / steps;

    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;

    for (let i = 0; i < steps; ++i) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;

      if (i > 0) {
        this.addFace(0, i, i + 1);
      }
    }
    this.addFace(0, steps, 1);
  }
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {
  const program = gl.createProgram();

  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const shader = createShader(gl, type, shaderSources[ndx]);
    if (shader) gl.attachShader(program, shader);
  });

  if (transformFeedbackVaryings) {
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
  }

  if (attribLocations) {
    for (const attrib in attribLocations) {
      gl.bindAttribLocation(program, attribLocations[attrib], attrib);
    }
  }

  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeVertexArray(gl, bufLocNumElmPairs, indices) {
  const va = gl.createVertexArray();
  gl.bindVertexArray(va);

  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
  }

  if (indices) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }

  gl.bindVertexArray(null);
  return va;
}

function resizeCanvasToDisplaySize(canvas) {
  const dpr = Math.min(2, window.devicePixelRatio);
  const displayWidth = Math.round(canvas.clientWidth * dpr);
  const displayHeight = Math.round(canvas.clientHeight * dpr);
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  return needResize;
}

function makeBuffer(gl, sizeOrData, usage) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function createAndSetupTexture(gl, minFilter, magFilter, wrapS, wrapT) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  return texture;
}

class ArcballControl {
  isPointerDown = false;
  orientation = quat.create();
  pointerRotation = quat.create();
  rotationVelocity = 0;
  rotationAxis = vec3.fromValues(1, 0, 0);
  snapDirection = vec3.fromValues(0, 0, -1);
  snapTargetDirection;
  // Per-frame rotation supplied by the auto-tour (a scripted "hand" drag). It feeds the
  // same velocity smoothing as a real drag, so the motion-stretch and info fade react.
  tourRotation = null;
  EPSILON = 0.1;
  IDENTITY_QUAT = quat.create();

  constructor(canvas, updateCallback) {
    this.canvas = canvas;
    this.updateCallback = updateCallback || (() => null);

    this.pointerPos = vec2.create();
    this.previousPointerPos = vec2.create();
    this._rotationVelocity = 0;
    this._combinedQuat = quat.create();

    canvas.addEventListener('pointerdown', e => {
      // Touch drags must scroll the page, never rotate the sphere (user request).
      if (e.pointerType === 'touch') return;
      vec2.set(this.pointerPos, e.clientX, e.clientY);
      vec2.copy(this.previousPointerPos, this.pointerPos);
      this.isPointerDown = true;
    });
    canvas.addEventListener('pointerup', () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener('pointerleave', () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener('pointercancel', () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener('pointermove', e => {
      if (this.isPointerDown) {
        vec2.set(this.pointerPos, e.clientX, e.clientY);
      }
    });

    canvas.style.touchAction = 'pan-y';
  }

  update(deltaTime, targetFrameDuration = 16) {
    const timeScale = deltaTime / targetFrameDuration + 0.00001;
    let angleFactor = timeScale;
    let snapRotation = quat.create();

    if (this.isPointerDown) {
      const INTENSITY = 0.3 * timeScale;
      const ANGLE_AMPLIFICATION = 5 / timeScale;

      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);

      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);

        const p = this.#project(midPointerPos);
        const q = this.#project(this.previousPointerPos);
        const a = vec3.normalize(vec3.create(), p);
        const b = vec3.normalize(vec3.create(), q);

        vec2.copy(this.previousPointerPos, midPointerPos);

        angleFactor *= ANGLE_AMPLIFICATION;

        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);
      }
    } else {
      const INTENSITY = 0.1 * timeScale;
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);

      if (this.tourRotation) {
        quat.copy(snapRotation, this.tourRotation);
      } else if (this.snapTargetDirection) {
        const a = this.snapTargetDirection;
        const b = this.snapDirection;
        const sqrDist = vec3.squaredDistance(a, b);
        const distanceFactor = Math.min(0.28, Math.max(0.06, Math.sqrt(sqrDist) * 0.18));
        angleFactor *= distanceFactor;
        this.quatFromVectors(a, b, snapRotation, angleFactor);
      }
    }

    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    const RA_INTENSITY = 0.8 * timeScale;
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);
    quat.normalize(this._combinedQuat, this._combinedQuat);

    const rad = Math.acos(this._combinedQuat[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    let rv = 0;
    if (s > 0.000001) {
      rv = rad / (2 * Math.PI);
      this.rotationAxis[0] = this._combinedQuat[0] / s;
      this.rotationAxis[1] = this._combinedQuat[1] / s;
      this.rotationAxis[2] = this._combinedQuat[2] / s;
    }

    const RV_INTENSITY = 0.5 * timeScale;
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;
    this.rotationVelocity = this._rotationVelocity / timeScale;

    this.updateCallback(deltaTime);
  }

  quatFromVectors(a, b, out, angleFactor = 1) {
    const axis = vec3.cross(vec3.create(), a, b);
    vec3.normalize(axis, axis);
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));
    const angle = Math.acos(d) * angleFactor;
    quat.setAxisAngle(out, axis, angle);
    return { q: out, axis, angle };
  }

  #project(pos) {
    const r = 2;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;

    const x = (2 * pos[0] - w - 1) / s;
    const y = (2 * pos[1] - h - 1) / s;
    let z = 0;
    const xySq = x * x + y * y;
    const rSq = r * r;

    if (xySq <= rSq / 2.0) {
      z = Math.sqrt(rSq - xySq);
    } else {
      z = rSq / Math.sqrt(xySq);
    }
    return vec3.fromValues(-x, y, z);
  }
}

class InfiniteGridMenu {
  TARGET_FRAME_DURATION = 1000 / 60;
  SPHERE_RADIUS = 2;

  #time = 0;
  #deltaTime = 0;
  #deltaFrames = 0;
  #frames = 0;

  camera = {
    matrix: mat4.create(),
    near: 0.1,
    far: 40,
    fov: Math.PI / 4,
    aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inversProjection: mat4.create()
    }
  };

  nearestVertexIndex = null;
  smoothRotationVelocity = 0;
  scaleFactor = 1.0;
  movementActive = false;

  autoTourEnabled = true;
  wasDragging = false;
  targetMemberIndex = 0;
  targetVertexIndex = -1;
  dwellTimer = 0;
  dwellDuration = 4800;
  isTransitioning = false;
  microDriftAngle = 0;
  // Scripted hand-drag between members: start direction, elapsed/total time, arc side.
  tourStart = vec3.create();
  tourElapsed = 0;
  tourDuration = 1;
  tourBow = 0.22;

  constructor(canvas, items, onActiveItemChange, onMovementChange, onInit = null, scale = 1.0) {
    this.canvas = canvas;
    this.items = items || [];
    const real = this.items.map((it, i) => (it && !it.isPlaceholder ? i : -1)).filter(i => i >= 0);
    this.tourMembers = real.length ? real : this.items.map((_, i) => i);
    this.onActiveItemChange = onActiveItemChange || (() => {});
    this.focusActive = false;
    this.focusInstance = -1;
    this.focusItem = 0;
    this.onMovementChange = onMovementChange || (() => {});
    this.scaleFactor = scale;
    this.camera.position[2] = 3 * scale;
    this.#init(onInit);
  }

  resize() {
    this.viewportSize = vec2.set(this.viewportSize || vec2.create(), this.canvas.clientWidth, this.canvas.clientHeight);

    const gl = this.gl;
    const needsResize = resizeCanvasToDisplaySize(gl.canvas);
    if (needsResize) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    this.#updateProjectionMatrix(gl);
  }

  isPlaying = false;
  rafId = null;

  run(time = 0) {
    if (!this.isPlaying) {
      this.rafId = null;
      return;
    }
    this.#deltaTime = Math.min(32, time - this.#time);
    this.#time = time;
    this.#deltaFrames = this.#deltaTime / this.TARGET_FRAME_DURATION;
    this.#frames += this.#deltaFrames;

    this.#animate(this.#deltaTime);
    this.#render();

    this.rafId = requestAnimationFrame(t => this.run(t));
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.#time = performance.now();
    this.rafId = requestAnimationFrame(t => this.run(t));
  }

  pause() {
    this.isPlaying = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  destroy() {
    this.pause();
  }

  #init(onInit) {
    this.gl = this.canvas.getContext('webgl2', { antialias: true, alpha: true });
    const gl = this.gl;
    if (!gl) {
      throw new Error('No WebGL 2 context!');
    }

    this.viewportSize = vec2.fromValues(this.canvas.clientWidth, this.canvas.clientHeight);
    this.drawBufferSize = vec2.clone(this.viewportSize);

    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {
      aModelPosition: 0,
      aModelNormal: 1,
      aModelUvs: 2,
      aInstanceMatrix: 3
    });

    this.discLocations = {
      aModelPosition: gl.getAttribLocation(this.discProgram, 'aModelPosition'),
      aModelUvs: gl.getAttribLocation(this.discProgram, 'aModelUvs'),
      aInstanceMatrix: gl.getAttribLocation(this.discProgram, 'aInstanceMatrix'),
      uWorldMatrix: gl.getUniformLocation(this.discProgram, 'uWorldMatrix'),
      uViewMatrix: gl.getUniformLocation(this.discProgram, 'uViewMatrix'),
      uProjectionMatrix: gl.getUniformLocation(this.discProgram, 'uProjectionMatrix'),
      uCameraPosition: gl.getUniformLocation(this.discProgram, 'uCameraPosition'),
      uScaleFactor: gl.getUniformLocation(this.discProgram, 'uScaleFactor'),
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram, 'uRotationAxisVelocity'),
      uTex: gl.getUniformLocation(this.discProgram, 'uTex'),
      uFrames: gl.getUniformLocation(this.discProgram, 'uFrames'),
      uItemCount: gl.getUniformLocation(this.discProgram, 'uItemCount'),
      uAtlasSize: gl.getUniformLocation(this.discProgram, 'uAtlasSize'),
      uFocusActive: gl.getUniformLocation(this.discProgram, 'uFocusActive'),
      uFocusInstance: gl.getUniformLocation(this.discProgram, 'uFocusInstance'),
      uFocusItem: gl.getUniformLocation(this.discProgram, 'uFocusItem')
    };

    this.discGeo = new DiscGeometry(56, 1);
    this.discBuffers = this.discGeo.data;
    this.discVAO = makeVertexArray(
      gl,
      [
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2]
      ],
      this.discBuffers.indices
    );

    this.icoGeo = new IcosahedronGeometry();
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    // Reposition members on the sphere WITHOUT changing their sequence: sort the icosahedron
    // vertices top-to-bottom (then by longitude) so consecutive members sit in a clean
    // ordered spiral instead of scattered points. Mapping stays i -> sortedVertex[i % len].
    const __sortedVerts = this.icoGeo.vertices
      .map(v => v.position)
      .map(p => ({ y: p[1], lon: Math.atan2(p[2], p[0]), p }))
      .sort((a, b) => (b.y - a.y) || (a.lon - b.lon))
      .map(o => o.p);
    this.instancePositions = __sortedVerts;
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;
    this.#initDiscInstances(this.DISC_INSTANCE_COUNT);

    this.worldMatrix = mat4.create();
    this.#initTexture();

    this.control = new ArcballControl(this.canvas, deltaTime => this.#onControlUpdate(deltaTime));

    this.#updateCameraMatrix();
    this.#updateProjectionMatrix(gl);
    this.resize();

    if (onInit) onInit(this);
  }

  #initTexture() {
    const gl = this.gl;
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);

    const itemCount = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 512;

    canvas.width = this.atlasSize * cellSize;
    canvas.height = this.atlasSize * cellSize;

    Promise.all(
      this.items.map(
        item =>
          new Promise(resolve => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => {
              console.warn('Failed to load image:', item.image);
              const fallbackCanvas = document.createElement('canvas');
              fallbackCanvas.width = cellSize;
              fallbackCanvas.height = cellSize;
              const fCtx = fallbackCanvas.getContext('2d');
              fCtx.fillStyle = '#1e1b4b';
              fCtx.fillRect(0, 0, cellSize, cellSize);
              fCtx.fillStyle = '#c7d2fe';
              fCtx.font = 'bold 64px sans-serif';
              fCtx.textAlign = 'center';
              fCtx.textBaseline = 'middle';
              fCtx.fillText((item.title || item.name || 'Team').charAt(0), cellSize / 2, cellSize / 2);
              resolve(fallbackCanvas);
            };
            img.src = item.image;
          })
      )
    ).then(images => {
      images.forEach((img, i) => {
        const x = (i % this.atlasSize) * cellSize;
        const y = Math.floor(i / this.atlasSize) * cellSize;
        ctx.drawImage(img, x, y, cellSize, cellSize);
      });

      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.generateMipmap(gl.TEXTURE_2D);
    });
  }

  #initDiscInstances(count) {
    const gl = this.gl;
    this.discInstances = {
      matricesArray: new Float32Array(count * 16),
      matrices: [],
      buffer: gl.createBuffer()
    };
    for (let i = 0; i < count; ++i) {
      const instanceMatrixArray = new Float32Array(this.discInstances.matricesArray.buffer, i * 16 * 4, 16);
      instanceMatrixArray.set(mat4.create());
      this.discInstances.matrices.push(instanceMatrixArray);
    }
    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);
    const mat4AttribSlotCount = 4;
    const bytesPerMatrix = 16 * 4;
    for (let j = 0; j < mat4AttribSlotCount; ++j) {
      const loc = this.discLocations.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  #animate(deltaTime) {
    const gl = this.gl;
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);

    // While a member dwells at his seat, no other instance may repeat his face.
    if (this.targetVertexIndex >= 0 && !this.isTransitioning && !this.control.isPointerDown) {
      this.focusInstance = this.targetVertexIndex;
      this.focusItem = this.targetMemberIndex % Math.max(1, this.items.length);
      this.focusActive = true;
    } else {
      this.focusActive = false;
    }

    let positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));
    const scale = 0.25;
    const SCALE_INTENSITY = 0.6;
    positions.forEach((p, ndx) => {
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);
      const finalScale = s * scale;
      const matrix = mat4.create();
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));

      mat4.copy(this.discInstances.matrices[ndx], matrix);
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  #render() {
    const gl = this.gl;
    gl.useProgram(this.discProgram);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(
      this.discLocations.uCameraPosition,
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2]
    );
    gl.uniform4f(
      this.discLocations.uRotationAxisVelocity,
      this.control.rotationAxis[0],
      this.control.rotationAxis[1],
      this.control.rotationAxis[2],
      this.smoothRotationVelocity * 1.1
    );

    gl.uniform1i(this.discLocations.uItemCount, this.items.length);
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);
    gl.uniform1i(this.discLocations.uFocusActive, this.focusActive ? 1 : 0);
    gl.uniform1i(this.discLocations.uFocusInstance, this.focusInstance);
    gl.uniform1i(this.discLocations.uFocusItem, this.focusItem);

    gl.uniform1f(this.discLocations.uFrames, this.#frames);
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);
    gl.uniform1i(this.discLocations.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);

    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.discBuffers.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.DISC_INSTANCE_COUNT
    );


  }

  #updateCameraMatrix() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  #updateProjectionMatrix(gl) {
    this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35;
    const distance = this.camera.position[2];
    if (this.camera.aspect > 1) {
      this.camera.fov = 2 * Math.atan(height / distance);
    } else {
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);
    }
    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far
    );
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  #onControlUpdate(deltaTime) {
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;
    let damping = 5 / timeScale;
    let cameraTargetZ = 3 * this.scaleFactor;

    const isMoving = this.control.isPointerDown
      || Math.abs(this.smoothRotationVelocity) > 0.01
      || this.isTransitioning; // a tour hop keeps the card hidden for its whole duration

    if (isMoving !== this.movementActive) {
      this.movementActive = isMoving;
      this.onMovementChange(isMoving);
    }

    const isDragging = this.control.isPointerDown;

    if (isDragging) {
      // Manual drag & drop: user takes over and rotates the 3D sphere
      this.wasDragging = true;
      this.dwellTimer = 0;
      this.isTransitioning = false;
      this.control.tourRotation = null;
      const nearestVertexIndex = this.#findNearestVertexIndex();
      this.targetMemberIndex = nearestVertexIndex % Math.max(1, this.items.length);
      this.targetVertexIndex = nearestVertexIndex;
      // No onActiveItemChange while dragging: the label must not flip mid-spin.

      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / timeScale;
    } else {
      // User is NOT dragging (mouse hover or idle): auto-tour keeps running smoothly without stopping!
      if (this.wasDragging) {
        // Just released drag & drop: snap to the chosen member and reset dwell timer
        this.wasDragging = false;
        const nearestVertexIndex = this.#findNearestVertexIndex();
        this.targetMemberIndex = nearestVertexIndex % Math.max(1, this.items.length);
        this.targetVertexIndex = nearestVertexIndex;
        // Settle onto the released member (classic snap), then dwell there.
        this.isTransitioning = false;
        this.dwellTimer = 0;
        this.onActiveItemChange(this.targetMemberIndex);
      }

      // Auto-tour: glide to the first real member, then hop between real members only
      if (this.targetVertexIndex < 0) {
        this.targetMemberIndex = this.tourMembers[0] ?? 0;
        this.targetVertexIndex = this.#findBestVertexForMember(this.targetMemberIndex);
        this.#beginTourMove();
        // Announce at settle, not at spin start.
      }

      if (this.isTransitioning) {
        this.tourElapsed += deltaTime;
        const t = Math.min(1, this.tourElapsed / this.tourDuration);
        const vertexDir = vec3.normalize(vec3.create(), this.#getVertexWorldPosition(this.targetVertexIndex));
        const desired = this.#tourPathPoint(t);
        // Rotate so the target vertex sits exactly where the hand has dragged it to.
        const rot = quat.create();
        if (vec3.squaredDistance(vertexDir, desired) > 1e-10) this.control.quatFromVectors(vertexDir, desired, rot, 1);
        this.control.tourRotation = rot;
        this.control.snapTargetDirection = undefined;
        // A hand pulling the sphere eases the camera back mid-swipe, like a manual drag.
        cameraTargetZ += Math.sin(Math.PI * t) * 1.4 * this.scaleFactor;

        if (t >= 1) {
          this.isTransitioning = false;
          this.control.tourRotation = null;
          this.dwellTimer = 0;
          this.dwellDuration = 4200 + Math.random() * 1400;
          this.onActiveItemChange(this.targetMemberIndex);
        }
      } else {
        this.control.tourRotation = null;
        this.dwellTimer += deltaTime;
        const snapDirection = vec3.normalize(vec3.create(), this.#getVertexWorldPosition(this.targetVertexIndex));

        // Living organic micro-float drift while dwelling
        this.microDriftAngle += deltaTime * 0.0012;
        snapDirection[0] += Math.sin(this.microDriftAngle) * 0.016;
        snapDirection[1] += Math.cos(this.microDriftAngle * 0.8) * 0.016;
        vec3.normalize(snapDirection, snapDirection);
        this.control.snapTargetDirection = snapDirection;

        if (this.dwellTimer >= this.dwellDuration) {
          const members = this.tourMembers;
          const pos = members.indexOf(this.targetMemberIndex);
          // After a manual drag onto a vacant seat, resume with the next real member.
          const nextIndex = pos >= 0
            ? members[(pos + 1) % members.length]
            : (members.find(i => i > this.targetMemberIndex) ?? members[0]);
          this.targetMemberIndex = nextIndex;
          this.targetVertexIndex = this.#findBestVertexForMember(nextIndex);
          this.#beginTourMove();
          // Announce at settle, not at hop start.
        }
      }
    }

    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
    this.#updateCameraMatrix();
  }

  // Starts a hand-like swipe from the target vertex's current spot to the front.
  #beginTourMove() {
    vec3.normalize(this.tourStart, this.#getVertexWorldPosition(this.targetVertexIndex));
    const angle = Math.acos(Math.max(-1, Math.min(1, vec3.dot(this.tourStart, this.control.snapDirection))));
    // Longer hops take longer, but a hand never crawls: ~1.1s for a short hop, ~2.3s max.
    this.tourDuration = Math.min(2300, 1100 + angle * 650);
    this.tourElapsed = 0;
    // Alternate the side of the arc so consecutive swipes don't look mechanical.
    this.tourBow = (this.tourBow > 0 ? -1 : 1) * (0.16 + Math.random() * 0.12);
    this.isTransitioning = true;
    // Mark the card as moving for the whole hop, not only while rotation velocity
    // is high — otherwise the previous member's text stays visible mid-transition.
    if (!this.movementActive) {
      this.movementActive = true;
      this.onMovementChange(true);
    }
    this.control.snapTargetDirection = undefined;
  }

  // Point on a bowed arc from tourStart to the front, with ease-in-out timing:
  // the "hand" accelerates, sweeps through a slight curve and decelerates into place.
  #tourPathPoint(t) {
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const a = this.tourStart;
    const b = this.control.snapDirection;
    const p = vec3.lerp(vec3.create(), a, b, e);
    const side = vec3.cross(vec3.create(), a, b);
    if (vec3.squaredLength(side) < 1e-8) vec3.set(side, 0, 1, 0);
    vec3.normalize(side, side);
    vec3.scaleAndAdd(p, p, side, Math.sin(Math.PI * e) * this.tourBow);
    return vec3.normalize(p, p);
  }

  #findBestVertexForMember(memberIndex) {
    const n = this.control.snapDirection;
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);

    let maxD = -Infinity;
    let bestVertex = 0;
    const len = Math.max(1, this.items.length);
    for (let i = 0; i < this.instancePositions.length; ++i) {
      if (i % len === memberIndex) {
        const d = vec3.dot(nt, this.instancePositions[i]);
        if (d > maxD) {
          maxD = d;
          bestVertex = i;
        }
      }
    }
    return bestVertex;
  }

  #findNearestVertexIndex() {
    const n = this.control.snapDirection;
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);

    let maxD = -1;
    let nearestVertexIndex;
    for (let i = 0; i < this.instancePositions.length; ++i) {
      const d = vec3.dot(nt, this.instancePositions[i]);
      if (d > maxD) {
        maxD = d;
        nearestVertexIndex = i;
      }
    }
    return nearestVertexIndex;
  }

  #getVertexWorldPosition(index) {
    const nearestVertexPos = this.instancePositions[index];
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);
  }
}

const defaultItems = [
  {
    image:
      'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=600&fit=crop&sat=-100&auto=format',
    link: 'https://google.com/',
    title: '',
    description: ''
  }
];

/**
 * @param {{
 *   items?: any[],
 *   scale?: number,
 *   backgroundColor?: string,
 *   onSelectMember?: (member: any) => void
 * }} props
 */
export default function InfiniteMenu({
  items = [],
  scale = 1.0,
  backgroundColor = '#000000',
  onSelectMember = undefined
}) {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const sketchRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const list = items.length ? items : defaultItems;
    const canvas = canvasRef.current;
    let sketch;

    const handleActiveItem = index => {
      const itemIndex = index % list.length;
      setActiveItem(list[itemIndex]);
    };

    // Pre-flight check for WebGL2
    try {
      const testCanvas = document.createElement('canvas');
      const testGl = testCanvas.getContext('webgl2');
      if (!testGl) {
        setWebglSupported(false);
        if (!activeItem && list.length > 0) {
          setActiveItem(list[0]);
        }
        return;
      }
    } catch {
      setWebglSupported(false);
      if (!activeItem && list.length > 0) {
        setActiveItem(list[0]);
      }
      return;
    }

    let observer;
    if (canvas) {
      try {
        sketch = new InfiniteGridMenu(
          canvas,
          list,
          handleActiveItem,
          setIsMoving,
          null,
          scale
        );
        sketchRef.current = sketch;

        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              sketch?.play();
            } else {
              sketch?.pause();
            }
          },
          { threshold: 0.02 }
        );
        observer.observe(canvas);
      } catch (err) {
        console.warn('InfiniteMenu WebGL2 initialization failed, using fallback:', err);
        setWebglSupported(false);
        if (!activeItem && list.length > 0) {
          setActiveItem(list[0]);
        }
        return;
      }
    }

    const handleResize = () => {
      if (sketch) {
        try {
          sketch.resize();
        } catch (e) {}
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', handleResize);
      try {
        sketch?.destroy();
      } catch (e) {}
      sketchRef.current = null;
    };
  }, [items, scale]);

  const handleButtonClick = () => {
    if (!activeItem) return;
    if (onSelectMember) {
      onSelectMember(activeItem);
      return;
    }
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith('http')) {
      window.open(activeItem.link, '_blank');
    } else {
      router.push(activeItem.link);
    }
  };

  return (
    <div
      className="infinite-menu-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor,
        '--infinite-menu-background': backgroundColor
      }}
    >
      {!webglSupported ? (
        <div className="infinite-menu-fallback-list" aria-label="Team Members">
          {(items.length ? items : defaultItems).map((member, idx) => {
            const isSelected = (activeItem?.id || activeItem?.title) === (member.id || member.title);
            return (
              <button
                key={member.id || idx}
                type="button"
                className={`infinite-menu-fallback-avatar ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem(member);
                  if (onSelectMember) onSelectMember(member);
                }}
                title={member.name || member.title}
                aria-label={member.name || member.title}
              >
                <img src={member.image} alt={member.name || member.title} />
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <canvas id="infinite-grid-menu-canvas" ref={canvasRef} aria-hidden="true" />
        </>
      )}

      {activeItem && (
        <div
          className={`active-member-card ${isMoving ? 'inactive' : 'active'}`}
          dir={isEn ? 'ltr' : 'rtl'}
          onPointerEnter={() => { if (sketchRef.current) sketchRef.current.isHovered = true; }}
          onPointerLeave={() => { if (sketchRef.current) sketchRef.current.isHovered = false; }}
        >
          <div className="active-member-content">
            <h2 className="member-name">
              {isEn ? (activeItem.nameEn || activeItem.titleEn || activeItem.name || activeItem.title) : (activeItem.name || activeItem.title)}
            </h2>

            <p className="member-role">
              {isEn ? (activeItem.roleEn || activeItem.descriptionEn || activeItem.role || activeItem.description) : (activeItem.role || activeItem.description)}
            </p>

            {/* Brief bio snippet (نبذة عنه) */}
            {(activeItem.bio || activeItem.bioEn) && (
              <>
                <p className="member-bio-text member-bio-desktop">
                  {isEn ? (activeItem.bioEn || activeItem.bio) : activeItem.bio}
                </p>
                <p className="member-bio-text member-bio-mobile">
                  {isEn
                    ? (activeItem.shortBioEn || activeItem.shortBio || activeItem.bioEn || activeItem.bio)
                    : (activeItem.shortBio || activeItem.bio)}
                </p>
              </>
            )}

            {/* أيقونات التواصل الاجتماعي: لينكد إن، غيت هاب، فيسبوك، إيميل */}
            {activeItem.socials && (
              <div className="member-socials-container">
                <SocialButtons socials={activeItem.socials} size="medium" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
