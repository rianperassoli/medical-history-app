<script lang="ts">
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

  export let title: string;
  export let showBackButton: boolean = false;

  const handleHome = () => {
    navigate("/");
  };

  const handleNew = () => {
    navigate("/basic-information");
  };
</script>

<div class="m-auto bg-white md:mh-3/5 md:w-3/5 md:px-8 md:pt-6 md:pb-8 rounded flex flex-row items-center">
  {#if showBackButton}
    <button
      class="bg-white hover:bg-gray-100 text-gray-300 font-bold py-1 px-2 md:py-2 md:px-4 rounded inline-flex items-center"
      on:click={handleHome}
    >
      <svg
        class="w-6 h-6 dark:text-white mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        />
      </svg>
      <span>back</span>
    </button>
  {/if}

  <h1 class="ml-5 flex-auto text-purple-600 font-semibold text-xs sm:text-lg">
    {title}
  </h1>

  <button
    class="bg-white hover:bg-purple-600 text-purple-600 font-semibold hover:text-white py-2 px-4 m-2 rounded flex-none"
    on:click={handleNew}
  >
    + new
  </button>
</div>
