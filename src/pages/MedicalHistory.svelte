<script lang="ts">
  import * as yup from "yup";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { Form, Message } from "svelte-yup";
  import MultiSelect from "svelte-multiselect";
  import { user } from "../stores";
  import { api } from "../services/api";

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
  let gender = $user && $user.gender || 'F';

  let schema = yup.object().shape({
    illnesses: yup.array().min(1).label("Conditions"),
    pregnant: yup.boolean().label("Pregnant"),
    height: yup
      .number()
      .typeError("Height must be a number")
      .positive("Height must be a positive value")
      .required()
      .label("Height"),
    weight: yup
      .number()
      .typeError("Weight must be a number")
      .positive("Weight must be a positive value")
      .required()
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
      const response = await api.post(`/user/${$user.id}/medical-history`, fields);

      console.log(response.data);  
      
      redirectToHome()
    }
  };

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
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
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

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-height"
        >
          Height (cm)
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-weight"
        >
          Weight (kgs)
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        <p class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
          Please check the field below if you are pregnant
        </p>
        <div class="w-full px-3 mb-6 md:mb-0 inline-flex items-center">
          <input
            class="mr-3 mb-2"
            type="checkbox"
            bind:checked={fields.pregnant}
          />
          <p class="block tracking-wide text-gray-700 text-sm font-semibold mb-2">
            I'm pregnant
          </p>
          <Message name="pregnant" />
        </div>
      </div>
    {/if}

    {console.log(fields.pregnant)}

    {#if fields.illnesses.length}
      <button
        type="submit"
        class="bg-white hover:bg-purple-600 text-purple-600 
           font-semibold hover:text-white py-2 px-4 mt-10
           border-2 border-purple-500 rounded">continue</button
      >
    {:else}
      <button
        disabled
        class="bg-white text-purple-600 
             font-semibold py-2 px-4 mt-10
             border-2 border-purple-500 rounded opacity-50 cursor-not-allowed"
      >
        continue
      </button>
    {/if}
  </Form>
</div>
