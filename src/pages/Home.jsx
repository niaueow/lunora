import { useState } from "react";
import Particles from "../components/Particles";
import SplitText from "../components/SplitText";

const handleAnimationComplete = () => {
	console.log("All letters have animated!");
};

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [card, setCard] = useState(null); // Store the drawn card

	const handleGetReading = async () => {
		setIsLoading(true);
		setCard(null); // Reset previous reading

		try {
			const res = await fetch("https://tarotapi.dev/api/v1/cards/random?n=1");
			const data = await res.json();
			const drawnCard = data.cards[0];

			setTimeout(() => {
				setCard(drawnCard);
				setIsLoading(false);
			}, 2700);
		} catch (error) {
			console.error("Error fetching tarot card:", error);
			setIsLoading(false);
		}
	};

	return (
		<div className="font-sans relative flex flex-col items-center justify-center w-full h-screen md:w-screen md:h-screen overflow-hidden bg-gradient-to-b from-purple-950 to-black text-white z-10">
			{/* Background Particles */}
			<div className="absolute inset-0 w-full h-full -z-10">
				<Particles
					particleColors={["#ffffff", "#ffffff"]}
					particleCount={800}
					particleSpread={10}
					speed={0.4}
					particleBaseSize={100}
					moveParticlesOnHover={false}
					alphaParticles={false}
					disableRotation={true}
				/>
			</div>

			{/* Main Content Wrapper - Make it Scrollable */}
			<div className="flex flex-col items-center justify-center min-h-screen max-h-screen text-center w-full px-4 md:px-8 overflow-auto">
				{!card ? (
					<>
						<h1 className="text-4xl md:text-6xl font-bold">Welcome to Lunora</h1>
						<p className="mt-4 mb-4 text-lg">Your fate awaits...</p>
						<button
							onClick={handleGetReading}
							className={`mt-6 px-7 py-4 rounded-xl text-md font-semibold ${isLoading ? "text-purple-300" : "bg-purple-800 hover:bg-purple-700"}`}
							disabled={isLoading}>
							{isLoading ? "Shuffling the deck..." : "Draw a card"}
						</button>

						{/* Suspense text while waiting */}
						{isLoading && (
							<SplitText
								text="The spirits are revealing your fates!"
								className="text-2xl font-semibold text-center"
								delay={55}
								animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
								animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
								easing="easeInCubic"
								threshold={0.2}
								rootMargin="-50px"
								onLetterAnimationComplete={handleAnimationComplete}
							/>
						)}
					</>
				) : (
					// Display the drawn card after delay
					<div className="bg-purple-400/40  no-scrollbar p-6 rounded-2xl shadow-md w-5/6 max-h-[75vh] overflow-auto my-10 md:my-0">
						<h1 className="text-4xl font-bold m-4">{card.name}</h1>
						<p className="mt-3 text-purple-200">{card.desc}</p>
						<p className="mt-3 text-purple-200">
							<strong className="text-purple-300">Upright Meaning:</strong> {card.meaning_up}
						</p>
						<p className="mt-3 text-purple-200">
							<strong className="text-purple-300">Reversed Meaning:</strong> {card.meaning_rev}
						</p>

						{/* Button to draw again */}
						<button
							onClick={handleGetReading}
							className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-bold">
							Draw Again
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
