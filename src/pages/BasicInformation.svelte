<script lang="ts">
  import { useNavigate, useLocation } from "svelte-navigator";
  import * as yup from "yup";
  import { Form, Message } from "svelte-yup";
  import { imask } from "svelte-imask";
  import { user } from "../stores";
  import { api } from "../services/api";

  const navigate = useNavigate();
  const location = useLocation();

  const redirectToMedicalHistory = () => {
    navigate(`/medical-history`, {
      state: { from: $location.pathname },
      replace: false,
    });
  };

  const phoneRegExp = /^\(\d{2}\) \d{4,5}-\d{3,4}$/gi;

  const options = {
    mask: "(00) 00000-0000",
  };

  let schema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    first_name: yup.string().required().uppercase().label("First name"),
    last_name: yup.string().required().uppercase().label("Last name"),
    gender: yup.string().required().label("Gender"),
    phone: yup
      .string()
      .max(15)
      .required()
      .matches(
        phoneRegExp,
        `The phone number must be on format ${options.mask}`
      ),
    birthdate: yup.date().required().label("Birthdate"),
  });

  let fields = {
    email: "",
    first_name: "",
    last_name: "",
    gender: "M",
    phone: "",
    birthdate: "",
  };

  let submitted = false;
  let isValid;
  const formSubmit = async () => {
    submitted = true;
    isValid = schema.isValidSync(fields);
    if (isValid) {
      fields.first_name  = fields.first_name.toUpperCase()
      fields.last_name  = fields.last_name.toUpperCase()

      const response = await api.post("/user", fields);

      const newUser = response.data;
      user.set(newUser);

      redirectToMedicalHistory();
    }
  };
</script>

<div
  class="m-auto mt-20 bg-white mh-3/5 w-3/5 shadow-md px-8 pt-6 pb-8 rounded"
>
  <Form
    class="form flex flex-col p-50"
    {schema}
    {fields}
    submitHandler={formSubmit}
    {submitted}
  >
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          First Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          bind:value={fields.first_name}
          placeholder="First name"
        />
        <Message name="first_name" />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Last Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          bind:value={fields.last_name}
          placeholder="Last name"
        />
        <Message name="last_name" />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-birthdate"
        >
          Birthdate
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-birthdate"
          type="date"
          bind:value={fields.birthdate}
        />
        <Message name="birthdate" />
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <div class="form-group flex flex-col">
          <p class="block tracking-wide text-gray-700 text-xs font-bold">
            Gender
          </p>
          <div class="form-check inline-flex my-4">
            <div class="radio">
              <label
                class="block tracking-wide text-gray-700 text-xs inline-flex items-center mr-2"
              >
                <input
                  class="mr-1"
                  type="radio"
                  value="M"
                  bind:group={fields.gender}
                />
                Male
              </label>
            </div>
            <div class="radio">
              <label
                class="block tracking-wide text-gray-700 text-xs inline-flex items-center"
              >
                <input
                  class="mr-1"
                  type="radio"
                  value="F"
                  bind:group={fields.gender}
                />
                Female
              </label>
            </div>
          </div>
        </div>
        <Message name="gender" />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-email"
        >
          Email
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-email"
          type="text"
          bind:value={fields.email}
          placeholder="Email address"
        />
        <Message name="email" />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-phone"
        >
          Phone
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-phone"
          type="tel"
          maxlength="15"
          bind:value={fields.phone}
          use:imask={options}
          placeholder={options.mask}
        />
        <Message name="phone" />
      </div>
    </div>

    <button
      type="submit"
      class="bg-white hover:bg-purple-600 text-purple-600 
           font-semibold hover:text-white py-2 px-4 mt-10
           border-2 border-purple-500 rounded">continue</button
    >
  </Form>
</div>
