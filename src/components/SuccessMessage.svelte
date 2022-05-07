<script lang="ts">
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleNew = () => {
    navigate("basic-information");
  };
</script>

<div
  class="bg-gray-800 flex flex-col items-center justify-center"
>
  <svg
    class="w-24 h-24 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <span class='mt-5 text-gray-300 font-semibold'>added successfully</span>
  
</div>
