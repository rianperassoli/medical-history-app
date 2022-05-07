<script lang="ts">
  import { useNavigate, useLocation } from "svelte-navigator";

  const navigate = useNavigate();
  const location = useLocation();

  export let fullname: string = "";
  export let gender: string = "";
  export let email: string = "";
  export let birthdate: string = "";
  export let created_at: string = "";

  const redirectToSummary = () => {
    navigate(`/summary/${email}`, {
      state: { from: $location.pathname, email },
      replace: false,
    });
  };
</script>

<div class="p-4 m-1 w-11/12 sm:w-1/2 bg-white rounded-xl shadow-lg">
  <div class="text-left space-y-2">
    
    <div class="space-y-0.5">
      <div class="flex">    
        <p class="flex-auto text-lg text-black font-bold">{fullname}</p>
        <p class="flex-none text-xs text-gray-300 text-right">created at {created_at}</p>
      </div>
      <p class="text-sm text-gray-600">{email}</p>
      <div class="flex">    
        <p class="flex-none text-sm text-gray-600">birthdate {birthdate}</p>
        <p class="flex-auto text-sm text-gray-600"> {`${gender ? `, ${gender}` : ''}`}</p>
      </div>
    </div>
    <button
      class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      on:click={redirectToSummary}>More ...</button
    >
  </div>
</div>