<template>
  <article class="post">
    <h4>{{ act.title }}</h4>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jeraga</a> updated at {{ ctime }} ago &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>Progress bar here</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
    props: {
        act: {
            type: Object,
            required: true
        },
        ctime: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>