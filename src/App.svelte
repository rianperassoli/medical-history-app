<script lang="ts">
	import { Router, Route, Link } from "svelte-navigator";

	import Home from "./pages/Home.svelte";
	import Summary from "./pages/Summary.svelte";
	import BasicInformation from "./pages/BasicInformation.svelte";
	import MedicalHistory from "./pages/MedicalHistory.svelte";
</script>

<main class="static min-h-screen w-screen bg-gray-200">
	<Router>
		<header class="bg-purple-600">
			<div class="flex max-w-4xl m-auto">
				<div class="flex-auto">
					<Link to="/">
						<p class="text-gray-100 text-2xl font-bold text-center p-5">
							Medical History
						</p>
					</Link>
				</div>
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
