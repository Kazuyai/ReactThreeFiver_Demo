import "./App.css";
import React, { useState, useRef } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { config, useSpring, animated } from "@react-spring/three";

const Box = props => {
	const ref = useRef();
	const [clicked, setClicked] = useState(false);
	const [hovered, setHovered] = useState(false);

	useFrame(() => (ref.current.rotation.x += 0.01));

	const { scale } = useSpring({
		scale: clicked ? [2, 2, 2] : [1, 1, 1],
		config: config.wobbly,
	});

	return (
		<animated.mesh
			{...props}
			ref={ref}
			onClick={() => setClicked(!clicked)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			scale={scale}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "limegreen" : "aqua"} />
		</animated.mesh>
	);
};

export function App() {
	return (
		<>
			<div id="canvas-container">
				<Canvas>
					<OrbitControls />
					<Box position={[2, 0, 0]} />
					<Box position={[-2, 0, 0]} />
					<directionalLight position={[500, 1000, 1000]} intensity={1}></directionalLight>
					<Environment preset="sunset" blur={0.7} background />
				</Canvas>
			</div>
			<h1>React Three Fiber Demo</h1>
		</>
	);
}

export default App;
