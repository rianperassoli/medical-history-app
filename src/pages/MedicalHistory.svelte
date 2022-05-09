<script lang="ts">
  import * as yup from "yup";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { Form, Message } from "svelte-yup";
  import MultiSelect from "svelte-multiselect";

  import { user } from "../stores";
  import { api } from "../services/api";
  import HeaderPage from "../components/HeaderPage.svelte";
  import SuccessMessage from "../components/SuccessMessage.svelte";

  const navigate = useNavigate();
  const location = useLocation();

  const redirectToHome = () => {
    navigate(`/`, {
      state: { from: $location.pathname },
      replace: false,
    });
  };

  const medicalConditions: string[] = [
    "Anxiety",
    "Arthritis",
    "Cancer",
    "Chronic Pain",
    "Depression",
    "Insomnia",
    "Migraines",
  ];
  let gender = $user && $user.gender;

  let messageError = "";

  let showSuccessMessage = false;

  let schema = yup.object().shape({
    illnesses: yup.array().min(1).label("Conditions"),
    pregnant: yup.boolean().label("Pregnant"),
    height: yup
      .number()
      .typeError("Height must be a number")
      .positive("Height must be a positive value")
      .required()
      .max(300, "Height must be 300 cm (3 mts) or less")
      .label("Height"),
    weight: yup
      .number()
      .typeError("Weight must be a number")
      .positive("Weight must be a positive value")
      .required()
      .max(999, "Weight must be less than 1000 kg")
      .label("Weight"),
  });

  let fields = {
    illnesses: [],
    pregnant: false,
    height: "",
    weight: "",
  };

  let submitted = false;
  let isValid;
  const formSubmit = async () => {
    submitted = true;
    isValid = schema.isValidSync(fields);
    if (isValid) {
      try {
        const response = await api.post(
          `/user/${$user.id}/medical-history`,
          fields
        );

        showSuccessMessage = true;

        setTimeout(() => {
          showSuccessMessage = false;
          redirectToHome();
        }, 1500);
      } catch (error) {
        messageError =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Fail to create. Try again.";

        setTimeout(() => {
          messageError = "";
        }, 3000);
      }
    }
  };

  let ableToSave = false;
  const handleChangeMultipleSelect = (event) => {
    switch (event.detail.type) {
      case "add":
        fields.illnesses.push(event.detail.option);
        break;
      case "remove":
        fields.illnesses = fields.illnesses.filter(
          (item) => item !== event.detail.option
        );
        break;
      case "removeAll":
        fields.illnesses = [];
        break;
    }
    ableToSave = fields.illnesses.length > 0;
  };
</script>

{#if showSuccessMessage}
  <SuccessMessage />
{:else}
  <HeaderPage title={"Medical conditions"} showBackButton />

  <div
    class="m-auto mt-5 bg-white md:mh-3/5 w-4/5 md:w-3/5 shadow-md px-4 md:px-8 pt-2 md:pt-6 pb-8 rounded"
  >
    <Form
      class="form flex flex-col p-50"
      {schema}
      {fields}
      submitHandler={formSubmit}
      {submitted}
    >
      {#if messageError}
        <div
          class="bg-red-100 rounded-lg py-2 md:py-5 px-2 md:px-6 mb-3 text-sm md:text-base text-red-700 inline-flex items-center w-full"
          role="alert"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times-circle"
            class="w-4 h-4 mr-2 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
            />
          </svg>
          {messageError}
        </div>
      {/if}

      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block tracking-wide text-gray-600 text-xs font-bold mb-2"
            for="grid-conditions"
          >
            Conditions (select at least 1)
          </label>

          <MultiSelect
            inputClass="h-10"
            options={medicalConditions}
            selectedValues={fields.illnesses}
            on:change={handleChangeMultipleSelect}
            on:remove={handleChangeMultipleSelect}
          />
          <Message name="illnesses" />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
          <label
            class="block tracking-wide text-gray-600 text-xs font-bold mb-2"
            for="grid-height"
          >
            Height (cm)
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-height"
            type="number"
            step="1"
            bind:value={fields.height}
            placeholder="Height"
          />
          <Message name="height" />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block tracking-wide text-gray-600 text-xs font-bold mb-2"
            for="grid-weight"
          >
            Weight (kgs)
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-weight"
            type="number"
            step="0.01"
            bind:value={fields.weight}
            placeholder="Weight"
          />
          <Message name="weight" />
        </div>
      </div>

      {#if gender === "F"}
        <div class="flex flex-wrap -mx-3 mb-6">
          <p class="block tracking-wide text-gray-600 text-xs font-bold mb-2">
            Please check the field below if you are pregnant
          </p>
          <div class="w-full px-3 mb-6 md:mb-0 inline-flex items-center">
            <input
              class="mr-3 mb-2"
              type="checkbox"
              bind:checked={fields.pregnant}
            />
            <p
              class="block tracking-wide text-gray-600 text-sm font-semibold mb-2"
            >
              I'm pregnant
            </p>
            <Message name="pregnant" />
          </div>
        </div>
      {/if}

      {#if ableToSave}
        <button
          type="submit"
          class="bg-white hover:bg-purple-600 text-purple-600 
           font-semibold hover:text-white py-2 px-4 mt-10
           border-2 border-purple-500 rounded">save</button
        >
      {:else}
        <button
          disabled
          class="bg-white text-purple-600 
             font-semibold py-2 px-4 mt-10
             border-2 border-purple-600 rounded opacity-50 cursor-not-allowed"
        >
          save
        </button>
      {/if}
    </Form>
  </div>
{/if}
