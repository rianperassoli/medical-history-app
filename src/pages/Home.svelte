<script lang="ts">
  import { api } from "../services/api";

  import ListItem from "../components/ListItem.svelte";
  import * as dateUtil from "../util/DateUtil";

  interface IUser {
    name: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    age: number;
    gender: string;
    created_at: string;
  }

  let users = [];

  async function loadData() {
    const response = await api.get<IUser[]>("/user");

    if (response.data) {
      users = response.data.map((user: IUser) => {
        const name = `${user.first_name} ${user.last_name}`;
        const age = dateUtil.diffYearsFromToday(user.birthdate);

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

        return { ...user, name, age };
      });
    }
  }

  loadData();
</script>

<section class="flex flex-col items-center">
  {#each users as user}
    <ListItem {...user} />
  {/each}
</section>
