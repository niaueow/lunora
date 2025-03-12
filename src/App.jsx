import Home from "./pages/Home";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
	return (
		<>
			<Home />
			<Analytics />
		</>
	);
}
