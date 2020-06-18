<script>
  //https://github.com/mdauner/sveltejs-forms
  import { Form, Input, Select, Choice } from 'sveltejs-forms';
  import * as yup from 'yup';

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      resetForm();
      // resetForm({
      //   user: { email: 'test@user.com' }, // optional
      // });
    }, 2000);
  }

  const schema = yup.object().shape({
    title: yup.string().required(),
    shortDescription: yup.string().required(),
  });

  function handleReset() {
    console.log('form has been reset');
  }
</script>

<Form
  {schema}
  validateOnBlur={false}
  validateOnChange={false}
  on:submit={handleSubmit}
  on:reset={handleReset}
  let:isSubmitting
  let:isValid>

  <div>
    <div class="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Create New Session
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          This is all the awesome to be created...
        </p>
      </div>

      <div class="mt-6 sm:mt-5">
        <div
          class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
          sm:border-gray-200 sm:pt-5">

          <label
            for="session_title"
            class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
            sm:pt-2">
            Title
          </label>

          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
              <Input
                name="title"
                class="form-input block w-full transition duration-150
                ease-in-out sm:text-sm sm:leading-5" />
            </div>
          </div>
        </div>

        <div
          class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start
          sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            for="session_shortDescription"
            class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px
            sm:pt-2">
            Short Description
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
              <Input
                name="shortDescription"
                class="form-input block w-full transition duration-150
                ease-in-out sm:text-sm sm:leading-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8 border-t border-gray-200 pt-5">
    <div class="flex justify-end">

      <span class="inline-flex rounded-md shadow-sm">
        <button
          type="reset"
          class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5
          font-medium text-gray-700 hover:text-gray-500 focus:outline-none
          focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50
          active:text-gray-800 transition duration-150 ease-in-out">
          Cancel
        </button>
      </span>

      <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button
          type="submit"
          disabled={isSubmitting}
          class="inline-flex justify-center py-2 px-4 border border-transparent
          text-sm leading-5 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
          focus:shadow-outline-indigo active:bg-indigo-700 transition
          duration-150 ease-in-out">
          Submit
        </button>
      </span>
    </div>
  </div>
</Form>
