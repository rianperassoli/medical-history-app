<script lang="ts">
	import { Router, Route, Link } from "svelte-navigator";

	import Home from "./pages/Home.svelte";
	import Summary from "./pages/Summary.svelte";
	import BasicInformation from "./pages/BasicInformation.svelte";
	import MedicalHistory from "./pages/MedicalHistory.svelte";
</script>

<main class="h-screen w-screen bg-gray-200">
	<Router>
		<header class="bg-purple-600">
			<div class="flex max-w-4xl m-auto">
				<div class="flex-auto">
					<p class="text-gray-100 text-2xl font-bold text-center p-5">
						Medical History
					</p>
				</div>

				<button
					class="bg-white hover:bg-purple-600 text-purple-600 
			           font-semibold hover:text-white py-2 px-4 m-2
				         border-2 border-purple-500 rounded"
				>
					<Link to="/basic-information">+ new</Link>
				</button>
			</div>
		</header>

		<Route path="/" component={Home} />
		<Route path="/summary/:email" component={Summary} />
		<Route path="/basic-information" component={BasicInformation} />
		<Route path="/medical-history" component={MedicalHistory} />
	</Router>
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
