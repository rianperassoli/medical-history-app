<script lang="ts">
  import { onMount } from "svelte";
  import { useNavigate } from "svelte-navigator";
  import HeaderPage from "../components/HeaderPage.svelte";

  import Loading from "../components/Loading.svelte";
  import { api } from "../services/api";
  import * as dateUtil from "../util/DateUtil";

  import { user as userStored } from "../stores";

  const navigate = useNavigate()
  export let email;

  let user = null;

  onMount(async () => {
    const response = await api.get(`/user/${email}`);

    user = response.data;
    user.fullname = `${user.first_name} ${user.last_name}`;
    user.age = dateUtil.diffYearsFromToday(user.birthdate);
    user.birthdate = dateUtil.formatDate(user.birthdate);
    user.created_at = dateUtil.formatDateTime(user.created_at);
    switch (user.gender) {
      case "M":
        user.gender = "Male";
        break;
      case "F":
        user.gender = "Female";
        break;

      default:
        user.gender = "";
        break;
    }
  });

  const handleClickAddMedicalConditions = () => {
    userStored.set(user);
    navigate(`/medical-history`);
  };
</script>

<HeaderPage title={"Summary"} showBackButton />

<div class="m-auto mt-5 bg-white md:mh-3/5 w-4/5 md:w-3/5 shadow-md px-4 md:px-8 pt-2 md:pt-6 pb-8 rounded">
  {#if user}
    <div class="flex flex-col">
      <div class="flex flex-col md:flex-row md:inline-flex md:items-center">
        <div class="flex-auto">
          <p class="text-2xl font-bold text-gray-600">
            {user.fullname}
          </p>
        </div>
        <div class="flex-none">
          <p class="text-xs text-gray-300">created at {user.created_at}</p>
        </div>
      </div>

      <div class="flex inline-flex">
        {#if user.age >= 0}
          <p class="text-sm text-blue-300 font-semibold my-2 md:my-5">
            SENIORCARE PATIENT
          </p>
        {/if}
      </div>

      {#if user.medicalHistory}
        <div class="flex inline-flex">
          <div class="w-2/4 rounded overflow-hidden m-1">
            <div class="p-2 md:px-6 md:py-4">
              <p class="text-gray-600 text-sm md:text-base">
                {`${user.gender}, ${user.age} years old`}
              </p>
              {#if user.gender === "Female"}
                <p class="text-pink-500 text-sm md:text-base">
                  {`Pregnant: ${user.medicalHistory.pregnant ? "Yes" : "No"}`}
                </p>
              {/if}

              <p class="text-gray-600 text-sm md:text-base">Birthdate: {user.birthdate}</p>
              <p class="text-gray-600 text-sm md:text-base">
                {`Height ${user.medicalHistory.height / 100} m`}
              </p>
              <p class="text-gray-600 text-sm md:text-base">
                {`Weight ${user.medicalHistory.weight} kgs`}
              </p>
            </div>
          </div>

          <div class="w-2/4 rounded overflow-hidden m-1">
            <div class="p-2 md:px-6 md:py-4">
              <div class="text-gray-600 font-bold text-lg md:text-xl mb-2">
                Medical conditions
              </div>

              {#each user.medicalHistory.illnesses as illness}
                <p class="text-gray-600 text-sm md:text-base">{illness}</p>
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <span
          class="no-underline hover:underline text-purple-600 cursor-pointer"
          on:click={handleClickAddMedicalConditions}
        >
          You have no medical conditions, click to insert.
        </span>
      {/if}
    </div>

    <div class="w-full rounded overflow-hidden shadow-lg m-1">
      <div class="p-2 md:px-6 md:py-4">
        <div class="text-gray-600 font-bold text-lg md:text-xl mb-2">Contact</div>

        <p class="text-gray-600 text-sm md:text-base">
          Email: {user.email}
        </p>
        <p class="text-gray-600 text-sm md:text-base">
          Phone: {user.phone}
        </p>
      </div>
    </div>
  {:else}
    <div class="m-20">
      <Loading />
    </div>
  {/if}
</div>
