import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Mesh, Vector3 } from "three";
import { Environment, useGLTF } from "@react-three/drei";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    banana: THREE.Mesh;
  };
  materials: {
    peel: THREE.MeshStandardMaterial;
  };
};
function Banana({ z }: { z: number }) {
  const ref = useRef<Mesh>();
  const { nodes, materials } = useGLTF(
    "./banana-compressed-transformed.glb"
  ) as GLTFResult;

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(
    camera,
    new Vector3(0, 0, z)
  );

  const x = MathUtils.randFloatSpread(1);
  let y = MathUtils.randFloatSpread(height);
  let rX = Math.random() * Math.PI * 2;
  let rY = Math.random() * Math.PI * 2;
  let rZ = Math.random() * Math.PI * 2;
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.set((rX += 0.001), (rY += 0.002), (rZ += 0.003));
      ref.current.position.set(x * width, (y += 0.03), z);
      if (y > height) y = -height;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.banana.geometry}
      material={materials.peel}
      material-emissive="orange"
    />
  );
}

function App({ count = 150, depth = 100 }) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 100, fov: 30 }}>
      <color attach="background" args={["khaki"]} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }, (_, i) => (
          <Banana key={i} z={(-i / count) * depth - 15} />
        ))}
        <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={10}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default App;
