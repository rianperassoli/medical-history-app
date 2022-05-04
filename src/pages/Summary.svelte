<script lang="ts">
  import { useParams } from "svelte-navigator";

  import { api } from "../services/api";

  const params = useParams();

  console.log(params); 

  let user = null;

  // async function loadUser(email: string) {
  //   const response = await api.get(`/user/${email}`);

  //   console.log(response);
  // }

  // loadUser(email);
</script>

<h3>summary</h3>
