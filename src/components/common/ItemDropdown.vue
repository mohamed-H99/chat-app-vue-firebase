<template>
  <div class="dropdown dropstart">
    <button
      type="button"
      class="btn dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          /></svg
      ></span>
    </button>
    <ul class="dropdown-menu">
      <li>
        <a
          class="dropdown-item"
          href="#"
          data-method="reply"
          @click="handleEvent"
          >Reply</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          data-method="edit"
          @click="handleEvent"
          >Edit</a
        >
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          data-method="delete"
          @click="handleEvent"
          >Delete</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ItemDropdown",
  methods: {
    handleEvent(e) {
      e.preventDefault();
      const method = e.target.getAttribute("data-method");
      this.$emit("event", method);
    },
  },
};
</script>

<style>
.dropdown-toggle::before,
.dropdown-toggle::after {
  content: "";
  border: 0 !important;
}
</style>