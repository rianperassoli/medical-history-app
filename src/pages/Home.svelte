<script lang="ts">
  import { api } from "../services/api";

  import ListItem from "../components/ListItem.svelte";
  import * as dateUtil from "../util/DateUtil";
  import * as stringUtil from "../util/StringUtil";
  import HeaderPage from "../components/HeaderPage.svelte";
  import NoDataToDisplay from "../components/NoDataToDisplay.svelte";

  interface IUser {
    fullname: string;
    birthdate: string;
    age: number;
    gender: string;
    created_at: string;
  }

  let users = [];
  let searchTerm = "";

  async function loadData() {
    const response = await api.get<IUser[]>("/user");

    if (response.data) {
      users = response.data.map((user: IUser) => {
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

        return { ...user };
      });
    }
  }

  loadData();

  $: filteredList = searchTerm
    ? users.filter(
        (user) => stringUtil.prepareToCompare(user.fullname).indexOf(stringUtil.prepareToCompare(searchTerm)) !== -1
      )
    : users;
</script>

<HeaderPage title="Medical history list" />

<section class="flex flex-col items-center">
  <div class="flex justify-center">
    <div class="mb-3 xl:w-96">
      <div class="input-group relative flex flex-row w-full my-5 rounded">
        <input
          type="search"
          bind:value={searchTerm}
          class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-600 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-purple-600 focus:outline-none"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <span
          class="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-600 text-center whitespace-nowrap rounded"
          id="basic-addon2"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            class="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>

  {#if users.length}
    {#each filteredList as user}
      <ListItem {...user} />
    {/each}
  {:else}
    <NoDataToDisplay />
  {/if}
</section>
