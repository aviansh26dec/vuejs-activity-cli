<template>
  <a
    v-if="!isFormDisplayed"
    @click="toggleFormDisplay"
    class="button is-primary is-block is-alt is-large"
    href="#"
  >
    New Activity
  </a>
  <div v-if="isFormDisplayed" class="create-form">
    <h2>Create Activity</h2>
    <form>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="newActivity.title"
            class="input"
            type="text"
            placeholder="Read a Book"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Notes</label>
        <div class="control">
          <textarea
            v-model="newActivity.notes"
            class="textarea"
            placeholder="Write some notes here"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Categories</label>
        <div class="control">
          <select class="select" v-model="newActivity.category">
            <option disabled value="">Select Categories</option>
            <option v-for="category in categories" :key="category.text">
              {{ category.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button
            :disabled="!isFormValid"
            @click.prevent="createActivity"
            class="button is-link"
          >
            Create Activity
          </button>
        </div>
        <div class="control">
          <button @click="toggleFormDisplay" class="button is-text">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { createActivity } from '@/api';

export default {
  props: {
    categories: {
      type: Object,
      required: false
    }
  },
  data(){
    return {
      isFormDisplayed: false,
      newActivity: {
        title: '',
        notes: '',
        category: '',
      },
    }
  },
  computed: {
    isFormValid(){
      return this.newActivity.title && this.newActivity.notes  && this.newActivity.category;
    }
  },
  methods: {
    toggleFormDisplay () {
      this.isFormDisplayed = !this.isFormDisplayed
    },
    resetActivity () {
      this.newActivity.title = '';
      this.newActivity.notes = '';
      this.newActivity.category = '';
    },
    createActivity () {
      createActivity(this.newActivity).then(activity => {
        this.$emit('activity-created', {...activity});
        this.resetActivity();
        this.isFormDisplayed = false;
      });
    }
  }
};
</script>

<style scoped>
</style>